import Promise from "ts-promise";
import * as Constants from './constants';
import pnp, { config } from 'sp-pnp-js';
import { TestDrive, Question, TestCase } from '../../test_drive/model';
import * as $ from 'jquery';
import * as moment from 'moment';
import TestCases from "../../test_drive/components/TestCases";
import { HomeTestDrive, Leaders, EliteProfile, TestDriveResponse } from '../../home/model';
import { Leader } from '../../leader_board/model';
import { User } from '../../onboarding/model';
import { constants } from "http2";
import { resolve } from "path";
import { Columns } from "./constants";
import { Util } from "sp-pnp-js/lib/utils/util";
import index from "../../home/index";
import { TestDriveInstance, QuestionInstance, TestCaseInstance } from '../../test_drive_participation/model';

const delay = 100;
declare var SP: any;

export type listItem = {
    key: string;
    value: string;
    type: string;
}

declare var process: { exit(code?: number): void };
// declare var SP: any;
pnp.setup({

    sp: {
        headers: {
            "Accept": "application/json;odata=verbose",
        }
    }
});

export class Services {

    static createOrSaveTestDriveInstance(testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVE_INSTANCES, [{
                [Constants.Columns.ID]: testDriveInstance.instanceID,
                [Constants.Columns.STATUS]: testDriveInstance.status,
                [Constants.Columns.DATE_JOINED]: new Date().toISOString(),
                [Constants.Columns.TEST_DRIVE_ID]: testDriveInstance.testDriveID,
                [Constants.Columns.USER_ID]: Services.getCurrentUserID(),
                [Constants.Columns.TEST_CASE_COMPLETED]: testDriveInstance.numberOfTestCasesCompleted,
                [Constants.Columns.CURRENT_POINTS]: testDriveInstance.currentPoint
            }]).then(newTestDrives => {
                let newTestDrive = newTestDrives[0];
                resolve(<TestDriveInstance>{
                    ...testDriveInstance,
                    instanceID: newTestDrive ? newTestDrive.id : -1,
                    currentPoint: newTestDrive ? newTestDrive[Constants.Columns.CURRENT_POINTS] : 0,
                    dateJoined: newTestDrive ? newTestDrive[Constants.Columns.DATE_JOINED] : "",
                    numberOfTestCasesCompleted: newTestDrive ? newTestDrive[Constants.Columns.TEST_CASE_COMPLETED] : 0,
                    status: newTestDrive ? newTestDrive[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                });
            }, err => reject(err))
        })
    }

    static createOrSaveQuestionInstance(questionInstance: QuestionInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrUpdateListItemsInBatch(Constants.Lists.SURVEY_RESPONSES, [{
                [Constants.Columns.ID]: questionInstance.responseID || -1,
                [Constants.Columns.TEST_DRIVE_ID + '_id']: questionInstance.testDriveID,
                [Constants.Columns.QUESTION_ID + '_id']: questionInstance.questionID,
                [Constants.Columns.STATUS]: questionInstance.responseStatus,
                [Constants.Columns.USER_ID + '_id']: questionInstance.userID,
                [Constants.Columns.SURVEY_RESPONSE]: questionInstance.questionResponse,
                [Constants.Columns.Selected_Response]: questionInstance.selectedResponse
            }]).then((newResponses: any) => {
                const newResponse = newResponses[0];
                resolve(<QuestionInstance>{
                    ...questionInstance,
                    responseID: newResponse.id,
                    testDriveID: newResponse[Constants.Columns.TEST_DRIVE_ID + '_id'],
                    questionID: newResponse[Constants.Columns.QUESTION_ID + '_id'],
                    responseStatus: newResponse[Constants.Columns.STATUS],
                    userID: newResponse[Constants.Columns.USER_ID + '_id'],
                    response: newResponse[Constants.Columns.SURVEY_RESPONSE],
                    selectedResponse: newResponse[Constants.Columns.Selected_Response]
                });
            }, err => reject(err))
        })
    }

    static createOrSaveTestCaseInstance(testCasesInstance: TestCaseInstance,
        testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrUpdateListItemsInBatch(Constants.Lists.TEST_CASE_RESPONSES, [{
                [Constants.Columns.ID]: testCasesInstance.responseID,
                [Constants.Columns.TESTCASE_ID + '_id']: testCasesInstance.testCaseId,
                [Constants.Columns.TEST_DRIVE_ID + '_id']: testCasesInstance.testDriveID,
                [Constants.Columns.TEST_CASE_RESPONSE_STATUS]: testCasesInstance.responseStatus,
                [Constants.Columns.USER_ID + '_id']: testCasesInstance.userID,
                [Constants.Columns.Selected_Response]: testCasesInstance.selectedResponse,
                [Constants.Columns.TEST_CASE_RESPONSE]: testCasesInstance.testCaseResponse
            }]).then((newResponses: any) => {
                let newResponse = newResponses[0];
                let testCase = {
                    ...testCasesInstance,
                    responseID: newResponse.id,
                    testDriveID: newResponse[Constants.Columns.TEST_DRIVE_ID + '_id'],
                    testCaseId: newResponse[Constants.Columns.TESTCASE_ID + '_id'],
                    responseStatus: newResponse[Constants.Columns.TEST_CASE_RESPONSE_STATUS],
                    userID: newResponse[Constants.Columns.USER_ID + '_id'],
                    questionResponse: newResponse[Constants.Columns.SURVEY_RESPONSE],
                    selectedResponse: newResponse[Constants.Columns.Selected_Response]
                };
                if (testCasesInstance.newItem) {
                    Services.getTestPointConfiguration(Constants.Lists.POINTS_CONFIGURATIONS)
                        .then((testCasePoints: number) => {
                            let testDrive = (<TestDriveInstance>{
                                ...testDriveInstance,
                                currentPoint: testDriveInstance.currentPoint + testCasePoints,
                                numberOfTestCasesCompleted: testDriveInstance.numberOfTestCasesCompleted + 1
                            })
                            Services.createOrSaveTestDriveInstance(testDrive).then(testDriveInstance => {
                                resolve({
                                    testDriveInstance: testDriveInstance,
                                    testCaseInstance: testCase
                                })
                            })
                        })
                } else {
                    resolve({
                        testDriveInstance: testDriveInstance,
                        testCaseInstance: testCase
                    })
                }
            }, err => reject(err))
        })
    }

    static getTestDriveResponse(testDriveID: number, userId: number) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.PERCENTAGE_COMPLETION,
                Constants.Columns.CURRENT_POINTS,
                Constants.Columns.STATUS,
                Constants.Columns.DATE_JOINED,
                Constants.Columns.TEST_CASE_COMPLETED,
                Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID
                )
                .filter(Constants.Columns.USER_ID + ' eq ' + userId +
                ' and ' + Constants.Columns.TEST_DRIVE_ID + ' eq ' + testDriveID)
                .expand(Constants.Columns.TEST_DRIVE_ID)
                .get().then(testDriveInstances => {
                    const testDriveInstance = testDriveInstances.length ? testDriveInstances[0] : undefined;
                    resolve(testDriveInstance);
                }, err => reject(err))
        });
    }

    static getTestCaseResponses(testDriveID: number, userID: number) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.TEST_CASE_RESPONSE,
                Constants.Columns.TEST_CASE_RESPONSE_STATUS,
                Constants.Columns.Selected_Response,
                Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
            )
                .filter(Constants.Columns.USER_ID + ' eq ' + userID + ' and ' + Constants.Columns.TEST_DRIVE_ID + ' eq ' + testDriveID)
                .expand(Constants.Columns.USER_ID,
                Constants.Columns.TEST_DRIVE_ID, Constants.Columns.TESTCASE_ID)
                .get().then(testCases => {
                    let testCaseArray = [];
                    testCases.map(t => {
                        testCaseArray.push({
                            responseID: t[Constants.Columns.ID],
                            testCaseResponse: t[Constants.Columns.TEST_CASE_RESPONSE],
                            responseStatus: t[Constants.Columns.TEST_CASE_RESPONSE_STATUS],
                            testCaseId: t[Constants.Columns.TESTCASE_ID][Constants.Columns.ID],
                            selectedResponse: t[Constants.Columns.Selected_Response]
                        })
                    })
                    resolve(testCaseArray);
                }, error => {
                    reject(error);
                });
        });
    }

    static getSurveyQuestionWithResponses(testDriveID: number, questionIDs: number[], userID: number) {
        return new Promise((resolve, reject) => {
            Services.getQuestonsByIds(questionIDs).then((questions: any) => {
                pnp.sp.web.lists.getByTitle(Constants.Lists.SURVEY_RESPONSES).items
                    .select(
                    Constants.Columns.ID,
                    Constants.Columns.SURVEY_RESPONSE,
                    Constants.Columns.Selected_Response,
                    Constants.Columns.STATUS,
                    Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                )
                    .filter(Constants.Columns.USER_ID + ' eq ' + userID + ' and ' + Constants.Columns.TEST_DRIVE_ID + ' eq ' + testDriveID)
                    .expand(Constants.Columns.USER_ID, Constants.Columns.TEST_DRIVE_ID, Constants.Columns.QUESTION_ID)
                    .get().then(questionResponses => {
                        let questionsArray: QuestionInstance[] = [];
                        questions.map(question => {
                            let response = questionResponses.filter(response => {
                                return response[Constants.Columns.QUESTION_ID][Constants.Columns.ID] == question.id;
                            })
                            response = response[0];
                            questionsArray.push({
                                ...question,
                                responseID: response ? response.id : -1,
                                responseStatus: response ? response[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                                response: response ? response[Constants.Columns.SURVEY_RESPONSE] : '',
                                selectedResponse: response ? response[Constants.Columns.Selected_Response] : '',
                                testDriveID: testDriveID,
                                questionID: question.id,
                                options: question.options,
                                userID: userID
                            })
                        })
                        resolve(questionsArray);
                    }, error => {
                        reject(error);
                    });
            })
        });
    }

    static getTestDriveWithTestCases(testDriveID: number) {
        return new Promise((resolve, reject) => {
            Services.getTestDriveById(testDriveID).then((testDrive: any) => {
                Services.getTestCasesByIds(testDrive.testCaseIDs).then(testCases => {
                    resolve({ ...testDrive, testCases: testCases });
                }, err => reject(err))
            }, err => reject(err));
        });
    }

    static getTestDriveInstance(testDriveID: number, userID: number) {
        return new Promise((resolve, reject) => {
            let testDrive = Services.getTestDriveWithTestCases(testDriveID);
            let testCaseResponses = Services.getTestCaseResponses(testDriveID, userID);
            let testDriveResponse = Services.getTestDriveResponse(testDriveID, userID);
            let response;
            Promise.all([testDrive, testCaseResponses, testDriveResponse]).then(results => {
                let testDrive = <any>results[0];
                let testCaseResponses = <any>results[1];
                let testDriveInstance: any = results[2];

                let testCasesInstances = testDrive.testCases.map((t, index) => {
                    response = testCaseResponses.filter(response => {
                        return t.id == response.testCaseId;
                    });
                    response = response[0];
                    return (<TestCaseInstance>{
                        description: t.description,
                        expectedOutcome: t.expectedOutcome,
                        isInEditMode: false,
                        newItem: false,
                        points: t.points,
                        priority: t.priority,
                        reTest: t.reTest,
                        scenario: t.scenario,
                        testCaseId: t.id,
                        title: t.title,
                        testCaseType: t.testCaseType,
                        userID: userID,
                        testDriveID: testDriveID,
                        responseID: response ? response.responseID : -1,
                        responseStatus: response ? response.responseStatus : Constants.ColumnsValues.DRAFT,
                        selectedResponse: response ? response.selectedResponse : '',
                        testCaseResponse: response ? response.testCaseResponse : ''
                    });
                })

                var instance = <TestDriveInstance>{
                    instanceID: testDriveInstance ? testDriveInstance.TestDriveID[Constants.Columns.ID] : -1,
                    currentPoint: testDriveInstance ? testDriveInstance[Constants.Columns.CURRENT_POINTS] : 0,
                    dateJoined: testDriveInstance ? testDriveInstance[Constants.Columns.DATE_JOINED] : "",
                    numberOfTestCasesCompleted: testDriveInstance ? testDriveInstance[Constants.Columns.TEST_CASE_COMPLETED] : 0,
                    status: testDriveInstance ? testDriveInstance[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                    testDriveID: testDrive.id,
                    title: testDrive.title,
                    description: testDrive.description,
                    startDate: testDrive.startDate,
                    endDate: testDrive.endDate,
                    maxPoints: testDrive.maxTestDrivers,
                    department: testDrive.department,
                    location: testDrive.location,
                    requiredDevices: testDrive.requiredDevices,
                    requiredOs: testDrive.requiredOs,
                    maxTestDrivers: testDrive.maxTestDrivers,
                    level: testDrive.level,
                    owner: testDrive.owner,
                    testCases: testCasesInstances,
                    questions: null,
                    testCaseIDs: testDrive.testCaseIDs,
                    questionIDs: testDrive.questionIDs,
                    expectedBusinessValue: testDrive.expectedBusinessValue,
                    region: testDrive.region
                };

                resolve(instance)
            }, err => reject(err))
        })
    }

    // static getTestDriveInstanceWithFilter(filter) {
    //     return new Promise((resolve, reject) => {
    //         let testDriveResponses = Services.getTestDriveResponsesWithFilter(filter);
    //         let testDrives = Services.getTestDrivesByFilter(filter);
    //         let response;
    //         Promise.all([testDrives, testDriveResponses]).then(results => {
    //             let testDrives = <any>results[0];
    //             let testDriveResponses = <any>results[1];

    //             testDriveResponses && 
    //             testDriveResponses.length &&
    //             testDriveResponses.map(testDriveInstance => {
    //                 var instance = <TestDriveInstance>{
    //                     instanceID: testDriveInstance ? testDriveInstance.TestDriveID[Constants.Columns.ID] : -1,
    //                     currentPoint: testDriveInstance ? testDriveInstance[Constants.Columns.CURRENT_POINTS] : 0,
    //                     dateJoined: testDriveInstance ? testDriveInstance[Constants.Columns.DATE_JOINED] : "",
    //                     numberOfTestCasesCompleted: testDriveInstance ? testDriveInstance[Constants.Columns.TEST_CASE_COMPLETED] : 0,
    //                     status: testDriveInstance ? testDriveInstance[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
    //                     testDriveID: testDrive.id,
    //                     title: testDrive.title,
    //                     description: testDrive.description,
    //                     startDate: testDrive.startDate,
    //                     endDate: testDrive.endDate,
    //                     maxPoints: testDrive.maxTestDrivers,
    //                     department: testDrive.department,
    //                     location: testDrive.location,
    //                     requiredDevices: testDrive.requiredDevices,
    //                     requiredOs: testDrive.requiredOs,
    //                     maxTestDrivers: testDrive.maxTestDrivers,
    //                     level: testDrive.level,
    //                     owner: testDrive.owner,
    //                     testCases: testCasesInstances,
    //                     questions: null,
    //                     testCaseIDs: testDrive.testCaseIDs,
    //                     questionIDs: testDrive.questionIDs,
    //                     expectedBusinessValue: testDrive.expectedBusinessValue,
    //                     region: testDrive.region
    //                 };
    //             });



    //             resolve(instance)
    //         }, err => reject(err))
    //     })
    // }

    static getCurrentUserID() {
        let user = <User>this.getUserProfileProperties();
        return user.eliteProfileID; //TODO 
    }

    static getEliteProfile() {
        return new Promise((resolve, reject) => {
            let cachedUser = Cache.getCache(Constants.CacheKeys.ELITE_PROFILE);
            if (cachedUser) {
                resolve(cachedUser);
            } else {
                let user = this.getUserProfileProperties();
                pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                    .getById(user.eliteProfileID)
                    .select(
                    Constants.Columns.CAR_IMAGE,
                    Constants.Columns.CAR_NAME,
                    Constants.Columns.Car_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.AVATAR_IMAGE,
                    Constants.Columns.AVATAR_NAME)
                    .expand(Constants.Columns.Car_ID)
                    .get().then(profile => {
                        let eliteProfle = <EliteProfile>{
                            eliteProfileID: user.eliteProfileID,
                            accountName: user.accountName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            displayName: user.displayName,
                            location: user.location,
                            department: user.department,
                            sipAddress: user.sipAddress,
                            workEmail: user.workEmail,
                            languages: user.languages,
                            region: user.region,
                            carImage: profile.CarImage,
                            carName: profile.CarName,
                            avatarName: profile.AvatarName,
                            avatarImage: profile.AvatarImage
                        };
                        Cache.setCache(Constants.CacheKeys.ELITE_PROFILE, eliteProfle)
                        resolve(eliteProfle);
                    }, err => {
                        Utils.clientLog(err);
                    });
            }
        });
    }

    static getUserRank(userID: number) { //TODO Update logic for more that 5000 users.
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(Constants.Columns.ID,
                Constants.Columns.POINTS,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID)
                .expand(Constants.Columns.USER_ID)
                .orderBy(Constants.Columns.POINTS, false)
                .get().then(results => {
                    let rank;
                    let points;
                    results.forEach((item, index) => {
                        if (item[Constants.Columns.USER_ID][Constants.Columns.ID] == userID) {
                            rank = index;
                            points = item[Constants.Columns.POINTS];
                            return false;
                        }
                    })
                    resolve({ rank, points });
                }, err => reject(err))
        })
    }

    static getCurrentLeaderBoardPosition(region?: string) { //TODO Update logic for more that 5000 users.
        return new Promise((resolve, reject) => {
            Services.getEliteProfile().then((user: EliteProfile) => {
                Services.getUserRank(user.eliteProfileID).then((rankObj: any) => {
                    resolve(<Leader>{
                        avatar: user.avatarImage,
                        car: user.carImage,
                        completedTestDrives: 343, //TODO get actual values.
                        id: user.eliteProfileID,
                        name: user.displayName,
                        rank: rankObj.rank,
                        totalPoints: rankObj.points
                    })
                }, err => reject(err))
            }, err => reject(err))
        })
    }
    static getTotalUserCount() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION)
                .get()
                .then(function (result) {
                    resolve(result.ItemCount)
                })
        });
    }

    static getOnboardingDetails() {
        return new Promise((resolve, reject) => {
            let user = this.getUserProfileProperties();
            this.getTotalUserCount().then(usersCount => {
                resolve({
                    totalUsers: usersCount,
                    currentUser: <User>{
                        accountName: user.accountName,
                        department: user.department,
                        displayName: user.displayName,
                        eliteProfileID: user.eliteProfileID,
                        firstName: user.fileName,
                        languages: user.languages,
                        lastName: user.lastName,
                        location: user.location,
                        region: user.region
                    }
                });
            })
        });
    }

    static getUserProfileProperties() {
        var data = $("#divUserProfileProperties").text();
        try {
            if (data) {
                data = data.replace(/\r?\n|\r/igm, "");
                data = data.replace(/\\/igm, "\\\\");
            }
            return Utils.tryParseJSON(data);
        } catch (e) {
            return null;
        }
    }

    static getConfigurations() {
        return new Promise((resolve, reject) => {
            let cachedConfig = false && Cache.getCache(Constants.CacheKeys.CONFIGURATIONS);
            if (cachedConfig) {
                resolve(cachedConfig);
            } else {
                let testDriveFields = Services.getFieldMetadata(Constants.Lists.TEST_DRIVES, [
                    Constants.Columns.ID,
                    Constants.Columns.TEST_DRIVE_NAME,
                    Constants.Columns.ELITE_DESCRIPTION,
                    Constants.Columns.TESTDRIVE_STATUS,
                    Constants.Columns.TEST_DRIVE_START_DATE,
                    Constants.Columns.TESTDRIVE_END_DATE,
                    Constants.Columns.TOTAL_POINTS,
                    Constants.Columns.TEST_DRIVE_DEPARTMENT,
                    Constants.Columns.TEST_DRIVE_LOCATION,
                    Constants.Columns.AVAILABLE_DEVICES,
                    Constants.Columns.AVAILABLE_OS,
                    Constants.Columns.MAX_TESTDRIVERS,
                    Constants.Columns.LEVEL_ID + '/' + Constants.Columns.LEVEL_NAME,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.ID,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.EXPECTED_BUSINESS_VALUE
                ]);

                let testCaseFields = Services.getFieldMetadata(Constants.Lists.TEST_CASES, [
                    Constants.Columns.TITLE,
                    Constants.Columns.ID,
                    Constants.Columns.ELITE_DESCRIPTION,
                    Constants.Columns.TYPE,
                    Constants.Columns.SCENARIO,
                    Constants.Columns.TEST_CASE_OUTCOME,
                    Constants.Columns.TEST_CASE_PRIORITY,
                    Constants.Columns.POINTS,
                    Constants.Columns.RETEST
                ]);

                let questionFields = Services.getFieldMetadata(Constants.Lists.SURVEY_QUESTIONS, [
                    Constants.Columns.TITLE,
                    Constants.Columns.ID,
                    Constants.Columns.QUESTION,
                    Constants.Columns.RESPONSES,
                    Constants.Columns.RESPONSETYPE
                ]);

                let testDriveLevels = Services.getTestDriveLevels(Constants.Lists.RACE_LEVELS);

                let testCasePoints = Services.getTestPointConfiguration(Constants.Lists.POINTS_CONFIGURATIONS);

                let applicationConfigurations = Services.getApplicationConfigurations();

                Promise.all([testDriveFields,
                    testCaseFields,
                    questionFields,
                    testDriveLevels,
                    testCasePoints,
                    applicationConfigurations
                ]).then(results => {
                    let configObj = {
                        fieldDescription: {
                            testDrives: results[0],
                            testCases: results[1],
                            survey: results[2]
                        },
                        testDriveLevelsConfig: results[3],
                        testCasePoints: results[4],
                        appConfig: results[5]
                    }
                    Cache.setCache(Constants.CacheKeys.CONFIGURATIONS, configObj);
                    resolve(configObj);
                });
            }
        });
    }

    static getApplicationConfigurations() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.APPLICATION_CONFIGURATIONS).items
                .top(100).get().then(configurations => {
                    let appConfig;
                    configurations.map(configuration => {
                        appConfig[configuration.key] = configuration.value;
                    })
                    resolve(appConfig);
                }, err => {
                    reject(err);
                })
        });
    }

    static getTestDrivesByFilter(filter: string, skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.TEST_DRIVE_NAME,
                Constants.Columns.ELITE_DESCRIPTION,
                Constants.Columns.TESTDRIVE_STATUS,
                Constants.Columns.TEST_DRIVE_START_DATE,
                Constants.Columns.TESTDRIVE_END_DATE,
                Constants.Columns.TOTAL_POINTS,
                Constants.Columns.TEST_DRIVE_DEPARTMENT,
                Constants.Columns.TEST_DRIVE_LOCATION,
                Constants.Columns.AVAILABLE_DEVICES,
                Constants.Columns.AVAILABLE_OS,
                Constants.Columns.MAX_TESTDRIVERS,
                Constants.Columns.LEVEL_ID + '/' + Constants.Columns.LEVEL_NAME,
                Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.ID,
                Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_NAME,
                Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                Constants.Columns.EXPECTED_BUSINESS_VALUE
                ).skip(skip).top(top)
                .expand(Constants.Columns.TESTDRIVE_OWNER, Constants.Columns.LEVEL_ID, Constants.Columns.QUESTION_ID, Constants.Columns.TESTCASE_ID)
                .filter(filter).get().then(testDrives => {
                    let testDriveObj: TestDrive;
                    let results = testDrives.map((testDrive) => {
                        return {
                            title: testDrive.TestDriveName,
                            description: testDrive.EliteDescription,
                            status: testDrive.TestDriveStatus,
                            startDate: testDrive.TestDriveStartDate,
                            endDate: testDrive.TestDriveEndDate,
                            maxPoints: testDrive.TotalPoints,
                            department: testDrive.TestDriveDepartment.results,
                            function: [], //testDrive.TestDriveFunction.results,
                            location: testDrive.TestDriveLocation.results,
                            requiredDevices: testDrive.AvailableDevices.results,
                            requiredOs: testDrive.AvailableOS.results,
                            maxTestDrivers: testDrive.MaxTestDrivers,
                            id: testDrive.ID,
                            level: testDrive.LevelID.LevelName,
                            owner: testDrive.TestDriveOwner.UserInfoName,
                            testCaseIDs: testDrive[Constants.Columns.TESTCASE_ID].results,
                            questionIDs: testDrive[Constants.Columns.QUESTION_ID].results,
                            expectedBusinessValue: '',
                            testCases: null,
                            questions: null
                        };
                    });
                    resolve(results);
                }, error => {
                    Utils.clientLog(error);
                })
        });
    }

    static getTestDrivesByOwerneID(ownerID: number, skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            Services.getTestDrivesByFilter("TestDriveOwner eq " + ownerID, skip, top)
                .then((testDrives: any) => {
                    var testDrivesIDs = [];
                    testDrives.map((testDrive, index) => {
                        testDrivesIDs.push(testDrive.id);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {
                        var testDrivesResults = [];
                        testDrives.map((testDrive, index) => {
                            testDrivesResults.push({
                                participants: participants[index],
                                testDrive: testDrive
                            })
                        })
                        resolve(testDrivesResults);
                    })
                    
                }, error => {
                    Utils.clientLog(error);
                });
        });
    }

    static getTestDriveById(testDriveID: number) {
        return new Promise((resolve, reject) => {
            if (testDriveID == -1) {
                resolve(<TestDrive>{
                    id: -1,
                    title: "",
                    description: "",
                    maxPoints: 0,
                    startDate: "",
                    endDate: "",
                    expectedBusinessValue: "",
                    function: [],
                    location: [],
                    requiredDevices: [],
                    requiredOs: [],
                    maxTestDrivers: 0,
                    testCaseIDs: [],
                    testCases: [],
                    questionIDs: [],
                    questions: [],
                    region: [],
                    status: Constants.ColumnsValues.DRAFT,
                    level: ''
                });
            } else {
                pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items.getById(testDriveID)
                    .select(
                    Constants.Columns.ID,
                    Constants.Columns.TEST_DRIVE_NAME,
                    Constants.Columns.ELITE_DESCRIPTION,
                    Constants.Columns.TESTDRIVE_STATUS,
                    Constants.Columns.TEST_DRIVE_START_DATE,
                    Constants.Columns.TESTDRIVE_END_DATE,
                    Constants.Columns.TOTAL_POINTS,
                    Constants.Columns.TEST_DRIVE_DEPARTMENT,
                    Constants.Columns.TEST_DRIVE_LOCATION,
                    Constants.Columns.AVAILABLE_DEVICES,
                    Constants.Columns.AVAILABLE_OS,
                    Constants.Columns.MAX_TESTDRIVERS,
                    Constants.Columns.LEVEL_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.LEVEL_ID + '/' + Constants.Columns.LEVEL_NAME,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.ID,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.EXPECTED_BUSINESS_VALUE
                    )
                    .expand(Constants.Columns.TESTDRIVE_OWNER, Constants.Columns.LEVEL_ID,
                    Constants.Columns.QUESTION_ID, Constants.Columns.TESTCASE_ID)
                    .get().then(testDrive => {
                        let questions = testDrive.QuestionID.results.map((question) => {
                            return question.ID;
                        });
                        let testCases = testDrive.TestCaseID.results.map((testCase) => {
                            return testCase.ID;
                        });

                        let testDriveObj = {
                            title: testDrive.TestDriveName,
                            description: testDrive.EliteDescription,
                            status: testDrive.TestDriveStatus,
                            startDate: testDrive.TestDriveStartDate,
                            endDate: testDrive.TestDriveEndDate,
                            maxPoints: testDrive.TotalPoints,
                            department: testDrive.TestDriveDepartment.results,
                            function: [], //testDrive.TestDriveFunction.results,
                            location: testDrive.TestDriveLocation.results,
                            requiredDevices: testDrive.AvailableDevices.results,
                            requiredOs: testDrive.AvailableOS.results,
                            maxTestDrivers: testDrive.MaxTestDrivers,
                            id: testDrive.ID,
                            level: testDrive.LevelID.ID,
                            owner: testDrive.TestDriveOwner.UserInfoName,
                            testCases: null,
                            questions: null,
                            testCaseIDs: testCases,
                            questionIDs: questions,
                            expectedBusinessValue: testDrive.ExpectedBusinessValue
                        };
                        resolve(testDriveObj);

                    }, error => {
                        reject(error);
                    });
            }
        });
    }

    static getTestDrivesByIDs(ids: number[]) {
        return new Promise((resolve, reject) => {
            let filter = '';
            if (!ids || ids.length == 0) {
                resolve([]);
            } else {
                ids.map((id, index) => {
                    filter += 'ID eq ' + id + (ids.length - 1 != index ? ' or ' : '');
                });
                Services.getTestDrivesByFilter(filter).then(testDrives => {
                    resolve(testDrives);
                }, error => {
                    Utils.clientLog(error);
                })
            }
        });
    }

    static getTestCasesByIds(testCaseIDs: number[]) {
        return new Promise((resolve, reject) => {
            let filter = '';
            if (!testCaseIDs || testCaseIDs.length == 0) {
                resolve([]);
            } else {
                testCaseIDs.map((id, index) => {
                    filter += 'ID eq ' + id + (testCaseIDs.length - 1 != index ? ' or ' : '');
                })
                pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASES).items
                    .select(
                    Constants.Columns.TITLE,
                    Constants.Columns.ID,
                    Constants.Columns.ELITE_DESCRIPTION,
                    Constants.Columns.TYPE,
                    Constants.Columns.SCENARIO,
                    Constants.Columns.TEST_CASE_OUTCOME,
                    Constants.Columns.TEST_CASE_PRIORITY,
                    Constants.Columns.POINTS,
                    Constants.Columns.RETEST
                    )
                    .filter(filter)
                    .get().then(testCases => {
                        let testCaseArray: TestCase[] = [];
                        testCases.map(t => {
                            testCaseArray.push({
                                id: t.ID,
                                title: t.Title,
                                description: t.EliteDescription,
                                expectedOutcome: t.TestCaseOutcome,
                                isInEditMode: false,
                                testCaseType: t.Type,
                                scenario: t.Scenario,
                                priority: t.priority,
                                points: t.Points,
                                reTest: t.ReTest
                            })
                        })
                        resolve(testCaseArray);
                    }, error => {
                        reject(error);
                    });
            }
        });
    }

    static getQuestonsByIds(questionIDs: number[]) {
        return new Promise((resolve, reject) => {
            let filter = '';
            if (!questionIDs || questionIDs.length == 0) {
                resolve([]);
            } else {
                questionIDs.map((id, index) => {
                    filter += 'ID eq ' + id + (questionIDs.length - 1 != index ? ' or ' : '');
                });
                pnp.sp.web.lists.getByTitle(Constants.Lists.SURVEY_QUESTIONS).items
                    .select(
                    Constants.Columns.TITLE,
                    Constants.Columns.ID,
                    Constants.Columns.QUESTION,
                    Constants.Columns.RESPONSES,
                    Constants.Columns.RESPONSETYPE
                    )
                    .filter(filter)
                    .get().then(questions => {
                        let questionArray: Question[] = [];
                        questions.map(q => {
                            questionArray.push({
                                id: q.ID,
                                title: q.Question,
                                questionType: q.ResponseType,
                                options: JSON.parse(q.Responses),
                                isInEditMode: false
                            })
                        });
                        resolve(questionArray);
                    }, error => {
                        reject(error);
                    });
            }
        });
    }

    static getFieldMetadata(listName, columns) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(listName).fields
                .select('Title', 'StaticName', 'Description')
                .get().then(fields => {
                    let metadata = {}
                    fields.map(field => {
                        metadata[field.StaticName] = field.Description
                    });
                    resolve(metadata);
                }, err => {
                    Utils.clientLog(err);
                });
        });
    }

    static getTestDriveLevels(listName) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(listName).items.select(
                'LevelName',
                'ID',
                'LevelPoints'
            ).get().then(levels => {
                let raceLevel = {};
                levels.map(level => {
                    raceLevel[level.ID] = {
                        label: level.LevelName,
                        points: level.LevelPoints
                    }
                });
                resolve(raceLevel);
            }, err => {
                Utils.clientLog(err);
            });
        });
    }

    static getTestPointConfiguration(listName) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(listName).items
                .select(
                'ActivityName',
                'ID',
                'TotalPoints'
                )
                .filter("ActivityName eq '" + Constants.ColumnsValues.TEST_CASE_COMPLETION + "'")
                .get().then(item => {
                    resolve(item[0].TotalPoints);
                }, err => {
                    Utils.clientLog(err);
                });
        });
    }

    static getReferrerID() {
        let referrer = Utils.getUrlParameters(window.location.href, "referrerID");
        if (referrer) {
            return parseInt(referrer);
        }
        else {
            return '';
        }

    }
    static createOrSaveTestDrive(testDrive: TestDrive) {
        return new Promise((resolve, reject) => {
            var promises = [];
            promises.push(this.createTestCase(testDrive.testCases));
            promises.push(this.createQuestions(testDrive.questions));

            Promise.all(promises).then((results) => {
                let testCases = results[0];
                let questions = results[1];
                let testDrives = [];
                let newTestDrive = {
                    ID: testDrive.id,
                    Title: testDrive.title,
                    EliteDescription: testDrive.description,
                    TestDriveStartDate: testDrive.startDate,
                    TestDriveEndDate: testDrive.endDate,
                    TotalPoints: testDrive.maxPoints,
                    LevelID_id: testDrive.level,
                    ExpectedBusinessValue: testDrive.expectedBusinessValue,
                    TestDriveLocation_tax: testDrive.location,
                    AvailableDevices_tax: testDrive.requiredDevices,
                    AvailableOS_tax: testDrive.requiredOs,
                    MaxTestDrivers: testDrive.maxTestDrivers,
                    TestDriveName: testDrive.title,
                    TestDriveStatus: testDrive.status,
                    TestDriveOwner_id: this.getCurrentUserID()
                }
                if (questions.length > 0) {
                    let ids = [];
                    results[1].map(questions => {
                        ids.push(questions.id);
                    })
                    newTestDrive["QuestionID_id"] = {
                        results: ids || []
                    }
                }
                if (testCases.length > 0) {
                    let ids = [];
                    results[0].map(testCase => {
                        ids.push(testCase.id);
                    })
                    newTestDrive["TestCaseID_id"] = {
                        results: ids || []
                    }
                }

                testDrives.push(newTestDrive);

                this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVES,
                    testDrives).then((data: TestDrive) => {
                        resolve({ ...testDrive, id: data[0].id, testCases: testCases, questions: questions });
                    }, err => {
                        reject(err);
                    }).catch(err => {
                        Utils.clientLog(err);
                    });
            });
        });
    }

    static createTestCase(testCases: TestCase[]) {
        return new Promise((resolve, reject) => {
            var testCasesArray = [];
            if (testCases && testCases.length > 0) {
                testCases.forEach((testCase, index) => {
                    testCasesArray.push({
                        ID: testCase.newItem ? -1 : testCase.id,
                        Title: testCase.title,
                        EliteDescription: testCase.description,
                        TestCaseOutcome: testCase.expectedOutcome,
                        Type: testCase.testCaseType,
                        Scenario: testCase.scenario,
                        TestCasePriority: testCase.priority,
                        Points: testCase.points,
                        ReTest: testCase.reTest
                    });
                });

                this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_CASES, testCasesArray).then((data) => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            } else {
                resolve([]);
            }
        });
    }

    static createQuestions(questions: Question[]) {
        return new Promise((resolve, reject) => {
            var questionsArray = [];
            if (questions && questions.length > 0) {
                questions.forEach((question, index) => {
                    questionsArray.push({
                        ID: question.newItem ? -1 : question.id,
                        Question: question.title,
                        Responses: JSON.stringify(question.options),
                        ResponseType: question.questionType
                    });
                });
                this.createOrUpdateListItemsInBatch(Constants.Lists.SURVEY_QUESTIONS, questionsArray).then((data) => {
                    resolve(data);
                }, err => {
                    reject(err);
                })
            } else {
                resolve([]);
            }
        });
    }

    static getDefaultCarDetails() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.CARMASTER).items
                .select("FileRef/FileRef",
                "IsDefault",
                "LevelName",
                "CarName",
                "CarLevel",
                "ID")
                .filter("IsDefault eq 1 and CarLevel eq 1")
                .get().then(car => {
                    resolve(car[0]);
                    console.log(car);
                })
        });
    }

    static getDefaultAvatarDetails() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.AVATAR).items.
                select("FileRef/FileRef", "ID", "AvatarName")
                .filter("IsDefault eq 1")
                .get().then(avatar => {
                    resolve(avatar[0]);
                    console.log(avatar[0]);
                })
        })

    }

    static createEliteUserProfile(user: User) {
        return new Promise((resolve, reject) => {
            let promises = [this.getDefaultCarDetails(), this.getDefaultAvatarDetails()];
            let baseUrl = location.protocol + "//" + location.hostname;
            Promise.all(promises).then(results => {
                let carDetails = <any>results[0];
                let avatarDetails = <any>results[1];
                this.createOrUpdateListItemsInBatch(Constants.Lists.USER_INFORMATION, [{
                    ID: -1,
                    AccountName: user.accountName,
                    DateJoined: new Date().toISOString(),
                    UserLocation: user.location,
                    ReferrerID_id: Services.getReferrerID(),
                    UserRegion: user.region,
                    CarImage: baseUrl + carDetails.FileRef,
                    CarName: carDetails.CarName,
                    CarID_id: carDetails.ID,
                    AvatarName: avatarDetails.AvatarName,
                    AvatarImage: baseUrl + avatarDetails.FileRef,
                    AvatarID_id: avatarDetails.ID,
                    UserDepartment: user.department,
                    UserInfoName: user.displayName,
                }])
                    .then((users: any) => {
                        let user = users[0];
                        let newUser = { ...user, eliteProfileID: user.id }
                        window.location.href = _spPageContextInfo.siteAbsoluteUrl;
                    }, err => {
                        Utils.clientLog(err);
                    })

            });

        });
    }

    static createOrUpdateListItemsInBatch(listName: string, items: any[]) {
        return new Promise((resolve, reject) => {
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                let ctx = SP.ClientContext.get_current();
                let list = ctx.get_web().get_lists().getByTitle(listName);
                const listItems = [];
                items.forEach((item, index) => {
                    if (item.ID !== -1) {
                        listItems[index] = list.getItemById(item.ID);
                    } else {
                        var listInfo = new SP.ListItemCreationInformation();
                        listItems[index] = list.addItem(listInfo);
                    }

                    $.each(item, (key, value) => {
                        if (key.toLowerCase() !== "id") {
                            if (key.toLowerCase().endsWith("_id")) {
                                const columnName = key && key.split("_id")[0];
                                if (value) {
                                    if (typeof value === "object") {
                                        var lookupIds = [];
                                        value.results.forEach(id => {
                                            var lookupID = new SP.FieldLookupValue();
                                            lookupID.set_lookupId(id);
                                            lookupIds.push(lookupID);
                                        });
                                        listItems[index].set_item(columnName, lookupIds);
                                    } else {
                                        var lookupID = new SP.FieldLookupValue();
                                        lookupID.set_lookupId(value);
                                        listItems[index].set_item(columnName, lookupID);
                                    }
                                }

                            }
                            else if (key.toLowerCase().endsWith("_tax")) {
                                const columnName = key && key.split("_tax")[0];
                                var termsArray = new Array();
                                value.forEach(item => {
                                    termsArray.push("-1;#" + item.Label + "|" + item.TermGuid);
                                });
                                var termValueString = termsArray.join(";#");

                                listItems[index].set_item(columnName, termValueString);
                            } else {
                                listItems[index].set_item(key, value)
                            }
                        }
                    });
                    listItems[index].update()
                    ctx.load(listItems[index]);
                });
                ctx.executeQueryAsync((sender, args) => {
                    var results = [];
                    listItems.forEach((element, index) => {
                        results.push({ ...items[index], id: element.get_id() });
                    });
                    resolve(results);
                }, (sender, args) => {
                    reject(new Error(args.get_message()));
                });
            });
        });
    }

    static getAllTermsInTermGroup() {
        // get termSet
        return new Promise((resolve, reject) => {
            let termStore = new TermStore();
            termStore.getTermSetsInGroup({
                groupId: "0b7c0b89-06e8-4b9b-a3ba-52b8183f1cc7"
            }).then((termSets: any[]) => {
                var promises = [];
                termSets.forEach(termSet => {
                    promises.push(termStore.getTermSetAsTree(termSet.id, termSet.name));
                });
                Promise.all(promises).then((data) => {
                    console.log(data);
                })
            })
        })
    }

    static uploadFiles(file: any, fileName: string) {
        return new Promise((resolve, reject) => {
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                let ctx = SP.ClientContext.get_current();
                let folderName = _spPageContextInfo.siteServerRelativeUrl + "/PublishingImages";
                Utils.uploadFile(ctx, folderName, fileName, file).then((data) => {
                    resolve({
                        data: {
                            link: location.protocol + "//" + location.hostname + data.data.ServerRelativeUrl
                        }
                    });
                }, err => {
                    reject(err);
                });
            })
        });
    }

    static deleteTestDrive(testDriveId: number) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .getById(testDriveId).delete().then(data => {
                    resolve(testDriveId);
                }, err => {
                    Utils.clientLog(err);
                });
        });

    }

    static getRegions() {
        return new Promise((resolve, reject) => {
            let termSetName = "region";
            let termSetID = "b8faa129-d458-4a1d-94a4-8820d7cc3840";
            this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                Cache.setCache("region", options)
                resolve(options);
            });
        });
    }

    static getLocations() {
        return new Promise((resolve, reject) => {
            let termSetName = "location";
            let termSetID = "b49f64b3-4722-4336-9a5c-56c326b344d4";
            this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                resolve(options);
            });
        });
    }

    static getDevices() {
        return new Promise((resolve, reject) => {
            let termSetName = "device";
            let termSetID = "f28f2afc-b917-4063-b44d-0273e121a41d";
            this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                resolve(options);
            });
        });
    }

    static getOSes() {
        return new Promise((resolve, reject) => {
            let termSetName = "os";
            let termSetID = "93cae476-6660-4625-b80b-51697ff26c3b";
            this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                resolve(options);
            });
        });
    }

    static formatDate(date: string) {
        let today = date && date.toLowerCase() !== "today" ? new Date(date) : new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }

    static getTermSetAsOptions(termSetName, termSetID) {
        return new Promise((resolve, reject) => {
            let record = Cache.getCache(termSetName);
            if (record) {
                resolve(record);
            } else {
                let termStore = new TermStore();
                termStore.getTermSetAsTree(termSetID, termSetName)
                    .then(term => {
                        let options = [];
                        term.children.map((term) => {
                            options.push({
                                TermGuid: term.guid,
                                Label: term.name
                            })
                        });
                        Cache.setCache(termSetName, options)
                        resolve(options);
                    });
            }
        });
    }

    // static getLeaderBoard() {
    //     var d = new Date();
    //     var lastYear = d.getFullYear() - 1 + "-12-31";
    //     return new Promise((resolve, reject) => {
    //         let leaderBoardArr: Leaders[] = [];
    //         pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
    //             .select("Points",
    //             "UserID/ID",
    //             "UserID/UserInfoName"
    //             )
    //             .expand("UserID").top(3).orderBy('Points', false).filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z'")
    //             .get().then(testDrives => {
    //                 testDrives.map((testDrive, index) => {
    //                     leaderBoardArr.push({
    //                         id: index + 1,
    //                         name: testDrive.UserID.UserInfoName,
    //                         points: testDrive.Points,
    //                         avatar: "http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc1.png"
    //                     });
    //                 });
    //                 resolve(leaderBoardArr);
    //             })
    //     });
    // }

    // static getLeaderBoardRegion() {
    //     var d = new Date();
    //     var lastYear = d.getFullYear() - 1 + "-12-31";
    //     return new Promise((resolve, reject) => {
    //         let regionLeaderBoardArr: Leaders[] = [];
    //         pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
    //             .select("UserLocation"
    //             )
    //             .filter("UserID eq " + _spPageContextInfo.userId + "")
    //             .get().then(userInfo => {
    //                 pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
    //                     .select("Points",
    //                     "UserID/ID",
    //                     "UserID/UserInfoName"
    //                     )
    //                     .expand("UserID").top(3).orderBy('Points', false).filter("User_x0020_ID_x003a_Location eq '" + userInfo[0].UserLocation + "'")
    //                     .get().then(testDrives => {
    //                         testDrives.map((testDrive, index) => {
    //                             regionLeaderBoardArr.push({
    //                                 id: index + 1,
    //                                 name: testDrive.UserID.UserInfoName,
    //                                 points: testDrive.Points,
    //                                 avatar: "http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc1.png"
    //                             });
    //                         });
    //                         resolve(regionLeaderBoardArr);
    //                     })
    //             })

    //     });
    // }

    static getGlobalLeaders(skip = 0, count = 3) {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let globalLeaders: Leader[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.POINTS,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                Constants.Columns.USER_ID + '/' + Constants.Columns.USER_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_IMAGE,
                Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_IMAGE,
            )
                .expand("UserID").top(100)
                .orderBy('Points', false)
                .filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z'")
                .skip(skip).top(count)
                .get().then(leaders => {
                    console.log(leaders);
                    leaders.map((leader, index) => {
                        globalLeaders.push({
                            id: leader.ID,
                            name: leader.UserID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserID.AvatarImage,
                            car: leader.UserID.CarImage,
                            completedTestDrives: 400,
                            rank: index + 1
                        })
                    })
                    resolve(globalLeaders);
                })
        });
    }

    static getRegionalLeaders(region: string, skip = 0, top = 3) {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let regionalLeaders: Leader[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.POINTS,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                Constants.Columns.USER_ID + '/' + Constants.Columns.USER_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_IMAGE,
                Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_NAME,
                Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_IMAGE,
                Constants.Columns.USER_ID + '/' + Constants.Columns.USER_REGION,
            )
                .expand("UserID").top(top).skip(skip)
                .orderBy('Points', false)
                .filter("PointsEarnedOnDate gt datetime'" +
                lastYear + "T23:59:59.000Z' and " + Constants.Columns.USER_ID + '/' + Constants.Columns.USER_REGION + " eq '" + region + "'")
                .get().then(leaders => {
                    console.log(leaders);
                    leaders.map((leader, index) => {
                        regionalLeaders.push({
                            id: leader.ID,
                            name: leader.UserID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserID.AvatarImage,
                            car: leader.UserID.CarImage,
                            completedTestDrives: 400,
                            rank: index + 1
                        })
                    })
                    resolve(regionalLeaders);
                })
        });
    }

    static getUserPoints(userID: number) {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(
                Constants.Columns.POINTS,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                Constants.Columns.USER_ID + '/' + Constants.Columns.USER_NAME
                )
                .expand(Constants.Columns.USER_ID).orderBy(Constants.Columns.POINTS, false)
                .filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z' and UserID eq " + userID)
                .get().then(testDrives => {
                    resolve(testDrives[0].Points);
                })
        });
    }

    static getCurrentUserCarImage() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                .select("BadgeID/ID")
                .expand("BadgeID").filter("UserID eq '18'")
                .get().then(badge => {
                    pnp.sp.web.lists.getByTitle(Constants.Lists.BADGES).items
                        .select("CarID/ID")
                        .expand("CarID").filter("ID eq " + badge[0].BadgeID.ID + "")
                        .get().then(car => {
                            pnp.sp.web.lists.getByTitle(Constants.Lists.CARMASTER).items
                                .select("File/Name")
                                .expand("File").filter("ID eq " + car[0].CarID.ID + "")
                                .get().then(carImage => {
                                    resolve(carImage[0].File.Name);
                                });
                        });
                })
        });
    }

    static getListItemCount(listName) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(listName).get().then(function (result) {
                resolve(result.ItemCount);
            });
        });
    }

    static getListItemCountUsingCAML(listName, query) {
        var camlQuery =
            {
                ViewXml: query
            }
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(listName).getItemsByCAMLQuery(camlQuery).then(function (listitems) {
                resolve(listitems.length);
            });
        });
    }

    static getTestDrivesCompleted() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select("ID,UserID/ID").expand("UserID")
                .filter("UserID eq '1' and Status eq '" + Constants.ColumnsValues.COMPLETE_STATUS + "'")
                .get().then(testDrives => {
                    resolve(testDrives.length);
                })
        });
    }

    static getActiveTestDrives(skip = 0, top = 3) {
        var d = new Date();
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return new Promise((resolve, reject) => {
            Services.getTestDrivesByFilter("TestDriveStatus eq 'Active' and TestDriveStartDate le datetime'" + todayDate +
                "T00:00:00.000Z' and TestDriveEndDate ge datetime'" + todayDate + "T00:00:00.000Z'").then((testDriveInstances: TestDrive[]) => {
                    if (testDriveInstances && testDriveInstances.length > 0) {
                        let activeTestDriveArr: HomeTestDrive[] = [];
                        let testDrivesIDs = [];
                        testDriveInstances.map((value, index) => {
                            testDrivesIDs.push(testDriveInstances[index].id);
                        });
                        Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {
                            testDriveInstances.map((testDrive, index) => {
                                activeTestDriveArr.push({
                                    id: testDrive.id,
                                    title: testDrive.title,
                                    enddate: testDrive.endDate,
                                    participants: parseInt(participants[index]),
                                    testDrive: testDrive
                                });
                            });
                            resolve(activeTestDriveArr);
                        }, err => reject(err))
                    } else {
                        resolve(testDriveInstances);
                    }
                })
        });
    }

    static getUpcomingTestDrives(skip = 0, top = 3) {
        var d = new Date();
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return new Promise((resolve, reject) => {
            Services.getTestDrivesByFilter("TestDriveStatus eq 'Active' and TestDriveStartDate ge datetime'" + todayDate + "T00:00:00.000Z'")
                .then((testDriveInstances: TestDrive[]) => {
                    if (testDriveInstances && testDriveInstances.length > 0) {
                        let upcomingTestDriveArr: HomeTestDrive[] = [];
                        let testDrivesIDs = [];
                        testDriveInstances.map((value, index) => {
                            testDrivesIDs.push(testDriveInstances[index].id);
                        });

                        Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {

                            testDriveInstances.map((testDrive, index) => {
                                upcomingTestDriveArr.push({
                                    id: testDrive.id,
                                    title: testDrive.title,
                                    enddate: testDrive.endDate,
                                    participants: parseInt(participants[index]),
                                    testDrive: testDrive
                                });
                            });
                            resolve(upcomingTestDriveArr);
                        }, err => reject(err))
                    } else {
                        resolve(testDriveInstances);
                    }

                })
        });
    }

    // static getTestDrivesIRun() {
    //     var d = new Date();
    //     var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    //     return new Promise((resolve, reject) => {
    //         pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
    //             .select("TestDriveName", "ID", "TestDriveEndDate", "Author/Id").top(3).expand("Author/Id")
    //             .orderBy("Created", true)
    //             .filter("Author/Id eq '" + _spPageContextInfo.userId + "'")
    //             .get().then(testDriveInstances => {
    //                 let testDriveArr: HomeTestDrive[] = [];
    //                 let testDrivesIDs = [];
    //                 testDriveInstances.map((value, index) => {
    //                     testDrivesIDs.push(testDriveInstances[index].ID);
    //                 });

    //                 Promise.all([Services.getTestDrivesByIDs(testDrivesIDs),
    //                 Services.getTestDrivesParticipantCount(testDrivesIDs)]).then(results => {
    //                     let testDrives = results[0];
    //                     let participants = results[1];

    //                     testDriveInstances.map((testDrive, index) => {
    //                         testDriveArr.push({
    //                             id: testDrive.ID,
    //                             title: testDrive.TestDriveID.TestDriveName,
    //                             enddate: testDrive.TestDriveID.TestDriveEndDate,
    //                             participants: parseInt(participants[index]),
    //                             testDrive: testDrives[index]
    //                         });
    //                     });
    //                     resolve(testDriveArr);
    //                 })

    //             })
    //     });
    // }

    static getTestDriveResponsesWithFilter(filter: string) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select(
                Constants.Columns.ID,
                Constants.Columns.PERCENTAGE_COMPLETION,
                Constants.Columns.CURRENT_POINTS,
                Constants.Columns.STATUS,
                Constants.Columns.DATE_JOINED,
                Constants.Columns.TEST_CASE_COMPLETED,
                Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                Constants.Columns.USER_ID + '/' + Constants.Columns.ID
                )
                .filter(filter)
                .expand(Constants.Columns.TEST_DRIVE_ID, Constants.Columns.USER_ID)
                .get().then(testDriveInstances => {
                    resolve(testDriveInstances);
                }, err => reject(err))
        });
    }

    static getMyTestDrives(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var filter = Constants.Columns.USER_ID + ' eq ' + Services.getCurrentUserID();
            Services.getTestDriveResponsesWithFilter(filter).then((testDriveInstances: any) => {
                if (testDriveInstances && testDriveInstances.length > 0) {
                    var myTestDriveArr: HomeTestDrive[] = [];
                    var testDrivesIDs = [];
                    testDriveInstances.map((value, index) => {
                        testDrivesIDs.push(value.TestDriveID.ID);
                    });
                    Promise.all([Services.getTestDrivesByIDs(testDrivesIDs),
                    Services.getTestDrivesParticipantCount(testDrivesIDs)]).then(results => {
                        let testDrives: any = results[0];
                        let participants = results[1];

                        testDriveInstances.map((testDriveInstances, index) => {
                            var testDrive = testDrives.filter(testdrive => {
                                return testdrive.id == testDriveInstances.TestDriveID.ID;
                            })
                            testDrive = testDrive.length && testDrive[0];

                            myTestDriveArr.push({
                                id: testDrive.id,
                                title: testDrive.title,
                                enddate: testDrive.endDate,
                                participants: parseInt(participants[index]),
                                testDrive: testDrive,
                                testDriveResponse: (<TestDriveResponse>{
                                    instanceID: testDriveInstances.ID,
                                    status: testDriveInstances.Status,
                                    currentPoint: testDriveInstances.CurrentPoints,
                                    dateJoined: testDriveInstances.DateJoined,
                                    numberOfTestCasesCompleted: testDriveInstances.TestCaseCompleted
                                })
                            });
                        });
                        resolve(myTestDriveArr);
                    }, err => reject(err))
                } else {
                    resolve(testDriveInstances);
                }

            })
        });
    }

    static getTestDrivesParticipantCount(testDrivesID) {
        return new Promise((resolve, reject) => {
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                let resultArr = [];
                let testDrivesCount = testDrivesID.length;
                var testDrives = [];
                var clientContext = new SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var list = web.get_lists().getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES);
                $.each(testDrivesID, function (index, testDriveID) {
                    var camlQuery = new SP.CamlQuery();
                    var q = "<View><Query><Where><Eq><FieldRef Name='TestDriveID' /><Value Type='Integer'>" + testDriveID + "</Value></Eq></Where></Query></View>";
                    camlQuery.set_viewXml(q);
                    var listItems = list.getItems(camlQuery);
                    testDrives[index] = listItems;
                    clientContext.load(testDrives[index], 'Include(Id)');
                });
                clientContext.executeQueryAsync(
                    Function.createDelegate(null, function () {
                        var allCounts;
                        $.each(testDrives, function (index, testDrive) {
                            resultArr.push(testDrive.get_count());
                            if (testDrivesCount - 1 == index) {
                                resolve(resultArr);
                            }
                            console.log("JSOM : " + testDrive.get_count());
                        });
                    }),
                    Function.createDelegate(null, function () {
                    }));
            });
        });
    }

    static getUserProfileData() {
        return new Promise((resolve, reject) => {
            pnp.sp.profiles.myProperties.get().then(function (result) {
                resolve(result.UserProfileProperties.results);
                //Below code will use in different screen
                var props = result.UserProfileProperties.results;
                var propValue = "";
                props.forEach((prop, index) => {
                    propValue += prop.Key + " - " + prop.Value + "<br/>";
                });
                console.log(propValue);
            }).catch(function (err) {
                console.log("Error: " + err);
            });
        });
    }

    static loadProgressBar(val, optionsVal, optionsSize, canvasID) {
        Utils.loadProgressBar(val, optionsVal, optionsSize, canvasID);
    }
}

export class Utils {
    public LoadedScripts = [];

    public static getUrlParameters(url, name) {
        var regexS, regex, results;
        if (!url) url = location.href;
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        regexS = '[\\?&]' + name + '=([^&#]*)';
        regex = new RegExp(regexS);
        results = regex.exec(url);
        return results === null ? null : decodeURIComponent(results[1]);
    }

    public static loadProgressBar(val, optionsVal, optionsSize, canvasID) {
        if ($('#' + canvasID)[0] != undefined) {
            window["options" + val] = {
                value: optionsVal,
                size: optionsSize,
                startAngle: -Math.PI,
                startColor: 'red',
                endColor: 'red',
                animation: {
                    duration: 1200,
                    easing: 'circleProgressEase'
                }
            };

            $.easing.circleProgressEase = function (x, t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            };

            window["s" + val] = window["options" + val].size, // square size
                window["v" + val] = window["options" + val].value, // current value: from 0.0 to 1.0
                window["r" + val] = window["s" + val] / 2, // radius
                window["t" + val] = window["s" + val] / 14; // thickness

            window["canvas" + val] = $('#' + canvasID)[0];
            window["canvas" + val].width = window["s" + val];
            window["canvas" + val].height = window["s" + val];
            window["ctx" + val] = window["canvas" + val].getContext('2d');
            window["lg" + val] = window["ctx" + val].createLinearGradient(0, 0, window["s" + val], 0);
            window["lg" + val].addColorStop(0, window["options" + val].startColor);
            window["lg" + val].addColorStop(1, window["options" + val].endColor);
            window["ctx" + val].fillStyle = "rgba(0, 0, 0, .1)";

            // Draw circle
            if (window["options" + val].animation)
                _drawAnimated(window["v" + val]);
            else
                _draw(window["v" + val]);

            // now let's animate numbers
            window["valE" + val] = $('.value');
            window["valE" + val].data('origVal', window["valE" + val].text());
            $(window["canvas" + val]).on('circle-animation-progress', function (e, progress) {
                window["valE" + val].text(parseInt(window["valE" + val].data('origVal')) * progress)
            });
        }

        function _draw(p) {
            // Clear frame
            window["ctx" + val].clearRect(0, 0, window["s" + val], window["s" + val]);

            // Draw background circle
            window["ctx" + val].beginPath();
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val], -Math.PI, Math.PI);
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val] - window["t" + val], Math.PI, -Math.PI, true);
            window["ctx" + val].closePath();
            window["ctx" + val].fill(); // gray fill

            // Draw progress arc
            window["ctx" + val].beginPath();
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val], -Math.PI, -Math.PI + Math.PI * 2 * p);
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val] - window["t" + val], -Math.PI + Math.PI * 2 * p, -Math.PI, true);
            window["ctx" + val].closePath();
            window["ctx" + val].save();
            window["ctx" + val].clip();
            window["ctx" + val].fillStyle = window["lg" + val];
            window["ctx" + val].fillRect(0, 0, window["s" + val], window["s" + val]); // gradient fill
            window["ctx" + val].restore();
        }

        function _drawAnimated(v) {
            $(window["canvas" + val]).stop(true, true).css({ value: 0 }).animate({ value: window["v" + val] }, $.extend({}, window["options" + val].animation, {
                step: function (p) {
                    _draw(p);
                    $(window["canvas" + val]).trigger('circle-animation-progress', [p / window["v" + val], p]);
                },

                complete: function () {
                    $(window["canvas" + val]).trigger('circle-animation-end');
                }
            }));
        }
    }

    public static uploadFile(ctx: SP.ClientContext, folderName: string, fileName: any, file: any): any {
        return new Promise((resolve, reject) => {
            // you can adjust this number to control what size files are uploaded in chunks
            if (file.size <= 10485760) {
                pnp.sp.web.getFolderByServerRelativeUrl(folderName)
                    .files
                    .add(file.name, file, true).then(data => {
                        resolve(data)
                    }, err => {
                        reject(err)
                    });
            } else {
                // large upload
                pnp.sp.web.getFolderByServerRelativeUrl(folderName).files.addChunked(file.name, file, data => {

                }, true).then(data => {
                    resolve(data)
                }, err => { reject(err) });
            }
        });
    }

    public static clientLog(data) {
        if (typeof console === "undefined") {
            return;
        }
        if (arguments.length > 0) {
            console.log(arguments);
        }
    }

    public loadScript(scriptName: string) {
        let classContext = this;
        return new Promise((resolve, reject) => {
            let scriptbase = _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/";
            scriptName = scriptName.toLowerCase();
            if ($("script[src*='" + scriptName + "']").length === 0 && $.inArray(scriptName, this.LoadedScripts) === -1) {
                $.getScript(scriptbase + scriptName, () => {
                    classContext.LoadedScripts.push(scriptName);
                    return resolve(scriptName);
                });
            }
            else {
                return resolve(scriptName);
            }
        });
    }


    static tryParseJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }

}

export class TermStore {
    public LoadedScripts = [];

    constructor() {
        this.getTermSet = this.getTermSet.bind(this);
    }
    loadScript(scriptName, functionName = "") {
        let classContext = this;
        let loadedScripts = $("#app").attr("loadded-scripts") || '';
        return new Promise((resolve, reject) => {
            let scriptbase = _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/";
            scriptName = scriptName.toLowerCase();

            if ($("script[src*='" + scriptName + "']").length == 0 && loadedScripts.indexOf(scriptName) == -1) {
                $("#app").attr("loadded-scripts", loadedScripts + "; " + scriptName);
                $.getScript(scriptbase + scriptName, () => {
                    loadedScripts = $("#app").attr("loadded-scripts") || '';
                    return resolve(scriptName);
                });
            }
            else {
                return resolve(scriptName);
            }
        });

    }

    loadTaxonomyScripts() {
        return new Promise((resolve, reject) => {
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {

                Promise.all([
                    // this.loadScript("sp.runtime.js"),
                    this.loadScript("sp.taxonomy.js")
                ]).then(() => {
                    resolve(true);
                }, (args) => reject(args));
            });
        });
    }

    /*
        * Returns a termset, based on ID
        *
        * @param {Array} options - options is an array of termSetName,lcid and context.
        */
    getTermSetsInGroup(options) {
        return new Promise((resolve, reject) => {
            this.loadTaxonomyScripts().then(() => {
                let settings = { groupId: "0b7c0b89-06e8-4b9b-a3ba-52b8183f1cc7", lcid: "1033", context: SP.ClientContext.get_current() };
                let scriptbase = _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/";
                $.extend(settings, options);
                var taxonomySession,
                    termStores,
                    termStore,
                    termSets,
                    termSet,
                    terms,
                    termGroup,
                    termSetColl;

                taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(settings.context);
                termStores = taxonomySession.get_termStores();
                termStore = taxonomySession.getDefaultSiteCollectionTermStore();
                termGroup = termStore.getGroup(settings.groupId);
                termSetColl = termGroup.get_termSets();
                settings.context.load(termSetColl);
                settings.context.executeQueryAsync(() => {
                    var termSetEnum = termSetColl.getEnumerator();
                    var termSetList = [];
                    while (termSetEnum.moveNext()) {
                        var currentTermSet = termSetEnum.get_current();
                        termSetList.push({
                            name: currentTermSet.get_name(),
                            id: currentTermSet.get_id()._m_guidString$p$0
                        });
                    }
                    resolve(termSetList);
                }, (sender, args) => {
                    reject(new Error(args.get_message()));
                });
            });
        })
    }

    getTermSet(id, callback) {
        this.loadTaxonomyScripts().then(() => {
            var ctx = SP.ClientContext.get_current(),
                taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx),
                termStore = taxonomySession.getDefaultSiteCollectionTermStore(),
                termSet = termStore.getTermSet(id),
                terms = termSet.getAllTerms();

            ctx.load(terms);

            ctx.executeQueryAsync(() => {
                callback(terms);
            }, (sender, args) => { });
        });
    };

    getTermSetAsTree(id, termSetName) {
        const self = this;
        let deferred = $.Deferred();
        this.loadTaxonomyScripts().then(() => {
            self.getTermSet(id, function (terms) {
                var termsEnumerator = terms.getEnumerator(),
                    tree = {
                        name: termSetName,
                        guid: id,
                        term: terms,
                        children: []
                    };

                // Loop through each term
                while (termsEnumerator.moveNext()) {
                    var currentTerm = termsEnumerator.get_current();
                    var currentTermPath = currentTerm.get_pathOfTerm().split(';');
                    var children = tree.children;

                    // Loop through each part of the path
                    for (var i = 0; i < currentTermPath.length; i++) {
                        var foundNode = false;

                        for (var j = 0; j < children.length; j++) {
                            if (children[j].name === currentTermPath[i]) {
                                foundNode = true;
                                break;
                            }
                        }

                        // Select the node, otherwise create a new one
                        var term = foundNode ? children[j] : { name: currentTermPath[i], children: [] };

                        // If we're a child element, add the term properties
                        if (i === currentTermPath.length - 1) {
                            term.term = currentTerm;
                            term.title = currentTerm.get_name();
                            term.guid = currentTerm.get_id().toString();
                        }

                        // If the node did exist, let's look there next iteration
                        if (foundNode) {
                            children = term.children;
                        }
                        // If the segment of path does not exist, create it
                        else {
                            children.push(term);

                            // Reset the children pointer to add there next iteration
                            if (i !== currentTermPath.length - 1) {
                                children = term.children;
                            }
                        }
                    }
                }

                tree = self.sortTermsFromTree(tree);
                deferred.resolve(tree);
            });
        });
        return deferred.promise();

    };

    sortTermsFromTree = function (tree) {
        // Check to see if the get_customSortOrder function is defined. If the term is actually a term collection,
        // there is nothing to sort.
        if (tree.children.length && tree.term.get_customSortOrder) {
            var sortOrder = null;

            if (tree.term.get_customSortOrder()) {
                sortOrder = tree.term.get_customSortOrder();
            }

            // If not null, the custom sort order is a string of GUIDs, delimited by a :
            if (sortOrder) {
                sortOrder = sortOrder.split(':');

                tree.children.sort(function (a, b) {
                    var indexA = sortOrder.indexOf(a.guid);
                    var indexB = sortOrder.indexOf(b.guid);

                    if (indexA > indexB) {
                        return 1;
                    } else if (indexA < indexB) {
                        return -1;
                    }

                    return 0;
                });
            }
            // If null, terms are just sorted alphabetically
            else {
                tree.children.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    } else if (a.title < b.title) {
                        return -1;
                    }

                    return 0;
                });
            }
        }

        for (var i = 0; i < tree.children.length; i++) {
            tree.children[i] = this.sortTermsFromTree(tree.children[i]);
        }
        return tree;
    };
}

export class Cache {
    static setCache(cacheKey: string, cacheValue: any, cacheType: string = "localStorage", expirationMins: number = 60) {
        var record, expirationMs;

        if (cacheKey && cacheValue) {
            try {
                cacheKey = this.getStorageKey(cacheKey);
                expirationMs = expirationMins ? (expirationMins * 60 * 1000) : null;

                record = {
                    value: JSON.stringify(cacheValue),
                    timestamp: expirationMs ? (new Date().getTime() + expirationMs) : null
                };

                window[cacheType].setItem(cacheKey, JSON.stringify(record));
            } catch (e) {
                Utils.clientLog(e.message);
            }
        }
    }

    /*
     * Gets local storage cache value using the cache key.
     * @param {string} cacheKey - Cache key.
     */
    static getCache(cacheKey, cacheType = "localStorage") {
        var record;

        if (cacheKey) {
            try {
                cacheKey = this.getStorageKey(cacheKey);
                record = this.tryParseJSON(window[cacheType].getItem(cacheKey));
                if (record) {
                    if (record.timestamp) {
                        if (new Date().getTime() < record.timestamp) {
                            record = this.tryParseJSON(record.value);
                        } else {
                            record = null;
                            window[cacheType].removeItem(cacheKey);
                        }
                    } else {
                        record = this.tryParseJSON(record.value);
                    }
                }
            } catch (e) {
                Utils.clientLog(e.message);
            }
        }

        return record;
    }

    static tryParseJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }

    static getStorageKey(key) {
        return (_spPageContextInfo.siteAbsoluteUrl.replace(/\W/g, '') +
            _spPageContextInfo.userId.toString().replace(/\W/g, '') + key).toLowerCase();
    }
};

export default Services;
