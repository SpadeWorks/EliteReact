import Promise from "ts-promise";
import * as Constants from './constants';
import pnp from 'sp-pnp-js';
import { TestDrive, Question, TestCase } from '../../test_drive/model';
import * as $ from 'jquery';
import * as moment from 'moment';
import TestCases from "../../test_drive/components/TestCases";
import { HomeTestDrive, Leaders } from '../../home/model';
import { Leader } from '../../leader_board/model';
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
    static getCurrentUserID() {
        return 1; //TODO 
    }

    static getTotalUserCount(){
        return new Promise((resolve, reject) => {
            resolve(3434);
        });
    }

    static getOnboardingDetails(){
        return new Promise((resolve, reject) => {
            let user = this.getUserProfileProperties();
            this.getTotalUserCount().then(usersCount =>{
                resolve({
                    totalUsers: usersCount,
                    currentUser: user.firstName
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
            let cachedConfig = Cache.getCache(Constants.CacheKeys.CONFIGURATIONS);
            if (cachedConfig) {
                resolve(cachedConfig);
            } else {
                let testDriveFields = Services.getFieldMetadata(Constants.Lists.TEST_DRIVES, [
                    'ID',
                    'TestDriveName',
                    'EliteDescription',
                    'TestDriveStatus',
                    'TestDriveStartDate',
                    'TestDriveEndDate',
                    'TotalPoints',
                    'TestDriveDepartment',
                    'TestDriveLocation',
                    'AvailableDevices',
                    'AvailableOS',
                    'MaxTestDrivers',
                    'LevelID/ID',
                    'LevelID/LevelName',
                    'TestDriveOwner/ID',
                    'TestDriveOwner/UserInfoName',
                    'TestCases/ID',
                    'Questions/ID',
                    'ExpectedBusinessValue'
                ]);

                let testCaseFields = Services.getFieldMetadata(Constants.Lists.TEST_CASES, [
                    'Title',
                    'ID',
                    'EliteDescription',
                    'Type',
                    'Scenario',
                    'TestCaseOutcome',
                    'TestCasePriority',
                    'Points',
                    'ReTest'
                ]);

                let questionFields = Services.getFieldMetadata(Constants.Lists.SURVEY_QUESTIONS, [
                    'Title',
                    'ID',
                    'Question',
                    'Responses',
                    'ResponseType',
                ]);

                let testDriveLevels = Services.getTestDriveLevels(Constants.Lists.RACE_LEVELS);

                let testCasePoints = Services.getTestPointConfiguration(Constants.Lists.POINTS_CONFIGURATIONS);
                Promise.all([testDriveFields,
                    testCaseFields,
                    questionFields,
                    testDriveLevels,
                    testCasePoints
                ]).then(results => {
                    let configObj = {
                        fieldDescription: {
                            testDrives: results[0],
                            testCases: results[1],
                            survey: results[2]
                        },
                        testDriveLevelsConfig: results[3],
                        testCasePoints: results[4]
                    }
                    Cache.setCache(Constants.CacheKeys.CONFIGURATIONS, configObj);
                    resolve(configObj);
                });
            }
        });
    }

    static getTestDrivesByOwerneID(ownerID: number) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .select('ID',
                'TestDriveName',
                'EliteDescription',
                'TestDriveStatus',
                'TestDriveStartDate',
                'TestDriveEndDate',
                'TotalPoints',
                'TestDriveDepartment',
                'TestDriveLocation',
                // 'TestDriveFunction',
                'AvailableDevices',
                'AvailableOS',
                'MaxTestDrivers',
                'LevelID/ID',
                'LevelID/LevelName',
                'TestDriveOwner/ID',
                'TestDriveOwner/UserInfoName',
                'TestCases/ID',
                'Questions/ID',
            )
                .expand('TestDriveOwner', 'LevelID', 'Questions', 'TestCases')
                .filter("TestDriveOwner eq " + ownerID).get().then(testDrives => {
                    let testDriveObj: TestDrive;
                    let results = testDrives.map((testDrive) => {
                        let questions = testDrive.Questions.results.map((question) => {
                            return question.ID;
                        })
                        let testCases = testDrive.TestCases.results.map((testCase) => {
                            return testCase.ID;
                        })

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
                            testCaseIDs: testCases,
                            questionIDs: questions,
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
                    status: 'Draft',
                    level: ''
                });
            }
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items.getById(testDriveID)
                .select(
                'ID',
                'TestDriveName',
                'EliteDescription',
                'TestDriveStatus',
                'TestDriveStartDate',
                'TestDriveEndDate',
                'TotalPoints',
                'TestDriveDepartment',
                'TestDriveLocation',
                // 'TestDriveFunction',
                'AvailableDevices',
                'AvailableOS',
                'MaxTestDrivers',
                'LevelID/ID',
                'LevelID/LevelName',
                'TestDriveOwner/ID',
                'TestDriveOwner/UserInfoName',
                'TestCases/ID',
                'Questions/ID',
                'ExpectedBusinessValue'
                )
                .expand('TestDriveOwner', 'LevelID', 'Questions', 'TestCases')
                .get().then(testDrive => {
                    let questions = testDrive.Questions.results.map((question) => {
                        return question.ID;
                    });
                    let testCases = testDrive.TestCases.results.map((testCase) => {
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
                    .select('Title',
                    'ID',
                    'EliteDescription',
                    'Type',
                    'Scenario',
                    'TestCaseOutcome',
                    'TestCasePriority',
                    'Points',
                    'ReTest',
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
                    .select('Title',
                    'ID',
                    'Question',
                    'Responses',
                    'ResponseType',
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
                .filter("ActivityName eq 'TEST_CASE_COMPLETION'")
                .get().then(item => {
                    resolve(item[0].TotalPoints);
                }, err => {
                    Utils.clientLog(err);
                });
        });
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
                    newTestDrive["Questions_id"] = {
                        results: ids || []
                    }
                }
                if (testCases.length > 0) {
                    let ids = [];
                    results[0].map(testCase => {
                        ids.push(testCase.id);
                    })
                    newTestDrive["TestCases_id"] = {
                        results: ids || []
                    }
                }

                testDrives.push(newTestDrive);

                this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVES,
                    testDrives).then((data: TestDrive) => {
                        resolve({ ...testDrive, id: data.id, testCases: testCases, questions: questions });
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

    // static getRegions() {
    //     return new Promise((resolve, reject) => {
    //         const data = [
    //             { Label: 'Region 1', TermGuid: 'Region 1' },
    //             { Label: 'Region 2', TermGuid: 'Region 2' },
    //             { Label: 'Region 3', TermGuid: 'Region 3' },
    //             { Label: 'Region 4', TermGuid: 'Region 4' },
    //             { Label: 'Region 5', TermGuid: 'Region 5' },
    //             { Label: 'Region 6', TermGuid: 'Region 6' },
    //             { Label: 'Region 7', TermGuid: 'Region 7' },
    //             { Label: 'Region 8', TermGuid: 'Region 8' },
    //             { Label: 'Region 9', TermGuid: 'Region 9' },
    //         ];
    //         setTimeout(() => {
    //             resolve(data);
    //         }, delay);
    //     });
    // }

    // static getLocations() {
    //     return new Promise((resolve, reject) => {
    //         const data = [
    //             { Label: 'Location 1', TermGuid: 'Location 1' },
    //             { Label: 'Location 2', TermGuid: 'Location 2' },
    //             { Label: 'Location 3', TermGuid: 'Location 3' },
    //             { Label: 'Location 4', TermGuid: 'Location 4' },
    //             { Label: 'Location 5', TermGuid: 'Location 5' },
    //             { Label: 'Location 6', TermGuid: 'Location 6' },
    //             { Label: 'Location 7', TermGuid: 'Location 7' },
    //             { Label: 'Location 8', TermGuid: 'Location 8' },
    //             { Label: 'Location 9', TermGuid: 'Location 9' },
    //         ]

    //         setTimeout(() => {
    //             resolve(data);
    //         }, delay);
    //     });
    // }

    // static getDevices() {
    //     return new Promise((resolve, reject) => {
    //         const data = [
    //             { Label: 'Device 1', TermGuid: 'Device 1' },
    //             { Label: 'Device 2', TermGuid: 'Device 2' },
    //             { Label: 'Device 3', TermGuid: 'Device 3' },
    //             { Label: 'Device 4', TermGuid: 'Device 4' },
    //             { Label: 'Device 5', TermGuid: 'Device 5' },
    //             { Label: 'Device 6', TermGuid: 'Device 6' },
    //             { Label: 'Device 7', TermGuid: 'Device 7' },
    //             { Label: 'Device 8', TermGuid: 'Device 8' },
    //             { Label: 'Device 9', TermGuid: 'Device 9' },
    //         ]

    //         setTimeout(() => {
    //             resolve(data);
    //         }, delay);
    //     });
    // }

    // static getOSes() {
    //     return new Promise((resolve, reject) => {
    //         const data = [
    //             { Label: 'OS 1', TermGuid: 'OS 1' },
    //             { Label: 'OS 2', TermGuid: 'OS 2' },
    //             { Label: 'OS 3', TermGuid: 'OS 3' },
    //             { Label: 'OS 4', TermGuid: 'OS 4' },
    //             { Label: 'OS 5', TermGuid: 'OS 5' },
    //             { Label: 'OS 6', TermGuid: 'OS 6' },
    //             { Label: 'OS 7', TermGuid: 'OS 7' },
    //             { Label: 'OS 8', TermGuid: 'OS 8' },
    //             { Label: 'OS 9', TermGuid: 'OS 9' },
    //         ]

    //         setTimeout(() => {
    //             resolve(data);
    //         }, delay);
    //     });
    // }

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

    static getLeaderBoard() {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let leaderBoardArr: Leaders[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select("Points",
                "UserInfoID/ID",
                "UserInfoID/UserInfoName"
                )
                .expand("UserInfoID").top(3).orderBy('Points', false).filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z'")
                .get().then(testDrives => {
                    testDrives.map((testDrive, index) => {
                        leaderBoardArr.push({
                            id: index + 1,
                            name: testDrive.UserInfoID.UserInfoName,
                            points: testDrive.Points,
                            avatar: "http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc1.png"
                        });
                    });
                    resolve(leaderBoardArr);
                })
        });
    }

    static getLeaderBoardRegion() {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let regionLeaderBoardArr: Leaders[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                .select("UserLocation"
                )
                .filter("UserID eq " + _spPageContextInfo.userId + "")
                .get().then(userInfo => {
                    pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                        .select("Points",
                        "UserInfoID/ID",
                        "UserInfoID/UserInfoName"
                        )
                        .expand("UserInfoID").top(3).orderBy('Points', false).filter("User_x0020_ID_x003a_Location eq '" + userInfo[0].UserLocation + "'")
                        .get().then(testDrives => {
                            testDrives.map((testDrive, index) => {
                                regionLeaderBoardArr.push({
                                    id: index + 1,
                                    name: testDrive.UserInfoID.UserInfoName,
                                    points: testDrive.Points,
                                    avatar: "http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc1.png"
                                });
                            });
                            resolve(regionLeaderBoardArr);
                        })
                })

        });
    }

    static getGlobalLeaders(skip = 5, count = 5) {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let globalLeaders: Leader[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(
                "ID",
                "Points",
                "UserInfoID/ID",
                "UserInfoID/UserInfoName",
                "UserInfoID/CarImage",
                "UserInfoID/CarName",
                "UserInfoID/AvatarName",
                "UserInfoID/AvatarImage",
            )
                .expand("UserInfoID").top(100)
                .orderBy('Points', false)
                .filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z'")
                .skip(skip).top(count)
                .get().then(leaders => {
                    console.log(leaders);
                    leaders.map(leader => {
                        globalLeaders.push({
                            id: leader.ID,
                            name: leader.UserInfoID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserInfoID.AvatarImage,
                            car: leader.UserInfoID.CarImage,
                            completedTestDrives: 400
                        })
                    })
                    resolve(globalLeaders);
                })
        });
    }

    static getRegionalLeaders(region: string, skip = 5, top = 5) {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            let regionalLeaders: Leader[] = [];
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(
                "ID",
                "Points",
                "UserInfoID/ID",
                "UserInfoID/UserInfoName",
                "UserInfoID/CarImage",
                "UserInfoID/CarName",
                "UserInfoID/AvatarName",
                "UserInfoID/AvatarImage",
            )
                .expand("UserInfoID").top(100)
                .orderBy('Points', false)
                .filter("PointsEarnedOnDate gt datetime'" +
                lastYear + "T23:59:59.000Z' and " + Constants.Columns.USER_REGION + " eq '" + region + "'")
                .get().then(leaders => {
                    console.log(leaders);
                    leaders.map(leader => {
                        regionalLeaders.push({
                            id: leader.ID,
                            name: leader.UserInfoID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserInfoID.AvatarImage,
                            car: leader.UserInfoID.CarImage,
                            completedTestDrives: 400
                        })
                    })
                    resolve(regionalLeaders);
                })
        });
    }

    static getCurrentUserPoints() {
        var d = new Date();
        var lastYear = d.getFullYear() - 1 + "-12-31";
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select("Points",
                "UserInfoID/ID",
                "UserInfoID/UserInfoName"
                )
                .expand("UserInfoID").orderBy('Points', false).filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z' and UserInfoID eq '1'")
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
                .select("ID,UserInfoID/ID").expand("UserInfoID")
                .filter("UserInfoID eq '1' and Status eq '" + Constants.ColumnsValue.COMPLETE_STATUS + "'")
                .get().then(testDrives => {
                    resolve(testDrives.length);
                })
        });
    }

    static getActiveTestDrives() {
        var d = new Date();
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .select("TestDriveName", "ID", "TestDriveEndDate")
                .filter("TestDriveStatus eq 'Active' and TestDriveStartDate le datetime'" + todayDate + "T00:00:00.000Z' and TestDriveEndDate ge datetime'" + todayDate + "T00:00:00.000Z'")
                .get().then(testDrives => {
                    let activeTestDriveArr: HomeTestDrive[] = [];
                    let testDrivesID = [];
                    testDrives.map((value, index) => {
                        testDrivesID.push(testDrives[index].ID);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesID).then(count => {
                        testDrives.map((testDrive, index) => {
                            activeTestDriveArr.push({
                                id: testDrive.ID,
                                title: testDrive.TestDriveName,
                                enddate: testDrive.TestDriveEndDate,
                                participants: parseInt(count[index])
                            });
                        });
                        resolve(activeTestDriveArr);
                    });
                })
        });
    }

    static getUpcomingTestDrives() {
        var d = new Date();
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .select("TestDriveName", "ID", "TestDriveEndDate").top(3).orderBy("Created", true)
                .filter("TestDriveStatus eq 'Active' and TestDriveStartDate ge datetime'" + todayDate + "T00:00:00.000Z'")
                .get().then(testDrives => {
                    let upcomingTestDriveArr: HomeTestDrive[] = [];
                    let testDrivesID = [];
                    testDrives.map((value, index) => {
                        testDrivesID.push(testDrives[index].ID);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesID).then(count => {
                        testDrives.map((testDrive, index) => {
                            upcomingTestDriveArr.push({
                                id: testDrive.ID,
                                title: testDrive.TestDriveName,
                                enddate: testDrive.TestDriveEndDate,
                                participants: parseInt(count[index])
                            });
                        });
                        resolve(upcomingTestDriveArr);
                    });
                })
        });
    }

    static getTestDrivesIRun() {
        var d = new Date();
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .select("TestDriveName", "ID", "TestDriveEndDate", "Author/Id").top(3).expand("Author/Id")
                .orderBy("Created", true)
                .filter("Author/Id eq '" + _spPageContextInfo.userId + "'")
                .get().then(testDrives => {
                    let testDriveArr: HomeTestDrive[] = [];
                    let testDrivesID = [];
                    testDrives.map((value, index) => {
                        testDrivesID.push(testDrives[index].ID);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesID).then(count => {
                        testDrives.map((testDrive, index) => {
                            testDriveArr.push({
                                id: testDrive.ID,
                                title: testDrive.TestDriveName,
                                enddate: testDrive.TestDriveEndDate,
                                participants: parseInt(count[index])
                            });
                        });
                        resolve(testDriveArr);
                    });
                })
        });
    }

    static getMyTestDrives() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select("Title",
                "ID",
                "TestDriveID/ID",
                "TestDriveID/TestDriveName",
                "TestDriveID/TestDriveEndDate"
                ).filter("UserInfoID eq " + _spPageContextInfo.userId + "")
                .expand("TestDriveID").top(3).orderBy("Created", true)
                .get().then(testDrives => {
                    let myTestDriveArr: HomeTestDrive[] = [];
                    let testDrivesID = [];
                    testDrives.map((value, index) => {
                        testDrivesID.push(testDrives[index].TestDriveID.ID);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesID).then(count => {
                        testDrives.map((testDrive, index) => {
                            myTestDriveArr.push({
                                id: testDrive.ID,
                                title: testDrive.TestDriveID.TestDriveName,
                                enddate: testDrive.TestDriveID.TestDriveEndDate,
                                participants: parseInt(count[index])
                            });
                        });
                        resolve(myTestDriveArr);
                    });
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
        this.loadScript = this.loadScript.bind(this);
        this.getTermSet = this.getTermSet.bind(this);
    }
    loadScript(scriptName) {
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

    loadTaxonomyScripts() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.loadScript("sp.runtime.js"),
                this.loadScript("sp.js"),
                this.loadScript("sp.taxonomy.js")
            ]).then(() => {
                resolve(true);
            }, (args) => reject(args));
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
