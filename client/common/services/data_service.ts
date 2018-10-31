import Promise from "ts-promise";
import * as Constants from './constants';
import * as pnp from '../../../node_modules/sp-pnp-js/dist/pnp.min';
import { TestDrive, Question, TestCase, owner, RegistrationQuestion } from '../../test_drive/model';
import * as $ from 'jquery';
import TestCases from "../../test_drive/components/TestCases";
import { HomeTestDrive, Leaders, EliteProfile, TestDriveResponse } from '../../home/model';
import { Leader } from '../../leader_board/model';
import { User } from '../../onboarding/model';
import { constants } from "http2";
import { resolve } from "path";
import { Columns } from "./constants";
import { Util } from "sp-pnp-js/lib/utils/util";
import index from "../../home/index";
import { TestDriveInstance, QuestionInstance, TestCaseInstance, RegistrationQuestionInstance } from '../../test_drive_participation/model';
import { File, ListItem } from "@microsoft/microsoft-graph-types";
import { error } from "util";
import { Lists } from "sp-pnp-js/lib/sharepoint/lists";
import { ReportBug } from "../../report_bug/model";
import TestDriveItem from "../../test_drive/components/TestDriveItem";
import { editTestCase } from "../../test_drive";

const delay = 100;
declare var SP: any;

let moment = require("moment");
if ("default" in moment) {
    moment = moment["default"];
}

export type listItem = {
    key: string;
    value: string;
    type: string;
}

export type appconfig = {
    Video: string;
    Region: string;
    Os: string;
    Location: string;
    TotalUsers: string;
    Devices: string;
    Department: string;
    EmployeeType: string;
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

    static getTeamSiteUrl(id) {
        return "https://teams.microsoft.com/_#/conversations/General?threadId=19:" + (id ? id.replace(/-/ig, '') : '') + "@thread.skype&ctx=channel";
    }

    static goBack() {
        window.history.back();
    }
    static submitSurvey(testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            testDriveInstance.surveyStatus = Constants.ColumnsValues.COMPLETE_STATUS;
            Services.createOrSaveTestDriveInstance(testDriveInstance).then(data => {
                Services.getTestDriveResponse(testDriveInstance.testDriveID, Services.getCurrentUserID()).then((instance: any) => {
                    resolve({
                        ...testDriveInstance,
                        currentPoint: instance[Constants.Columns.CURRENT_POINTS] || 0,
                        numberOfTestCasesCompleted: instance[Constants.Columns.TEST_CASE_COMPLETED] || 0,
                        status: instance[Constants.Columns.STATUS] || '',
                        surveyStatus: instance[Constants.Columns.SURVEY_STATUS] || 0,
                        completionBonus: instance[Constants.Columns.COMPLETION_BONUS] || 0,
                        joiningBonus: instance[Constants.Columns.JOINING_BONUS] || 0
                    })
                }, err => {
                    Utils.clientLog(err);
                })
            }, error => {
                Utils.clientLog(error);
                reject(error);
            })
        });
    }


    static submitRegistration(testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            testDriveInstance.isRegistrationComplete = true;
            Services.createOrSaveTestDriveInstance(testDriveInstance).then(data => {
                resolve(data);
            }, error => {
                Utils.clientLog(error);
                reject(error);
            })
        });
    }

    static getTestDriveInstanceData(testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            Services.getTestDriveResponse(testDriveInstance.testDriveID, Services.getCurrentUserID())
                .then((instance: any) => {
                    resolve({
                        ...testDriveInstance,
                        currentPoint: instance[Constants.Columns.CURRENT_POINTS] || 0,
                        numberOfTestCasesCompleted: instance[Constants.Columns.TEST_CASE_COMPLETED] || 0,
                        status: instance[Constants.Columns.STATUS] || '',
                        surveyStatus: instance[Constants.Columns.SURVEY_STATUS] || 0,
                        completionBonus: instance[Constants.Columns.COMPLETION_BONUS] || 0,
                        joiningBonus: instance[Constants.Columns.JOINING_BONUS] || 0
                    })
                }, err => {
                    Utils.clientLog(err);
                })
        });
    }

    static requestAccess() {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            Services.mailto(appConfig.AccessProvider || '',
                appConfig.AccessEmailSubject || '', appConfig.AccessEmailBody.replace("\n", '%0d%0a') || '');
        });
    }


    // http://elite-spuat.corp.equinix.com/_api/web/lists/GetByTitle('Test Drive Instances')/
    // items?$Select=UserID/UserEMail&$expand=UserID&$filter=TestDriveID eq 156
    static emailTestDrivers(testDrive: TestDrive) {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            var subject = appConfig.TestDriveNotificationSubject.replace("#TestDriveName#", '"' + testDrive.title + '"');
            Services.getParticipantEmails(testDrive.id).then(emails => {
                Services.mailto(testDrive.ownerEmail || '', subject, '', emails);
            })
        });

    }



    static getParticipantEmails(testDriveID: number) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select("UserID/UserEMail")
                .expand("UserID")
                .filter("TestDriveID eq " + testDriveID)
                .get().then(emails => {
                    var emailString = '';
                    emails && emails.length && emails.map(email => {
                        if (email.UserID && email.UserID.UserEMail) {
                            emailString += email.UserID.UserEMail + ";";
                        }
                    })
                    resolve(emailString);
                }, error => {
                    Utils.clientLog(error);
                    reject(error);
                })
        })
    }
    static getPrizes() {
        return new Promise((resolve, reject) => {
            var user = Services.getUserProfileProperties();
            pnp.sp.web.lists.getByTitle(Constants.Lists.PRIZES).items
                .select("Title", "PrizeName", "EliteDescription", "UserRegionText", "FileRef/FileRef")
                //.filter("UserRegionText eq '" + user.region + "' or UserRegionText eq ''")
                .orderBy("PrizeRank", false)
                .get().then(prizes => {
                    resolve(prizes);
                }, error => {
                    Utils.clientLog(error);
                    reject(error);
                })
        });

    }

    static reportAbug(email: string, testDriveTitle: string) {
        Services.mailto(email, 'A Bug from your Test Driver "' + testDriveTitle + '"', '');
    }

    static emailOwner(email: string, testDriveTitle: any) {
        Services.getEmailTemplate('TestDriveQuestionEmail').then((emailConfig: any) => {
            Services.mailto(email, emailConfig.subject.replace(/##testdriveName##/ig, testDriveTitle), encodeURIComponent(emailConfig.body.replace(/##testdriveName##/ig, testDriveTitle)));
        });
    }

    static shareTestDrive(email: string, testDrive: any) {
        var user = <User>Services.getUserProfileProperties();
        var testDriveLink = _spPageContextInfo.siteAbsoluteUrl +
            "/Pages/default.aspx#/participation/" + testDrive.id;
        Services.getEmailTemplate('TestDriveShareEmail').then((emailConfig: any) => {
            var emailSubject = emailConfig.subject.replace(/##testdriveName##/ig, testDrive.title);
            emailSubject = emailSubject.replace(/##referrer##/ig, user.displayName);

            var emailBody = emailConfig.body.replace(/##testdriveName##/ig, testDrive.title);
            emailBody = emailBody.replace(/##referrer##/ig, user.displayName);
            emailBody = emailBody.replace(/##testDriveDescription##/ig, testDrive.description);
            emailBody = emailBody.replace(/##testDriveLink##/ig, testDriveLink);
            emailBody = emailBody.replace(/##testdriveName##/ig, testDrive.title);
            Services.mailto('', encodeURIComponent(emailSubject), encodeURIComponent(emailBody));
        });
    }

    static mailto(to, subject, body, bcc?, cc?) {
        if (bcc) {
            window.location.href = 'mailto:' + to + '?bcc=' + bcc + '&subject=' + subject + '&body=' + body;
        } else {
            window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
        }

    }

    static getEmailTemplate(key: string) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle("Email Templates").items
                .filter('TemplateKey eq \'' + key + '\'')
                .select('TemplateKey, EmailTempBody, EmailTempSubject')
                .get().then(data => {
                    resolve({
                        subject: data[0].EmailTempSubject || '',
                        body: data[0].EmailTempBody || ''
                    })
                }, err => {
                    Utils.clientLog(err);
                });
        });
    }

    static getLevelHtml(levelNumber) {
        switch (levelNumber) {
            case 1:
                return '<li><span></span></li>';
            case 2:
                return '<li><span></span></li><li><span></span></li>';
            case 3:
                return '<li><span></span></li><li><span></span></li><li><span></span></li>';
            default:
                return '<li><span></span></li><li>';
        }
    }

    static getTestDrivesWaitingForApproval(skip: number, top: number) {
        return new Promise((resolve, reject) => {
            var filter = `${Constants.Columns.TESTDRIVE_STATUS} eq '${Constants.ColumnsValues.SUBMIT}' or 
${Constants.Columns.CHANGE_STATUS} eq '${Constants.ColumnsValues.CHANGE_SUBMITTED}'`;
            Services.getTestDrivesByFilter(filter, skip, top, "Modified", false).then(testdrives => {
                resolve(testdrives);
            }, error => {
                reject(error);
            });
        });
    }

    static getApprovedTestDrives(skip: number, top: number) {
        return new Promise((resolve, reject) => {
            var filter = `${Constants.Columns.TESTDRIVE_STATUS} eq '${Constants.ColumnsValues.READY_FOR_LAUNCH}' or 
${Constants.Columns.CHANGE_STATUS} eq '${Constants.ColumnsValues.CHANGE_APPROVAL_COMPLETED}'`
            Services.getTestDrivesByFilter(filter, skip, top, "Modified", false).then(testdrives => {
                resolve(testdrives);
            }, error => {
                reject(error);
            });
        });
    }

    static approveTestdrive(testDrive: TestDrive) {
        return new Promise((resolve, reject) => {
            let newTestDrive = {
                ID: testDrive.id,
            }
            if (testDrive.status === Constants.ColumnsValues.SUBMIT) {
                newTestDrive[Constants.Columns.TESTDRIVE_STATUS] = Constants.ColumnsValues.READY_FOR_LAUNCH;
            }
            if (testDrive.changeStatus === Constants.ColumnsValues.CHANGE_SUBMITTED) {
                newTestDrive[Constants.Columns.CHANGE_STATUS] = Constants.ColumnsValues.CHANGE_APPROVED;
            }

            this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVES,
                [newTestDrive]).then((data: TestDrive) => {
                    resolve(data[0]);
                }, err => {
                    reject(err);
                }).catch(err => {
                    Utils.clientLog(err);
                });
        });
    }

    static getAttachments(item) {
        return new Promise((resolve, reject) => {
            item.attachmentFiles.get().then(files => {
                resolve({
                    id: item.id,
                    files: files
                });
            }, error => {
                reject(error);
            });
        });
    }

    static setAttachmentByItemID(item, files) {
        return new Promise((resolve, reject) => {
            this.buildFileArray(files).then((filesInfo: any) => {
                item.attachmentFiles.addMultiple(filesInfo).then((r: any) => {
                    Services.getAttachments(item).then(files => {
                        resolve(files);
                    });
                }, error => {
                    reject(error);
                });
            })
        })
    }

    static deletAttachments(item, files: string[]) {
        return new Promise((resolve, reject) => {
            item.attachmentFiles.deleteMultiple(files.toString()).then(r => {
                resolve(r)
            }, error => {
                reject(error);
            });
        });
    }

    static deletAttachment(itemID, files: string) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).
                items.getById(itemID).attachmentFiles.deleteMultiple(files).then(r => {
                    resolve(true)
                }, error => {
                    reject(error);
                });
        });
    }

    static buildFileArray(files) {
        return new Promise((resolve, reject) => {
            var fileInfos = [];
            var counter = 0;
            for (var i = 0; i < files.length; i++) {
                var toUpload = files[i];
                var r = new FileReader();
                r.onloadend = function (e: any) {
                    counter++;
                    var fileContent = e.target.result;
                    fileInfos.push({
                        name: files[counter - 1].name,
                        content: fileContent
                    })
                    if (files.length == counter) {
                        resolve(fileInfos);
                    }
                }
                r.readAsArrayBuffer(toUpload);
            }
        });
    }

    static getVideoUrl() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: any) => {
                resolve({
                    video: appConfig.Video,
                    videoPoster: appConfig.VideoPoster
                });
            }, err => {
                Utils.clientLog("Video not configured");
            })
        })
    }

    static submitTestCaseResponse(testCaseInstance: TestCaseInstance, testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            if (testCaseInstance.responseStatus == Constants.ColumnsValues.INPROGRESS) {
                testCaseInstance.responseStatus = Constants.ColumnsValues.DRAFT;
                Services.createOrSaveTestCaseInstance(testCaseInstance, testDriveInstance).then((response: any) => {
                    response.testCaseInstance.responseStatus = Constants.ColumnsValues.COMPLETE_STATUS;
                    Services.submitTestCaseAsSubmit(response.testCaseInstance, testDriveInstance).then(response => {
                        resolve(response);
                    })
                }, err => {
                    Utils.clientLog(err);
                });
            } else {
                testCaseInstance.responseStatus = Constants.ColumnsValues.COMPLETE_STATUS;
                Services.submitTestCaseAsSubmit(testCaseInstance, testDriveInstance).then(response => {
                    resolve(response);
                }, err => {
                    Utils.clientLog(err);
                });
            }
        });
    }

    static submitTestCaseAsSubmit(testCaseInstance: TestCaseInstance, testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrSaveTestCaseInstance(testCaseInstance, testDriveInstance).then((result: any) => {
                testDriveInstance.testCases = testDriveInstance.testCases && testDriveInstance.testCases.length &&
                    testDriveInstance.testCases.map(testCase => {
                        return testCase.testCaseId == result.testCaseInstance.testCaseId ? result.testCaseInstance : testCase;
                    })

                Services.getTestDriveResponse(testDriveInstance.testDriveID, Services.getCurrentUserID()).then((instance: any) => {
                    resolve({
                        ...testDriveInstance,
                        currentPoint: instance[Constants.Columns.CURRENT_POINTS] || 0,
                        numberOfTestCasesCompleted: instance[Constants.Columns.TEST_CASE_COMPLETED] || 0,
                        status: instance[Constants.Columns.STATUS] || '',
                        surveyStatus: instance[Constants.Columns.SURVEY_STATUS] || 0,
                        completionBonus: instance[Constants.Columns.COMPLETION_BONUS] || 0,
                        joiningBonus: instance[Constants.Columns.JOINING_BONUS] || 0
                    })
                }, err => {
                    Utils.clientLog(err);
                })
            }, err => {
                Utils.clientLog(err);
            });
        });
    }

    static createOrSaveTestDriveInstance(testDriveInstance: TestDriveInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVE_INSTANCES, [{
                [Constants.Columns.ID]: testDriveInstance.instanceID,
                [Constants.Columns.STATUS]: testDriveInstance.status,
                [Constants.Columns.DATE_JOINED]: new Date().toISOString(),
                [Constants.Columns.TEST_DRIVE_ID]: testDriveInstance.testDriveID,
                [Constants.Columns.USER_ID]: Services.getCurrentUserID(),
                // [Constants.Columns.TEST_CASE_COMPLETED]: testDriveInstance.numberOfTestCasesCompleted,
                // [Constants.Columns.CURRENT_POINTS]: testDriveInstance.currentPoint,
                [Constants.Columns.SURVEY_STATUS]: testDriveInstance.surveyStatus || Constants.ColumnsValues.DRAFT,
                [Constants.Columns.IS_REGISTRATION_COMPLETE]: testDriveInstance.isRegistrationComplete
            }]).then(newTestDrives => {
                let newTestDrive = newTestDrives[0];
                resolve(<TestDriveInstance>{
                    ...testDriveInstance,
                    instanceID: newTestDrive ? newTestDrive.id : -1,
                    currentPoint: newTestDrive ? newTestDrive[Constants.Columns.CURRENT_POINTS] : 0,
                    dateJoined: newTestDrive ? newTestDrive[Constants.Columns.DATE_JOINED] : "",
                    numberOfTestCasesCompleted: newTestDrive ? newTestDrive[Constants.Columns.TEST_CASE_COMPLETED] : 0,
                    status: newTestDrive ? newTestDrive[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                    isRegistrationComplete: newTestDrive[Constants.Columns.IS_REGISTRATION_COMPLETE] || false
                });
            }, err => {
                reject(err)
            })
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
                [Constants.Columns.Selected_Response]: questionInstance.selectedResponse,
                [Constants.Columns.QUESTION]: questionInstance.title,
                [Constants.Columns.RESPONSES]: JSON.stringify(questionInstance.options),
                [Constants.Columns.RESPONSETYPE]: questionInstance.responseType,
                [Constants.Columns.EDIT_STATUS]: questionInstance.editStatus,
                [Constants.Columns.VERSION]: questionInstance.version
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
                    selectedResponse: newResponse[Constants.Columns.Selected_Response],
                    title: newResponse[Constants.Columns.TITLE],
                    question: newResponse[Constants.Columns.QUESTION],
                    responses: Utils.tryParseJSON(newResponse[Constants.Columns.RESPONSES] || "[]"),
                    responseType: newResponse[Constants.Columns.RESPONSETYPE],
                    editStatus: newResponse[Constants.Columns.EDIT_STATUS],
                    version: newResponse[Constants.Columns.VERSION]
                });
            }, err => reject(err))
        })
    }

    static createOrSaveRegistrationQuestionInstance(questionInstance: RegistrationQuestionInstance) {
        return new Promise((resolve, reject) => {
            Services.createOrUpdateListItemsInBatch(Constants.Lists.REGISTRATION_RESPONSES, [{
                [Constants.Columns.ID]: questionInstance.responseID || -1,
                [Constants.Columns.TEST_DRIVE_ID + '_id']: questionInstance.testDriveID,
                [Constants.Columns.REGISTRATION_QUESTION + '_id']: questionInstance.questionID,
                [Constants.Columns.STATUS]: questionInstance.responseStatus,
                [Constants.Columns.USER_ID + '_id']: questionInstance.userID,
                [Constants.Columns.REGISTRATION_RESPONSE]: questionInstance.questionResponse,
                [Constants.Columns.Selected_Response]: questionInstance.selectedResponse,
                [Constants.Columns.QUESTION]: questionInstance.title,
                [Constants.Columns.RESPONSES]: JSON.stringify(questionInstance.options),
                [Constants.Columns.RESPONSETYPE]: questionInstance.questionType,
                [Constants.Columns.EDIT_STATUS]: questionInstance.editStatus,
                [Constants.Columns.VERSION]: questionInstance.version
            }]).then((newResponses: any) => {
                const newResponse = newResponses[0];
                var listItem = pnp.sp.web.lists.getByTitle(Constants.Lists.REGISTRATION_RESPONSES)
                    .items.getById(newResponse.id);
                Services.saveAttachment(newResponse.id, questionInstance, listItem).then((attachments: any) => {
                    resolve(<RegistrationQuestionInstance>{
                        ...questionInstance,
                        responseID: newResponse.id,
                        testDriveID: newResponse[Constants.Columns.TEST_DRIVE_ID + '_id'],
                        questionID: newResponse[Constants.Columns.REGISTRATION_QUESTION + '_id'],
                        responseStatus: newResponse[Constants.Columns.STATUS],
                        userID: newResponse[Constants.Columns.USER_ID + '_id'],
                        response: newResponse[Constants.Columns.REGISTRATION_RESPONSE],
                        selectedResponse: newResponse[Constants.Columns.Selected_Response],
                        files: attachments,
                        title: newResponse[Constants.Columns.QUESTION],
                        options: Utils.tryParseJSON(newResponse[Constants.Columns.RESPONSES] || "[]"),
                        questionType: newResponse[Constants.Columns.RESPONSETYPE],
                        editStatus: newResponse[Constants.Columns.EDIT_STATUS],
                        version: newResponse[Constants.Columns.VERSION]
                    });
                }, (error) => {
                    reject(error);
                    Utils.clientLog(error);
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
                [Constants.Columns.TEST_CASE_RESPONSE]: testCasesInstance.testCaseResponse,
                [Constants.Columns.TITLE]: testCasesInstance.title,
                [Constants.Columns.ELITE_DESCRIPTION]: testCasesInstance.description,
                [Constants.Columns.TYPE]: testCasesInstance.testCaseType,
                [Constants.Columns.SCENARIO]: testCasesInstance.scenario,
                [Constants.Columns.TEST_CASE_OUTCOME]: testCasesInstance.expectedOutcome,
                [Constants.Columns.TEST_CASE_PRIORITY]: testCasesInstance.priority,
                [Constants.Columns.POINTS]: testCasesInstance.points,
                [Constants.Columns.EDIT_STATUS]: testCasesInstance.editStatus,
                [Constants.Columns.VERSION]: testCasesInstance.version
            }]).then((newResponses: any) => {
                let newResponse = newResponses[0];
                var responseID = newResponse.id;
                var attachmentPromise;
                var testDrivePromise;
                var listItem = pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES)
                    .items.getById(responseID);

                let testCase = {
                    ...testCasesInstance,
                    responseID: newResponse.id,
                    testDriveID: newResponse[Constants.Columns.TEST_DRIVE_ID + '_id'],
                    testCaseId: newResponse[Constants.Columns.TESTCASE_ID + '_id'],
                    responseStatus: newResponse[Constants.Columns.TEST_CASE_RESPONSE_STATUS],
                    userID: newResponse[Constants.Columns.USER_ID + '_id'],
                    questionResponse: newResponse[Constants.Columns.SURVEY_RESPONSE],
                    selectedResponse: newResponse[Constants.Columns.Selected_Response],
                    title: newResponse[Constants.Columns.TITLE],
                    description: newResponse[Constants.Columns.ELITE_DESCRIPTION],
                    testCaseType: newResponse[Constants.Columns.TYPE],
                    scenario: newResponse[Constants.Columns.SCENARIO],
                    expectedOutcome: newResponse[Constants.Columns.TEST_CASE_OUTCOME],
                    priority: newResponse[Constants.Columns.TEST_CASE_PRIORITY],
                    points: newResponse[Constants.Columns.POINTS],
                    editStatus: newResponse[Constants.Columns.EDIT_STATUS],
                    version: newResponse[Constants.Columns.VERSION]
                };

                Services.saveResponseAttachment(responseID, testCasesInstance, listItem).then((attachments: any) => {
                    testCase.files = attachments;
                    resolve({
                        testDriveInstance: testDriveInstance,
                        testCaseInstance: testCase,
                    })
                }, (error) => {
                    reject(error);
                    Utils.clientLog(error);
                });


            }, err => reject(err))
        })
    }

    static saveResponseAttachment(responseID, testCasesInstance, listItem) {
        return new Promise((resolve, reject) => {
            if (responseID && testCasesInstance.files.length) {
                Services.setAttachmentByItemID(listItem, testCasesInstance.files).then((files: any) => {
                    testCasesInstance.files = files;
                    pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).items.getById(responseID).update({
                        [Constants.Columns.RESPONSE_ATTACHMENTS]: JSON.stringify(testCasesInstance.files)
                    }).then(result => {
                        resolve(testCasesInstance.files);
                    }, error => {
                        reject(error);
                        Utils.clientLog(error);
                    })
                }, (error) => {
                    reject(error);
                })
            } else {
                resolve([]);
            }
        })
    }


    static saveAttachment(itemID, item, listItem) {
        return new Promise((resolve, reject) => {
            if (itemID && item.files.length) {
                Services.setAttachmentByItemID(listItem, item.files).then((files: any) => {
                    item.files = files;
                    listItem.update({
                        [Constants.Columns.RESPONSE_ATTACHMENTS]: JSON.stringify(item.files)
                    }).then(result => {
                        resolve(item.files);
                    }, error => {
                        reject(error);
                        Utils.clientLog(error);
                    })
                }, (error) => {
                    reject(error);
                })
            } else {
                resolve([]);
            }
        })
    }


    static saveBugAttachment(itemID, bugItem, listItem) {
        return new Promise((resolve, reject) => {
            if (itemID && bugItem.files.length) {
                Services.setAttachmentByItemID(listItem, bugItem.files).then((files: any) => {
                    bugItem.files = files;
                    listItem.update({
                        [Constants.Columns.RESPONSE_ATTACHMENTS]: JSON.stringify(bugItem.files)
                    }).then(result => {
                        resolve(bugItem.files);
                    }, error => {
                        reject(error);
                        Utils.clientLog(error);
                    })
                }, (error) => {
                    reject(error);
                })
            } else {
                resolve([]);
            }
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
                    Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.JOINING_BONUS,
                    Constants.Columns.COMPLETION_BONUS,
                    Constants.Columns.SURVEY_STATUS,
                    Constants.Columns.IS_REGISTRATION_COMPLETE
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

    static getAttachmentsByItemIDs(itemIDs, listName) {
        return new Promise((resolve, reject) => {
            var promisses = [];
            itemIDs && itemIDs.length && itemIDs.map(id => {
                var item = pnp.sp.web.lists.getByTitle(listName).items.getById(id);
                promisses.push(Services.getAttachments(item));
            });
            Promise.all(promisses).then(results => {
                resolve(results);
            })
        })
    }

    static getTestCaseResponses(testDriveID: number, userID: number) {
        return new Promise((resolve, reject) => {
            var items = pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).items
                .select(
                    Constants.Columns.ID,
                    Constants.Columns.TEST_CASE_RESPONSE,
                    Constants.Columns.TEST_CASE_RESPONSE_STATUS,
                    Constants.Columns.RESPONSE_ATTACHMENTS,
                    Constants.Columns.Selected_Response,
                    Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.TITLE,
                    Constants.Columns.ELITE_DESCRIPTION,
                    Constants.Columns.TYPE,
                    Constants.Columns.SCENARIO,
                    Constants.Columns.TEST_CASE_OUTCOME,
                    Constants.Columns.TEST_CASE_PRIORITY,
                    Constants.Columns.POINTS,
                    Constants.Columns.EDIT_STATUS,
                    Constants.Columns.VERSION
                )
                .filter(Constants.Columns.USER_ID + ' eq ' +
                    userID + ' and ' + Constants.Columns.TEST_DRIVE_ID +
                    ' eq ' + testDriveID)
                .expand(Constants.Columns.USER_ID,
                    Constants.Columns.TEST_DRIVE_ID, Constants.Columns.TESTCASE_ID);
            items.get().then(testCases => {
                let testCaseArray = [];
                testCases.map(t => {
                    testCaseArray.push(<TestCaseInstance>{
                        responseID: t[Constants.Columns.ID],
                        testCaseResponse: t[Constants.Columns.TEST_CASE_RESPONSE],
                        responseStatus: t[Constants.Columns.TEST_CASE_RESPONSE_STATUS],
                        testCaseId: t[Constants.Columns.TESTCASE_ID][Constants.Columns.ID],
                        selectedResponse: t[Constants.Columns.Selected_Response],
                        files: t[Constants.Columns.RESPONSE_ATTACHMENTS] && t[Constants.Columns.RESPONSE_ATTACHMENTS].length
                            && Utils.tryParseJSON(t[Constants.Columns.RESPONSE_ATTACHMENTS]),
                        title: t[Constants.Columns.TITLE],
                        description: t[Constants.Columns.ELITE_DESCRIPTION],
                        testCaseType: t[Constants.Columns.TYPE],
                        scenario: t[Constants.Columns.SCENARIO],
                        expectedOutcome: t[Constants.Columns.TEST_CASE_OUTCOME],
                        priority: t[Constants.Columns.TEST_CASE_PRIORITY],
                        points: t[Constants.Columns.POINTS],
                        editStatus: t[Constants.Columns.EDIT_STATUS],
                        version: t[Constants.Columns.VERSION]
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
            Services.getQuestionsByIds(questionIDs).then((questions: any) => {
                pnp.sp.web.lists.getByTitle(Constants.Lists.SURVEY_RESPONSES).items
                    .select(
                        Constants.Columns.ID,
                        Constants.Columns.SURVEY_RESPONSE,
                        Constants.Columns.Selected_Response,
                        Constants.Columns.STATUS,
                        Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.TITLE,
                        Constants.Columns.ID,
                        Constants.Columns.QUESTION,
                        Constants.Columns.RESPONSES,
                        Constants.Columns.RESPONSETYPE,
                        Constants.Columns.EDIT_STATUS,
                        Constants.Columns.VERSION
                    )
                    .filter(Constants.Columns.USER_ID + ' eq ' + userID + ' and ' + Constants.Columns.TEST_DRIVE_ID + ' eq ' + testDriveID)
                    .expand(Constants.Columns.USER_ID, Constants.Columns.TEST_DRIVE_ID, Constants.Columns.QUESTION_ID)
                    .get().then(questionResponses => {
                        let questionsArray: QuestionInstance[] = [];
                        questions.map((question: any) => {
                            let response = questionResponses.filter(response => {
                                return response[Constants.Columns.QUESTION_ID][Constants.Columns.ID] == question.id &&
                                    response[Constants.Columns.VERSION] === question.version;
                            })
                            response = response[0];
                            questionsArray.push(<QuestionInstance>{
                                ...question,
                                responseID: response ? response.Id : -1,
                                responseStatus: response ? response[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                                questionResponse: response ? response[Constants.Columns.SURVEY_RESPONSE] : '',
                                selectedResponse: response ? response[Constants.Columns.Selected_Response] : '',
                                testDriveID: testDriveID,
                                questionID: question.id,
                                userID: userID,
                                title: response && response[Constants.Columns.TITLE] ? response[Constants.Columns.TITLE] : question.title,
                                question: response && response[Constants.Columns.QUESTION] ? response[Constants.Columns.QUESTION] : question.title,
                                options: response && response[Constants.Columns.RESPONSES] ? Utils.tryParseJSON(response[Constants.Columns.RESPONSES] || "[]") : question.options,
                                responseType: response && response[Constants.Columns.RESPONSETYPE] ? response[Constants.Columns.RESPONSETYPE] : question.questionType,
                                editStatus: response && response[Constants.Columns.EDIT_STATUS] ? response[Constants.Columns.EDIT_STATUS] : question.editStatus,
                                version: question.version
                            })
                        })
                        resolve(questionsArray);
                    }, error => {
                        reject(error);
                    });
            })
        });
    }


    static getRegistrationQuestionWithResponses(testDriveID: number, questionIDs: number[], userID: number) {
        if (testDriveID == 0) return null;
        return new Promise((resolve, reject) => {
            Services.getRegistrationQuestonsByIds(questionIDs).then((questions: any) => {
                pnp.sp.web.lists.getByTitle(Constants.Lists.REGISTRATION_RESPONSES).items
                    .select(
                        Constants.Columns.ID,
                        Constants.Columns.REGISTRATION_RESPONSE,
                        Constants.Columns.Selected_Response,
                        Constants.Columns.STATUS,
                        Constants.Columns.REGISTRATION_QUESTION + '/' + Constants.Columns.ID,
                        Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.RESPONSE_ATTACHMENTS,
                        Constants.Columns.QUESTION,
                        Constants.Columns.RESPONSES,
                        Constants.Columns.RESPONSETYPE,
                        Constants.Columns.EDIT_STATUS,
                        Constants.Columns.VERSION
                    )
                    .filter(Constants.Columns.USER_ID + ' eq ' + userID + ' and ' + Constants.Columns.TEST_DRIVE_ID + ' eq ' + testDriveID)
                    .expand(Constants.Columns.USER_ID, Constants.Columns.TEST_DRIVE_ID, Constants.Columns.REGISTRATION_QUESTION)
                    .get().then(questionResponses => {
                        let questionsArray: RegistrationQuestionInstance[] = [];
                        questions.map(question => {
                            let response = questionResponses.filter(response => {
                                return response[Constants.Columns.REGISTRATION_QUESTION][Constants.Columns.ID] == question.id &&
                                    response[Constants.Columns.VERSION] == question.version;
                            })
                            response = response[0];
                            questionsArray.push(<RegistrationQuestionInstance>{
                                ...question,
                                responseID: response ? response.Id : -1,
                                responseStatus: response ? response[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                                questionResponse: response ? response[Constants.Columns.REGISTRATION_RESPONSE] : '',
                                selectedResponse: response ? response[Constants.Columns.Selected_Response] : '',
                                testDriveID: testDriveID,
                                questionID: question.id,
                                userID: userID,
                                files: response ? (response[Constants.Columns.RESPONSE_ATTACHMENTS] && response[Constants.Columns.RESPONSE_ATTACHMENTS].length
                                    && Utils.tryParseJSON(response[Constants.Columns.RESPONSE_ATTACHMENTS]).files) : '',
                                question: response ? response[Constants.Columns.QUESTION] : question[Constants.Columns.QUESTION],
                                options: response ? Utils.tryParseJSON(response[Constants.Columns.RESPONSES] || "[]") : question.options,
                                responseType: response ? response[Constants.Columns.RESPONSETYPE] : question.responseType,
                                editStatus: response ? response[Constants.Columns.EDIT_STATUS] : question.editStatus,
                                version: response ? response[Constants.Columns.VERSION] : question.version
                            })
                        })
                        resolve(questionsArray);
                    }, error => {
                        reject(error);
                    });
            })
        });
    }

    static getTestDriveWithTestCasesAndRegistarionQuestions(testDriveID: number, questionRequied: boolean, userID) {
        return new Promise((resolve, reject) => {
            Services.getTestDriveById(testDriveID).then((testDrive: any) => {
                if (questionRequied && testDrive.hasRegistration) {
                    Services.getRegistrationQuestionWithResponses(testDriveID, testDrive.registrationQuestionIDs, userID)
                        .then(registrationQuestions => {
                            Services.getTestCasesByIds(testDrive.testCaseIDs).then(testCases => {
                                resolve({
                                    ...testDrive,
                                    testCases: testCases,
                                    registrationQuestions: registrationQuestions
                                });
                            }, err => reject(err))
                        }, err => reject(err))
                } else {
                    Services.getTestCasesByIds(testDrive.testCaseIDs).then(testCases => {
                        resolve({
                            ...testDrive,
                            testCases: testCases,
                            registrationQuestions: []
                        });
                    }, err => reject(err))
                }
            }, err => reject(err));
        });
    }

    static getTestDriveInstance(testDriveID: number, userID: number) {
        return new Promise((resolve, reject) => {
            let testDrive = Services.getTestDriveWithTestCasesAndRegistarionQuestions(testDriveID, true, userID);
            let testCaseResponses = Services.getTestCaseResponses(testDriveID, userID);
            let testDriveResponse = Services.getTestDriveResponse(testDriveID, userID);
            let getParticipatCount = Services.getTestDrivesParticipantCount([testDriveID]);
            let response;
            Promise.all([testDrive, testCaseResponses, testDriveResponse, getParticipatCount]).then(results => {
                let testDrive = <any>results[0];
                let testCaseResponses = <any>results[1];
                let testDriveInstance: any = results[2];
                var participants: number = <number>results[3][0];
                let testCasesInstances = testDrive.testCases.map((t, index) => {
                    response = testCaseResponses.filter(response => {
                        return t.id == response.testCaseId &&
                            t.version == response.version;
                    });
                    response = response[0];
                    return (<TestCaseInstance>{
                        description: response ? response.description : t.description,
                        expectedOutcome: response ? response.expectedOutcome : t.expectedOutcome,
                        isInEditMode: false,
                        newItem: false,
                        points: response ? response.points : t.points,
                        priority: response ? response.priority : t.priority,
                        reTest: t.reTest,
                        scenario: response ? response.scenario : t.scenario,
                        testCaseId: t.id,
                        title: response ? response.title : t.title,
                        testCaseType: response ? response.testCaseType : t.testCaseType,
                        userID: userID,
                        testDriveID: testDriveID,
                        responseID: response ? response.responseID : -1,
                        responseStatus: response ? response.responseStatus : Constants.ColumnsValues.INPROGRESS,
                        selectedResponse: response ? response.selectedResponse : '',
                        testCaseResponse: response ? response.testCaseResponse : '',
                        files: response ? (response.files && response.files.files) : [],
                        version: response ? response.version : t.version,
                        editStatus: response ? response.editStatus : t.editStatus
                    });
                })

                var instance = <TestDriveInstance>{

                    instanceID: testDriveInstance ? testDriveInstance[Constants.Columns.ID] : -1,
                    currentPoint: testDriveInstance ? testDriveInstance[Constants.Columns.CURRENT_POINTS] : 0,
                    dateJoined: testDriveInstance ? testDriveInstance[Constants.Columns.DATE_JOINED] : "",
                    numberOfTestCasesCompleted: testDriveInstance ? testDriveInstance[Constants.Columns.TEST_CASE_COMPLETED] : 0,
                    status: testDriveInstance ? testDriveInstance[Constants.Columns.STATUS] : Constants.ColumnsValues.DRAFT,
                    isRegistrationComplete: testDriveInstance ?
                        testDriveInstance[Constants.Columns.IS_REGISTRATION_COMPLETE] : false,
                    testDriveStatus: testDrive.status,
                    testDriveID: testDrive.id,
                    title: testDrive.title,
                    description: testDrive.description,
                    startDate: testDrive.startDate,
                    endDate: testDrive.endDate,
                    maxPoints: testDrive.maxPoints,
                    department: testDrive.department,
                    location: testDrive.location,
                    requiredDevices: testDrive.requiredDevices,
                    requiredOs: testDrive.requiredOs,
                    maxTestDrivers: testDrive.maxTestDrivers,
                    level: testDrive.level,
                    levelName: testDrive.levelName,
                    owners: testDrive.owners,
                    testCases: testCasesInstances,
                    testCaseIDs: testDrive.testCaseIDs,
                    questionIDs: testDrive.questionIDs,
                    expectedBusinessValue: testDrive.expectedBusinessValue,
                    region: testDrive.region,
                    participants: participants,
                    ownerEmail: testDrive.ownerEmail,
                    teamsChannelID: testDrive.teamsChannelID,
                    hasRegistration: testDrive.hasRegistration,
                    registrationStartDate: testDrive.registrationStartDate,
                    registrationEndDate: testDrive.registrationEndDate,
                    registrationQuestionIDs: testDrive.registrationQuestionIDs,
                    registrationQuestions: testDrive.registrationQuestions,
                    employeeType: testDrive.employeeType
                };

                resolve(instance)
            }, err => reject(err))
        })
    }

    static getCurrentUserID() {
        let user = <User>this.getUserProfileProperties();
        return user.eliteProfileID; //TODO 
    }

    static getCurrentUser() {
        let user = <User>this.getUserProfileProperties();
        return <owner>{
            ID: user.eliteProfileID ? parseInt(user.eliteProfileID.toString()) : '',
            UserEMail: user.workEmail ? user.workEmail.trim() : '',
            UserInfoName: (user.firstName + " " + user.lastName).trim()
        }
    }

    static getEliteProfile() {
        return new Promise((resolve, reject) => {
            let cachedUser = false && Cache.getCache(Constants.CacheKeys.ELITE_PROFILE);
            // Disabling caching.
            if (cachedUser) {
                resolve(cachedUser);
            } else {
                let user = this.getUserProfileProperties();
                pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                    .getById(user.eliteProfileID)
                    .select(
                        Constants.Columns.COMPLETED_TEST_DRIVES,
                        Constants.Columns.CAR_IMAGE,
                        Constants.Columns.CAR_NAME,
                        Constants.Columns.Car_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.AVATAR_IMAGE,
                        Constants.Columns.AVATAR_NAME,
                        Constants.Columns.Car_ID + '/' + Constants.Columns.CAR_LEVEL,
                        Constants.Columns.AVATAR_ID + '/' + Constants.Columns.ID
                    )
                    .expand(Constants.Columns.Car_ID, Constants.Columns.AVATAR_ID)
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
                            avatarImage: profile.AvatarImage,
                            completedTestDrives: profile[Constants.Columns.COMPLETED_TEST_DRIVES],
                            levelName: profile.CarID.CarLevel,
                            avatarID: profile[Constants.Columns.AVATAR_ID][Constants.Columns.ID]
                        };
                        Cache.setCache(Constants.CacheKeys.ELITE_PROFILE, eliteProfle)
                        resolve(eliteProfle);
                    }, err => {
                        Utils.clientLog(err);
                    });
            }
        });
    }

    static getEliteProfileByID(id?: number) {
        id = id || this.getCurrentUserID();
        return new Promise((resolve, reject) => {
            //let user = this.getUserProfileProperties();
            pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                .getById(id)
                .select(
                    Constants.Columns.CAR_IMAGE,
                    Constants.Columns.CAR_NAME,
                    Constants.Columns.Car_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.AVATAR_IMAGE,
                    Constants.Columns.AVATAR_NAME,
                    Constants.Columns.COMPLETED_TEST_DRIVES,
                    Constants.Columns.COMPLETED_TEST_CASES,
                    Constants.Columns.DATE_JOINED,
                    Constants.Columns.USER_ROLE,
                    Constants.Columns.AVAILABLE_OS,
                    Constants.Columns.AVAILABLE_DEVICES,
                    Constants.Columns.ELITE_USERDEPARTMENT,
                    Constants.Columns.ID,
                    Constants.Columns.USER_INFO_NAME,
                    Constants.Columns.ACCOUNT_NAME,
                    Constants.Columns.USER_LOCATION,
                    Constants.Columns.USER_REGION_TEXT,
                    Constants.Columns.Car_ID + '/' + Constants.Columns.CAR_LEVEL,
                    Constants.Columns.AVATAR_ID + '/' + Constants.Columns.ID
                )
                .expand(Constants.Columns.Car_ID, Constants.Columns.AVATAR_ID)
                .get().then(profile => {
                    resolve(<EliteProfile>{
                        eliteProfileID: profile.Id,
                        accountName: profile.AccountName,
                        displayName: profile.UserInfoName,
                        location: profile.UserLocation,
                        region: profile.UserRegionText,
                        carImage: profile.CarImage,
                        carName: profile.CarName,
                        avatarName: profile.AvatarName,
                        avatarImage: profile.AvatarImage,
                        completedTestDrives: profile.CompletedTestDrives == null ? 0 : profile.CompletedTestDrives,
                        completedTestCases: profile.CompletedTestCases == null ? 0 : profile.CompletedTestCases,
                        dateJoined: this.formatDate(profile.DateJoined),
                        role: Services.getUserRole(profile.UserRole),
                        availableOS: profile.AvailableOS.results,
                        availableDevices: profile.AvailableDevices.results,
                        levelName: profile.CarID.CarLevel == null ? 0 : profile.CarID.CarLevel,
                        avatarID: profile[Constants.Columns.AVATAR_ID][Constants.Columns.ID],
                        department: profile.Elite_UserDepartment
                    });
                }, err => {
                    Utils.clientLog(err);
                });
        });
    }

    static getUserRank(userID: number) { //TODO Update logic for more that 5000 users.
        return new Promise((resolve, reject) => {
            Services.getListItemCount(Constants.Lists.POINTS).then((itemCount: number) => {
                pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                    .skip(0).top(itemCount)
                    .select(Constants.Columns.ID,
                        Constants.Columns.POINTS,
                        Constants.Columns.USER_ID + '/' + Constants.Columns.ID)
                    .expand(Constants.Columns.USER_ID)
                    .orderBy(Constants.Columns.POINTS, false)
                    .orderBy("Modified", true)
                    .get().then(results => {
                        let rank;
                        let points;
                        results.forEach((item, index) => {
                            if (item[Constants.Columns.USER_ID][Constants.Columns.ID] == userID) {
                                rank = index + 1;
                                points = item[Constants.Columns.POINTS];
                                return false;
                            }
                        })
                        resolve({ rank, points });
                    }, err => reject(err))
            });
        })
    }

    static getUserRankByID(userID: number) { //TODO Update logic for more that 5000 users.
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.POINTS).items
                .select(Constants.Columns.ID,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID)
                .expand(Constants.Columns.USER_ID)
                .orderBy(Constants.Columns.POINTS, false)
                .get().then(results => {
                    var result = { rank: 0, totalUsers: 0 };
                    let chkRank = 0;
                    results.forEach((item, index) => {
                        if (item[Constants.Columns.USER_ID][Constants.Columns.ID] == userID) {
                            chkRank = index;
                            result.rank = chkRank;
                            results.totalUsers = results.length;
                            return false;
                        }
                    })
                    resolve(result);
                })
        })
    }

    static getCurrentLeaderBoardPosition(region?: string) { //TODO Update logic for more that 5000 users.
        return new Promise((resolve, reject) => {
            Services.getEliteProfile().then((user: EliteProfile) => {
                Services.getUserRank(user.eliteProfileID).then((rankObj: any) => {
                    resolve(<Leader>{
                        avatar: user.avatarImage,
                        car: user.carImage,
                        completedTestDrives: user.completedTestDrives, //TODO get actual values.
                        id: user.eliteProfileID,
                        name: user.displayName,
                        rank: rankObj.rank,
                        totalPoints: rankObj.points,
                        region: user.region
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
                        firstName: user.firstName,
                        languages: user.languages,
                        lastName: user.lastName,
                        location: user.location,
                        region: user.region,
                        workEmail: user.workEmail,
                        role: user.EliteUserRole
                    }
                });
            })
        });
    }

    static getUserProfileProperties() {
        var data = $("#divUserProfileProperties").text();
        try {
            var user = <any>{};
            if (data) {
                data = data.replace(/\r?\n|\r/igm, "");
                data = data.replace(/\\/igm, "\\\\");
            }
            var userProfile = Utils.tryParseJSON(data);
            switch (userProfile.EliteUserRole) {
                case Constants.ColumnsValues.SITE_OWNER:
                    userProfile.role = Constants.ColumnsValues.SITE_OWNER_DISPLAY_NAME;
                    break;
                case Constants.ColumnsValues.TEST_DRIVE_OWNER:
                    userProfile.role = Constants.ColumnsValues.TEST_DRIVE_OWNER_DISPLAY_NAME;
                    break;
                default:
                    userProfile.role = Constants.ColumnsValues.TEST_DRIVER_DISPLAY_NAME;
                    break;
            }
            userProfile.location = userProfile.location;

            userProfile && $.each(userProfile, (key, value) => {
                user[key] = value && value.trim();
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    static getUserRole(role) {
        switch (role) {
            case Constants.ColumnsValues.SITE_OWNER:
                return Constants.ColumnsValues.SITE_OWNER_DISPLAY_NAME;
            case Constants.ColumnsValues.TEST_DRIVE_OWNER:
                return Constants.ColumnsValues.TEST_DRIVE_OWNER_DISPLAY_NAME;
            default:
                return Constants.ColumnsValues.TEST_DRIVER_DISPLAY_NAME;
        }
    }

    static getConfigurationsEliteProfile() {
        return new Promise((resolve, reject) => {
            let cachedConfig = Cache.getCache(Constants.CacheKeys.CONFIGURATIONS);
            if (cachedConfig) {
                resolve(cachedConfig);
            } else {
                let eliteProfileFields = Services.getFieldMetadata(Constants.Lists.USER_INFORMATION, [
                    Constants.Columns.USER_NAME,
                    Constants.Columns.AVAILABLE_DEVICES,
                    Constants.Columns.AVAILABLE_OS,
                    Constants.Columns.DATE_JOINED,
                    Constants.Columns.USER_LOCATION,
                    Constants.Columns.USER_ROLE,
                    Constants.Columns.USER_REGION
                ]);

                Promise.all([eliteProfileFields
                ]).then(results => {
                    Cache.setCache(Constants.CacheKeys.CONFIGURATIONS, results[0]);
                    resolve(results[0]);
                });
            }
        });
    }

    static getConfigurations() {
        return new Promise((resolve, reject) => {
            // let cachedConfig = Cache.getCache(Constants.CacheKeys.CONFIGURATIONS);
            // if (cachedConfig) {
            //     resolve(cachedConfig);
            // } else {

            let configObj = Cache.getCache(Constants.CacheKeys.CONFIGURATIONS);
            if (configObj) {
                resolve(configObj);
            }

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
            // }
        });
    }

    static getAvatars() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.AVATAR).items
                .select("FileRef/FileRef", "ID", "AvatarName")
                .orderBy("AvatarName").get().then(avatar => {
                    resolve(avatar);
                }, err => {
                    reject(err);
                })
        });
    }

    static getCars() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.CARMASTER).items
                .select(
                    "FileRef/FileRef",
                    "ID",
                    "CarName",
                    "PointsRequired",
                    "CarLevel",
                    "LevelName")
                .orderBy("CarLevel").get().then(car => {
                    resolve(car);
                }, err => {
                    reject(err);
                })
        });
    }

    static getApplicationConfigurations() {
        return new Promise((resolve, reject) => {
            var appConfig = Cache.getCache(Constants.CacheKeys.APPLICATION_CONFIGURATIONS);
            if (appConfig) {
                resolve(appConfig);
            }
            pnp.sp.web.lists.getByTitle(Constants.Lists.APPLICATION_CONFIGURATIONS).items
                .top(100).get().then(configurations => {
                    var appConfig = {};
                    configurations && configurations.length &&
                        configurations.map(configuration => {
                            appConfig[configuration.AppConfigKey] = configuration.AppConfigValue;
                        })
                    Cache.setCache(Constants.CacheKeys.APPLICATION_CONFIGURATIONS, appConfig);
                    resolve(appConfig);
                }, err => {
                    reject(err);
                })

        });
    }

    static getTestDrivesByFilter(filter: string, skip = 0, top = 3, orderBy?, ascending?) {
        return new Promise((resolve, reject) => {
            orderBy = orderBy || 'Modified';
            ascending = ascending || false;
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
                    Constants.Columns.LEVEL_ID + '/' + Constants.Columns.LevelNumber,
                    Constants.Columns.LEVEL_ID + '/' + Constants.Columns.LEVEL_NAME,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.ID,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_EMAIL,
                    Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.EXPECTED_BUSINESS_VALUE,
                    Constants.Columns.USER_REGION,
                    Constants.Columns.TestDriveMTCHID,
                    Constants.Columns.PASS_PERCENTAGE_TO_DEPLOY,
                    Constants.Columns.EMPLOYEE_TYPE,
                    Constants.Columns.APPROVAL_STATUS,
                    Constants.Columns.CHANGE_STATUS,
                    Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.ID,
                    Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.USER_EMAIL,
                    Constants.Columns.HAS_REGISTRATION,
                    Constants.Columns.REGISTRATION_END_DATE,
                    Constants.Columns.REGISTRATION_START_DATE
                ).skip(skip).top(top)
                .expand(Constants.Columns.TESTDRIVE_OWNER,
                    Constants.Columns.LEVEL_ID, Constants.Columns.QUESTION_ID,
                    Constants.Columns.TESTCASE_ID,
                    Constants.Columns.PRIMARY_OWNER)
                .filter(filter)
                .orderBy(orderBy, ascending)
                .get().then(testDrives => {
                    let testDriveObj: TestDrive;
                    let results = testDrives.map((testDrive) => {
                        return {
                            title: testDrive.TestDriveName,
                            description: testDrive.EliteDescription,
                            status: testDrive.TestDriveStatus,
                            startDate: testDrive.TestDriveStartDate,
                            endDate: testDrive.TestDriveEndDate,
                            registrationStartDate: testDrive[Constants.Columns.REGISTRATION_START_DATE],
                            registrationEndDate: testDrive[Constants.Columns.REGISTRATION_END_DATE],
                            maxPoints: testDrive.TotalPoints,
                            department: testDrive.TestDriveDepartment.results,
                            function: [], //testDrive.TestDriveFunction.results,
                            location: testDrive.TestDriveLocation.results,
                            requiredDevices: testDrive.AvailableDevices.results,
                            requiredOs: testDrive.AvailableOS.results,
                            maxTestDrivers: testDrive.MaxTestDrivers,
                            id: testDrive.ID,
                            levelName: testDrive.LevelID.LevelName,
                            level: testDrive.LevelID.ID,

                            testCaseIDs: testDrive[Constants.Columns.TESTCASE_ID].results,
                            region: testDrive[Constants.Columns.USER_REGION].results.map((value, index) => {
                                return value.Label;
                            }),
                            questionIDs: testDrive[Constants.Columns.QUESTION_ID].results,
                            expectedBusinessValue: '',
                            testCases: null,
                            questions: null,
                            levelNumber: testDrive.LevelID[Constants.Columns.LevelNumber],
                            owner: testDrive[Constants.Columns.TESTDRIVE_OWNER][Constants.Columns.USER_INFO_NAME],
                            ownerEmail: testDrive[Constants.Columns.TESTDRIVE_OWNER][Constants.Columns.USER_EMAIL],
                            ownerID: testDrive[Constants.Columns.TESTDRIVE_OWNER][Constants.Columns.ID],
                            teamsChannelID: testDrive.TestDriveMTCHID && testDrive.TestDriveMTCHID.replace("-", ""),
                            passPercentageToDeploy: testDrive[Constants.Columns.PASS_PERCENTAGE_TO_DEPLOY] || 0,
                            owners: testDrive.TestDriveOwner ? testDrive.TestDriveOwner.results : null,
                            employeeType: testDrive[Constants.Columns.EMPLOYEE_TYPE].results || [],
                            approvalStatus: testDrive[Constants.Columns.APPROVAL_STATUS],
                            changeStatus: testDrive[Constants.Columns.CHANGE_STATUS],
                            hasRegistration: testDrive[Constants.Columns.HAS_REGISTRATION]
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
            var filter = "TestDriveOwner eq " + ownerID;
            Services.getTestDrivesByFilter(filter, skip, top)
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

    static getActiveTestDrivesIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var filter = `TestDriveOwner eq ${ownerID} and (TestDriveStatus eq '${Constants.ColumnsValues.ACTIVE}' or TestDriveStatus eq '${Constants.ColumnsValues.REGISTRATION_STARTED}')`;
            Services.getTestDrivesByFilter(filter, skip, top)
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

    static getDraftedTestDrivesIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            //             var filter = `Author/Id eq ${_spPageContextInfo.userId} and 
            // (TestDriveStatus eq '${Constants.ColumnsValues.DRAFT}' or 
            // ${Constants.Columns.CHANGE_STATUS} eq '${Constants.ColumnsValues.DRAFT}')`;
            var filter = `(TestDriveOwner eq ${ownerID})
and (TestDriveStatus eq '${Constants.ColumnsValues.DRAFT}' or ${Constants.Columns.CHANGE_STATUS} eq '${Constants.ColumnsValues.CHANGE_DRAFTED}')`;
            Services.getTestDrivesByFilter(filter, skip, top)
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

    static getSubmitedTestDrivesIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var filter = "TestDriveOwner eq " + ownerID +
                " and TestDriveStatus eq '" + Constants.ColumnsValues.SUBMIT + "'";
            Services.getTestDrivesByFilter(filter, skip, top)
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


    static getInProgressTestDrivesIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var filter = `TestDriveOwner eq ${ownerID} and 
(TestDriveStatus eq '${Constants.ColumnsValues.ACTIVE}' or 
TestDriveStatus eq '${Constants.ColumnsValues.REGISTRATION_STARTED}' or 
TestDriveStatus eq '${Constants.ColumnsValues.REGISTRATION_ENDED}')`;
            Services.getTestDrivesByFilter(filter, skip, top)
                .then((testDrives: any) => {
                    var testDrivesIDs = [];
                    testDrives.map((testDrive, index) => {
                        testDrivesIDs.push(testDrive.id);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {
                        var testDrivesResults = [];
                        Services.getTestDrivesReport(testDrivesIDs).then((report: any) => {
                            testDrives.map((testDrive, index) => {
                                testDrive.participants = participants[index];
                                testDrive.report = report[index];
                                testDrivesResults.push({
                                    participants: participants[index],
                                    testDrive: testDrive,
                                    report: report[index]
                                })
                            })
                            resolve(testDrivesResults);
                        })
                    });



                }, error => {
                    Utils.clientLog(error);
                });
        });
    }

    static getCompletedTestDriveIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var filter = "TestDriveOwner eq " + ownerID +
                " and TestDriveStatus eq '" + Constants.ColumnsValues.TEST_DRIVE_COMPLETED + "'";
            Services.getTestDrivesByFilter(filter, skip, top)
                .then((testDrives: any) => {
                    var testDrivesIDs = [];
                    testDrives.map((testDrive, index) => {
                        testDrivesIDs.push(testDrive.id);
                    });
                    Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {
                        var testDrivesResults = [];
                        Services.getTestDrivesReport(testDrivesIDs).then((report: any) => {
                            testDrives.map((testDrive, index) => {
                                testDrive.participants = participants[index];
                                testDrive.report = report[index];
                                testDrivesResults.push({
                                    participants: participants[index],
                                    testDrive: testDrive,
                                    report: report[index]
                                })
                            })
                            resolve(testDrivesResults);
                        })
                    })

                }, error => {
                    Utils.clientLog(error);
                });
        });
    }

    static getUpCommingTestDriveIRun(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var ownerID = Services.getCurrentUserID();
            var d = new Date();
            var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var filter = "TestDriveOwner eq " + ownerID +
                " and (TestDriveStatus eq '" + Constants.ColumnsValues.READY_FOR_LAUNCH + "'" +
                " or TestDriveStatus eq '" + Constants.ColumnsValues.SUBMIT + "')";
            Services.getTestDrivesByFilter(filter, skip, top)
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
                    registrationEndDate: "",
                    registrationStartDate: "",
                    expectedBusinessValue: "",
                    function: [],
                    department: [],
                    location: [],
                    requiredDevices: [],
                    requiredOs: [],
                    maxTestDrivers: 0,
                    testCaseIDs: [],
                    testCases: [],
                    questionIDs: [],
                    questions: [],
                    registrationQuestionIDs: [],
                    registrationQuestions: [],
                    region: [],
                    status: Constants.ColumnsValues.DRAFT,
                    level: '',
                    passPercentageToDeploy: 0,
                    ownerEmail: '',
                    ownerID: '',
                    teamsChannelID: '',
                    hasRegistration: false,
                    employeeType: [],
                    owners: [this.getCurrentUser()],
                    approvalStatus: Constants.ColumnsValues.PENDING,
                    changeStatus: Constants.ColumnsValues.DRAFT,
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
                        Constants.Columns.REGISTRATION_START_DATE,
                        Constants.Columns.REGISTRATION_END_DATE,
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
                        Constants.Columns.TESTDRIVE_OWNER + '/' + Constants.Columns.USER_EMAIL,
                        Constants.Columns.TESTCASE_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.QUESTION_ID + '/' + Constants.Columns.ID,
                        Constants.Columns.REGISTRATION_QUESTIONS + '/' + Constants.Columns.ID,
                        Constants.Columns.EXPECTED_BUSINESS_VALUE,
                        Constants.Columns.PASS_PERCENTAGE_TO_DEPLOY,
                        Constants.Columns.TestDriveMTCHID,
                        Constants.Columns.HAS_REGISTRATION,
                        Constants.Columns.EMPLOYEE_TYPE,
                        Constants.Columns.APPROVAL_STATUS,
                        Constants.Columns.CHANGE_STATUS,
                        Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.ID,
                        Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.USER_NAME,
                        Constants.Columns.PRIMARY_OWNER + '/' + Constants.Columns.USER_EMAIL,
                        Constants.Columns.USER_REGION
                    )
                    .expand(Constants.Columns.TESTDRIVE_OWNER, Constants.Columns.LEVEL_ID,
                        Constants.Columns.QUESTION_ID, Constants.Columns.TESTCASE_ID,
                        Constants.Columns.REGISTRATION_QUESTIONS,
                        Constants.Columns.PRIMARY_OWNER)
                    .get().then(testDrive => {
                        let questions = testDrive.QuestionID.results.map((question) => {
                            return question.ID;
                        });
                        let registrationQuestions = testDrive[Constants.Columns.REGISTRATION_QUESTIONS]
                            .results.map((registrationQuestion) => {
                                return registrationQuestion.ID;
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
                            registrationStartDate: testDrive[Constants.Columns.REGISTRATION_START_DATE],
                            registrationEndDate: testDrive[Constants.Columns.REGISTRATION_END_DATE],
                            maxPoints: testDrive.TotalPoints,
                            department: testDrive.TestDriveDepartment.results,
                            function: [], //testDrive.TestDriveFunction.results,
                            location: testDrive.TestDriveLocation.results,
                            requiredDevices: testDrive.AvailableDevices.results,
                            requiredOs: testDrive.AvailableOS.results,
                            maxTestDrivers: testDrive.MaxTestDrivers,
                            id: testDrive.ID,
                            level: testDrive.LevelID.ID,
                            levelName: testDrive.LevelID.LevelName,
                            owner: testDrive[Constants.Columns.PRIMARY_OWNER][Constants.Columns.USER_INFO_NAME],
                            ownerID: testDrive[Constants.Columns.PRIMARY_OWNER][Constants.Columns.ID],
                            ownerEmail: testDrive[Constants.Columns.PRIMARY_OWNER][Constants.Columns.USER_EMAIL],
                            testCases: null,
                            questions: null,
                            testCaseIDs: testCases,
                            questionIDs: questions,
                            registrationQuestionIDs: registrationQuestions,
                            expectedBusinessValue: testDrive.ExpectedBusinessValue,
                            passPercentageToDeploy: testDrive[Constants.Columns.PASS_PERCENTAGE_TO_DEPLOY] || 0,
                            teamsChannelID: testDrive.TestDriveMTCHID && testDrive.TestDriveMTCHID.replace("-", ""),
                            hasRegistration: testDrive[Constants.Columns.HAS_REGISTRATION] || false,
                            owners: testDrive.TestDriveOwner.results || [this.getCurrentUser()],
                            employeeType: testDrive[Constants.Columns.EMPLOYEE_TYPE].results || [],
                            approvalStatus: testDrive[Constants.Columns.APPROVAL_STATUS],
                            changeStatus: testDrive[Constants.Columns.CHANGE_STATUS],
                            region: testDrive[Constants.Columns.USER_REGION] && testDrive[Constants.Columns.USER_REGION].results
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
                Services.getTestDrivesByFilter(filter, 0, 1000).then(testDrives => {
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
                        Constants.Columns.RETEST,
                        Constants.Columns.EDIT_STATUS,
                        Constants.Columns.IS_EDITED,
                        Constants.Columns.VERSION
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
                                reTest: t.ReTest,
                                isEdited: t[Constants.Columns.IS_EDITED],
                                editStatus: t[Constants.Columns.EDIT_STATUS],
                                version: t[Constants.Columns.VERSION] || 1
                            })
                        })
                        resolve(testCaseArray);
                    }, error => {
                        reject(error);
                    });
            }
        });
    }

    static getQuestionsByIds(questionIDs: number[]) {
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
                        Constants.Columns.RESPONSETYPE,
                        Constants.Columns.IS_EDITED,
                        Constants.Columns.EDIT_STATUS,
                        Constants.Columns.VERSION
                    )
                    .filter(filter)
                    .get().then(questions => {
                        let questionArray: Question[] = [];
                        questions.map(q => {
                            questionArray.push({
                                id: q.ID,
                                title: q.Question,
                                questionType: q.ResponseType,
                                options: Utils.tryParseJSON(q.Responses || "[]"),
                                isInEditMode: false,
                                isEdited: q[Constants.Columns.IS_EDITED],
                                editStatus: q[Constants.Columns.EDIT_STATUS],
                                version: q[Constants.Columns.VERSION]
                            })
                        });
                        resolve(questionArray);
                    }, error => {
                        reject(error);
                    });
            }
        });
    }

    static getRegistrationQuestonsByIds(questionIDs: number[]) {
        return new Promise((resolve, reject) => {
            let filter = '';
            if (!questionIDs || questionIDs.length == 0) {
                resolve([]);
            } else {
                questionIDs.map((id, index) => {
                    filter += 'ID eq ' + id + (questionIDs.length - 1 != index ? ' or ' : '');
                });
                pnp.sp.web.lists.getByTitle(Constants.Lists.REGISTRATION_QUESTIONS).items
                    .select(
                        Constants.Columns.TITLE,
                        Constants.Columns.ID,
                        Constants.Columns.QUESTION,
                        Constants.Columns.RESPONSES,
                        Constants.Columns.RESPONSETYPE,
                        Constants.Columns.IS_EDITED,
                        Constants.Columns.EDIT_STATUS,
                        Constants.Columns.VERSION
                    )
                    .filter(filter)
                    .get().then(questions => {
                        let questionArray: Question[] = [];
                        questions.map(q => {
                            questionArray.push({
                                id: q.ID,
                                title: q.Question,
                                questionType: q.ResponseType,
                                options: Utils.tryParseJSON(q.Responses || "[]"),
                                isInEditMode: false,
                                isEdited: q[Constants.Columns.IS_EDITED],
                                editStatus: q[Constants.Columns.EDIT_STATUS],
                                version: q[Constants.Columns.VERSION]
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

    static getReferrerID(referrer) {
        if (referrer) {
            try {
                return parseInt(referrer);
            } catch (e) {
                return '';
            }
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
            promises.push(this.createRegistrationQuestions(testDrive.registrationQuestions));

            Promise.all(promises).then((results) => {
                let testCases = results[0];
                let questions = results[1];
                let registrationQuestions = results[2];
                let testDrives = [];
                let newTestDrive = {
                    ID: testDrive.id,
                    Title: testDrive.title.trim(),
                    EliteDescription: testDrive.description,
                    TestDriveStartDate: testDrive.startDate,
                    TestDriveEndDate: testDrive.endDate,
                    HasRegistration: testDrive.hasRegistration,
                    TotalPoints: testDrive.maxPoints,
                    LevelID_id: testDrive.level,
                    ExpectedBusinessValue: testDrive.expectedBusinessValue,
                    TestDriveLocation_tax: testDrive.location,
                    TestDriveDepartment_tax: testDrive.department,
                    AvailableDevices_tax: testDrive.requiredDevices,
                    AvailableOS_tax: testDrive.requiredOs,
                    Elite_UserRegion_tax: testDrive.region,
                    MaxTestDrivers: testDrive.maxTestDrivers,
                    TestDriveName: testDrive.title,
                    TestDriveStatus: testDrive.status,
                    PrimaryOwner_id: this.getCurrentUserID(),
                    PassPercentageToDeploy: testDrive.passPercentageToDeploy,
                    EmployeeType_tax: testDrive.employeeType,
                }

                // newTestDrive["_ModerationStatus"] = testDrive.approvalStatus || Constants.ColumnsValues.PENDING,
                newTestDrive[Constants.Columns.CHANGE_STATUS] = testDrive.changeStatus;

                if (testDrive.owners) {
                    let ids = [];
                    testDrive.owners.map(o => {
                        ids.push(parseInt(o.ID.toString()))
                    });
                    newTestDrive["TestDriveOwner_id"] = {
                        results: ids || []
                    }
                } else {
                    newTestDrive["TestDriveOwner_id"] = {
                        results: [this.getCurrentUser()]
                    }
                }

                if (questions.length > 0) {
                    let ids = [];
                    questions.map(question => {
                        ids.push(question.id);
                    });
                    newTestDrive["QuestionID_id"] = {
                        results: ids || []
                    }
                }

                if (testDrive.hasRegistration) {
                    newTestDrive[Constants.Columns.REGISTRATION_START_DATE] =
                        testDrive.registrationStartDate;
                    newTestDrive[Constants.Columns.REGISTRATION_END_DATE] =
                        testDrive.registrationEndDate;
                    if (registrationQuestions.length > 0) {
                        let ids = [];
                        registrationQuestions.map(question => {
                            ids.push(question.id);
                        });
                        newTestDrive[Constants.Columns.REGISTRATION_QUESTIONS + "_id"] = {
                            results: ids || []
                        }
                    }

                }

                if (testCases.length > 0) {
                    let ids = [];
                    testCases.map(testCase => {
                        ids.push(testCase.id);
                    });
                    newTestDrive["TestCaseID_id"] = {
                        results: ids || []
                    }
                }

                testDrives.push(newTestDrive);

                this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVES,
                    testDrives).then((data: TestDrive) => {
                        resolve({
                            ...testDrive,
                            id: data[0].id,
                            testCases: testCases,
                            questions: questions,
                            registrationQuestions: registrationQuestions

                        });
                    }, err => {
                        reject(err);
                    }).catch(err => {
                        Utils.clientLog(err);
                    });
            });
        });
    }
    static createOrSaveEliteProfile(eliteProfile: EliteProfile) {
        return new Promise((resolve, reject) => {
            var promises = [];
            Promise.all(promises).then((results) => {
                let eliteProfiles = [];
                let newEliteProfile = {
                    ID: eliteProfile.eliteProfileID,
                    Title: eliteProfile.accountName,
                    AvailableDevices_tax: eliteProfile.availableDevices,
                    AvailableOS_tax: eliteProfile.availableOS,
                    AvatarID_id: eliteProfile.avatarID,
                    AvatarImage: eliteProfile.avatarImage,
                    AvatarName: eliteProfile.avatarName,
                    CarID_id: eliteProfile.carID,
                    CarImage: eliteProfile.carImage,
                    CarName: eliteProfile.carName,
                    Elite_UserDepartment: eliteProfile.department
                }

                eliteProfiles.push(newEliteProfile);

                this.createOrUpdateListItemsInBatch(Constants.Lists.USER_INFORMATION,
                    eliteProfiles).then((data: EliteProfile) => {
                        resolve({ ...eliteProfile, id: data.eliteProfileID });
                    }, err => {
                        reject(err);
                    }).catch(err => {
                        Utils.clientLog(err);
                    });
            });
        });
    }

    static createOrSaveReportBug(reportBug: ReportBug) {
        return new Promise((resolve, reject) => {
            let reportBugs = [];
            let newReportBug = {
                ID: reportBug.id || -1,
                Title: reportBug.title,
                EliteDescription: reportBug.description,
                TestDriveID: reportBug.testDriveID,
                BugReportedBy: reportBug.reportedBy,
                ReportBugStatus: reportBug.status
            }
            reportBugs.push(newReportBug);
            this.createOrUpdateListItemsInBatch(Constants.Lists.REPORT_BUG, reportBugs).then((data: ReportBug) => {
                data = data[0];
                var listItem = pnp.sp.web.lists.getByTitle(Constants.Lists.REPORT_BUG).items.getById(data.id);
                Services.saveBugAttachment(data.id, reportBug, listItem).then((attachments: any) => {
                    reportBug.files = attachments;
                    resolve({
                        ...reportBug,
                        id: data.id,
                        files: attachments
                    })
                }, (error) => {
                    reject(error);
                    Utils.clientLog(error);
                });
            }, err => {
                reject(err);
            })
        });
    }

    static createTestCase(testCases: TestCase[]) {
        return new Promise((resolve, reject) => {
            var testCasesArray = [];
            if (testCases && testCases.length > 0) {
                Services.getTestPointConfiguration(Constants.Lists.POINTS_CONFIGURATIONS).then(testCasePoints => {
                    testCases.forEach((testCase, index) => {
                        testCasesArray.push({
                            ID: testCase.newItem ? -1 : testCase.id,
                            Title: testCase.title,
                            EliteDescription: testCase.description,
                            TestCaseOutcome: testCase.expectedOutcome,
                            Type: testCase.testCaseType,
                            Scenario: testCase.scenario,
                            TestCasePriority: testCase.priority,
                            Points: testCasePoints || 10,
                            ReTest: testCase.reTest,
                            EditStatus: testCase.editStatus,
                            IsEdited: testCase.isEdited,
                            [Constants.Columns.VERSION]: testCase.version || 0
                        });
                    });

                    this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_CASES, testCasesArray)
                        .then((data: any) => {
                            var testCases = data && data.length && data.map(testCase => {
                                return (<TestCase>{
                                    id: testCase.id,
                                    title: testCase.Title,
                                    description: testCase.EliteDescription,
                                    expectedOutcome: testCase.TestCaseOutcome,
                                    points: testCase.Points,
                                    reTest: testCase.ReTest,
                                    testCaseType: testCase.Type,
                                    scenario: testCase.Scenario,
                                    priority: testCase.TestCasePriority,
                                    editTestCase: testCase.EditStatus,
                                    isEdited: testCase.IsEdited,
                                    version: testCase.version
                                })
                            })
                            resolve(testCases);
                        }, err => {
                            reject(err);
                        });
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
                        ResponseType: question.questionType,
                        IsEdited: question.isEdited,
                        EditStatus: question.editStatus,
                        [Constants.Columns.VERSION]: question.version || 0
                    });
                });
                this.createOrUpdateListItemsInBatch(Constants.Lists.SURVEY_QUESTIONS, questionsArray).
                    then((questions: any) => {
                        var data = questions && questions.length && questions.map(question => {
                            return {
                                id: question.id,
                                ID: question.id,
                                options: (question.Responses && question.Responses.length) ? Utils.tryParseJSON(question.Responses) : [],
                                questionType: question.ResponseType,
                                title: question.Question,
                                isEdited: question.IsEdited,
                                editStatus: question.EditStatus,
                                version: question[Constants.Columns.VERSION]
                            }
                        });
                        resolve(data);
                    }, err => {
                        reject(err);
                    })
            } else {
                resolve([]);
            }
        });
    }

    static createRegistrationQuestions(questions: Question[]) {
        return new Promise((resolve, reject) => {
            var questionsArray = [];
            if (questions && questions.length > 0) {
                questions.forEach((question, index) => {
                    questionsArray.push({
                        ID: question.newItem ? -1 : question.id,
                        Question: question.title,
                        Responses: JSON.stringify(question.options),
                        ResponseType: question.questionType,
                        IsEdited: question.isEdited,
                        EditStatus: question.editStatus,
                        [Constants.Columns.VERSION]: question.version || 0
                    });
                });
                this.createOrUpdateListItemsInBatch(Constants.Lists.REGISTRATION_QUESTIONS, questionsArray).
                    then((questions: any) => {
                        var data = questions && questions.length && questions.map(question => {
                            return {
                                id: question.id,
                                ID: questions.ID,
                                options: (question.Responses && question.Responses.length) ?
                                    Utils.tryParseJSON(question.Responses) : [],
                                questionType: question.ResponseType,
                                title: question.Question,
                                isEdited: question.IsEdited,
                                editStatus: question.EditStatus,
                                version: question[Constants.Columns.VERSION]
                            }
                        });
                        resolve(data);
                    }, err => {
                        reject(err);
                    })
            } else {
                resolve([]);
            }
        });
    }

    static deleteRegistrationQuestion(registrationQuestion: RegistrationQuestion) {
        return new Promise((resolve, reject) => {
            if (registrationQuestion.newItem) {
                resolve(registrationQuestion.id);
            } else {
                pnp.sp.web.lists.getByTitle(Constants.Lists.REGISTRATION_QUESTIONS)
                    .items.getById(registrationQuestion.id).delete()
                    .then(() => {
                        resolve(registrationQuestion.id);
                    }, (error) => {
                        Utils.clientLog(error);
                        reject(error);
                    });
            }

        });
    }

    static deleteSurveyQuestion(question: Question) {
        return new Promise((resolve, reject) => {
            if (question.newItem) {
                resolve(question.id);
            } else {
                pnp.sp.web.lists.getByTitle(Constants.Lists.SURVEY_QUESTIONS)
                    .items.getById(question.id).delete()
                    .then(() => {
                        resolve(question.id);
                    }, (error) => {
                        Utils.clientLog(error);
                        reject(error);
                    });
            }

        });
    }

    static deleteTestCase(testCase: TestCase) {
        return new Promise((resolve, reject) => {
            if (testCase.newItem) {
                resolve(testCase.id);
            } else {
                pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASES)
                    .items.getById(testCase.id).delete()
                    .then(() => {
                        resolve(testCase.id);
                    }, (error) => {
                        Utils.clientLog(error);
                        reject(error);
                    });
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
                })
        });
    }

    static getCarDetailsByFilter(str) {
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
                })
        })

    }

    static checkIfUserExists(userInfoList, filter) {
        return new Promise((resolve, reject) => {
            userInfoList.items.filter(filter).get().then(items => {
                if (items.length > 0) {
                    resolve(items[0].Id);
                } else {
                    resolve(-1);
                }
            })
        })
    }

    static createEliteUserProfile(user: User, referrerID: string) {

        return new Promise((resolve, reject) => {
            var userInfoList = pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION);
            var filter = "AccountName eq '" + encodeURIComponent(user.accountName) + "'";
            let promises = [this.getDefaultCarDetails(), this.getDefaultAvatarDetails()];
            let baseUrl = location.protocol + "//" + location.hostname;

            Services.checkIfUserExists(userInfoList, filter).then(userID => {
                Promise.all(promises).then(results => {
                    let carDetails = <any>results[0];
                    let avatarDetails = <any>results[1];
                    this.createOrUpdateListItemsInBatch(Constants.Lists.USER_INFORMATION, [{
                        ID: userID || -1,
                        AccountName: user.accountName,
                        DateJoined: new Date().toISOString(),
                        UserLocation: user.location,
                        ReferrerID_id: Services.getReferrerID(referrerID),
                        UserRegionText: user.region,
                        CarImage: baseUrl + carDetails.FileRef,
                        CarName: carDetails.CarName,
                        CarID_id: carDetails.ID,
                        AvatarName: avatarDetails.AvatarName,
                        AvatarImage: baseUrl + avatarDetails.FileRef,
                        AvatarID_id: avatarDetails.ID,
                        Elite_UserDepartment: '',
                        UserInfoName: user.displayName,
                        UserRole: user.role || Constants.ColumnsValues.TEST_DRIVER,
                        [Constants.Columns.USER_EMAIL]: user.workEmail
                    }])
                        .then((users: any) => {
                            let user = users[0];
                            let newUser = { ...user, eliteProfileID: user.id }
                        }, err => {
                            Utils.clientLog(err);
                        })
                });
            });
        });
    }

    static createOrUpdateListItemsInBatch(listName: string, items: any[]) {
        return new Promise((resolve, reject) => {
            try {
                SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                    let ctx = SP.ClientContext.get_current();
                    let list = ctx.get_web().get_lists().getByTitle(listName);
                    const listItems = [];
                    items.forEach((item, index) => {
                        if (item.ID !== -1) {
                            listItems[index] = list.getItemById(item.ID);
                            ctx.load(listItems[index]);
                        } else {
                            var listInfo = new SP.ListItemCreationInformation();
                            listItems[index] = list.addItem(listInfo);
                        }
                    });

                    ctx.executeQueryAsync((sender, args) => {
                        this.UpdatedItem(ctx, items, listItems).then(results => {
                            resolve(results)
                        })
                    }, (sender, args) => {
                        Utils.clientLog(args);
                        reject(args.get_message());
                    });
                });
            }
            catch (args) {
                Utils.clientLog(args);
                reject(args.get_message());
            }
        });
    }

    static UpdatedItem(ctx, items, listItems) {
        return new Promise((resolve, reject) => {
            items.forEach((item, index) => {
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
                Utils.clientLog(args);
            });
        })
    }

    static getAllTermsInTermGroup() {
        // get termSet
        return new Promise((resolve, reject) => {
            TermStore.getTermSetsInGroup({
                groupId: "0b7c0b89-06e8-4b9b-a3ba-52b8183f1cc7"
            }).then((termSets: any[]) => {
                var promises = [];
                termSets.forEach(termSet => {
                    promises.push(TermStore.getTermSetAsTree(termSet.id, termSet.name));
                });
                Promise.all(promises).then((data) => {
                    Utils.clientLog(data);
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
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "region";
                let termSetID = appConfig.Region;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    Cache.setCache("region", options)
                    resolve(options);
                });
            });
        });
    }

    static getLocations() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "location";
                let termSetID = appConfig.Location;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    resolve(options);
                });
            });
        });
    }

    static getDepartments() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "department";
                let termSetID = appConfig.Department;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    resolve(options);
                });
            });
        });
    }

    static getDevices() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "device";
                let termSetID = appConfig.Devices;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    resolve(options);
                });
            });
        });
    }

    static getOSes() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "os";
                let termSetID = appConfig.Os;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    resolve(options);
                });
            })
        });
    }

    static getEmployeeTypes() {
        return new Promise((resolve, reject) => {
            Services.getApplicationConfigurations().then((appConfig: appconfig) => {
                let termSetName = "employeeType";
                let termSetID = appConfig.EmployeeType;
                this.getTermSetAsOptions(termSetName, termSetID).then(options => {
                    resolve(options);
                });
            })
        });
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            let cacheKey = 'usersList';
            let record = Cache.getCache(cacheKey);
            if (record) {
                resolve(record);
            }

            pnp.sp.web.lists.getByTitle(Constants.Lists.USER_INFORMATION).items
                .select(
                    Constants.Columns.ID,
                    Constants.Columns.USER_INFO_NAME,
                    Constants.Columns.ACCOUNT_NAME)
                .get().then((users: any) => {
                    Cache.setCache(cacheKey, users)
                    resolve(users);
                })
        });
    }

    static getServerTimeZone = function () {
        return new Promise((resolve, reject) => {
            var serverTimeZone = Cache.getCache(Constants.CacheKeys.SERVER_TIME_ZONE);
            if (serverTimeZone) {
                resolve(serverTimeZone);
            }
            var context = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
            var web = context.get_web();
            var timeZone = web.get_regionalSettings().get_timeZone();
            context.load(timeZone);
            context.executeQueryAsync(function (data) {

                var info = timeZone.get_information();
                var result = {
                    bias: info.get_bias(),
                    daylightBias: info.get_daylightBias(),
                    standardBias: info.get_standardBias()
                }
                Cache.setCache(Constants.CacheKeys.SERVER_TIME_ZONE, result);
                resolve(result);
            }, function (sender, args) {
                resolve(args);
            });
        });
    }

    static formatDate(date: string) {
        date = date ? date.split('T')[0] + "T23:00:00" : "";
        return moment(date).format("MMM DD, YYYY");
    }

    static getTermSetAsOptions(termSetName, termSetID) {
        return new Promise((resolve, reject) => {
            let record = Cache.getCache(termSetName);
            if (record) {
                resolve(record);
            }
            TermStore.getTermSetAsTree(termSetID, termSetName)
                .then((term: any) => {
                    let options = [];
                    term.children.map((term) => {
                        options.push({
                            TermGuid: term.guid,
                            Label: term.name
                        })
                    });
                    Cache.setCache(termSetName, options);
                    resolve(options);
                });

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
    //                         avatar: "/Style%20Library/Elite/images/masc1.png"
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
    //                                 avatar: "/Style%20Library/Elite/images/masc1.png"
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
                    Constants.Columns.USER_ID + '/' + Constants.Columns.COMPLETED_TEST_DRIVES,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.COMPLETED_TEST_CASES,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_IMAGE,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_IMAGE,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.USER_REGION_TEXT
                )
                .expand("UserID").top(100)
                .orderBy('Points', false)
                .orderBy("Modified", true)
                .filter("PointsEarnedOnDate gt datetime'" + lastYear + "T23:59:59.000Z'")
                .skip(skip).top(count)
                .get().then(leaders => {
                    leaders.map((leader, index) => {
                        globalLeaders.push({
                            id: leader[Constants.Columns.USER_ID][Constants.Columns.ID],
                            name: leader.UserID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserID.AvatarImage,
                            car: leader.UserID.CarImage,
                            completedTestDrives:
                                leader[Constants.Columns.USER_ID][Constants.Columns.COMPLETED_TEST_DRIVES] || 0,
                            rank: index + 1,
                            region: [Constants.Columns.USER_ID][Constants.Columns.USER_REGION_TEXT]
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
                    Constants.Columns.USER_ID + '/' + Constants.Columns.COMPLETED_TEST_DRIVES,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.COMPLETED_TEST_CASES,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.USER_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_IMAGE,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.CAR_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_NAME,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.AVATAR_IMAGE,
                    Constants.Columns.USER_ID + '/' + Constants.Columns.USER_REGION_TEXT,
            )
                .expand("UserID").top(top).skip(skip)
                .orderBy('Points', false)
                .orderBy("Modified", true)
                .filter("PointsEarnedOnDate gt datetime'" +
                    lastYear + "T23:59:59.000Z' and " + Constants.Columns.USER_ID + '/' + Constants.Columns.USER_REGION_TEXT + " eq '" + region + "'")
                .get().then(leaders => {
                    leaders.map((leader, index) => {
                        regionalLeaders.push({
                            id: leader[Constants.Columns.USER_ID][Constants.Columns.ID],
                            name: leader.UserID.UserInfoName,
                            totalPoints: leader.Points,
                            avatar: leader.UserID.AvatarImage,
                            car: leader.UserID.CarImage,
                            completedTestDrives:
                                leader[Constants.Columns.USER_ID][Constants.Columns.COMPLETED_TEST_DRIVES] || 0,
                            rank: index + 1,
                            region: [Constants.Columns.USER_ID][Constants.Columns.USER_REGION_TEXT]
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
                .get().then(userPoints => {
                    resolve(userPoints[0].Points);
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

    static getActiveTestDriveCount() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items
                .filter("TestDriveStatus eq '" + Constants.ColumnsValues.ACTIVE +
                    "' or TestDriveStatus eq '" + Constants.ColumnsValues.TEST_DRIVE_COMPLETED + "'").top(10000).get().then(function (result) {
                        var itemCount = result ? result.length : 0;
                        resolve(itemCount);
                    }, err => {
                        Utils.clientLog(err);
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
            var filter = "UserID eq '" + Services.getCurrentUserID() + "' and Status eq '" + Constants.ColumnsValues.COMPLETE_STATUS + "'";
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select("ID,UserID/ID").expand("UserID")
                .filter(filter)
                .get().then(testDrives => {
                    resolve(testDrives.length);
                })
        });
    }

    static getCurrentTestDrivesNotCompleted(userID) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select("ID,UserID/ID").expand("UserID")
                .filter("UserID eq '" + userID + "' and Status ne '" + Constants.ColumnsValues.COMPLETE_STATUS + "'")
                .get().then(testDrives => {
                    resolve(testDrives.length);
                })
        });
    }

    static getMyTestDriveIDs(skip: number, top: number) {
        return new Promise((resolve, reject) => {
            var filter = Constants.Columns.USER_ID + ' eq ' + Services.getCurrentUserID();
            pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVE_INSTANCES).items
                .select(
                    Constants.Columns.ID,
                    Constants.Columns.TEST_DRIVE_ID + '/' + Constants.Columns.ID
                )
                .filter(filter).expand(Constants.Columns.TEST_DRIVE_ID)
                .skip(skip)
                .top(top)
                .get().then(myTestDrives => {
                    var ids = [];
                    myTestDrives && myTestDrives.length && myTestDrives.map(myTestDrive => {
                        ids.push(myTestDrive[Constants.Columns.TEST_DRIVE_ID][Constants.Columns.ID]);
                    })
                    resolve(ids);
                }, err => reject(err))
        });
    }

    static getActiveTestDrives(skip = 0, top = 3) {
        var d = new Date();
        var user = Services.getUserProfileProperties();
        var userRegion = user.region ? user.region.trim() : '';
        var userEmployeeType = user.employeeType ? user.employeeType.trim() : '';
        var userEmployeeType = user.employeeType || '';

        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var filter = `(TestDriveStatus eq '${Constants.ColumnsValues.ACTIVE}' 
and ${Constants.Columns.HAS_REGISTRATION} eq 0) or 
(TestDriveStatus eq '${Constants.ColumnsValues.REGISTRATION_STARTED}' 
and ${Constants.Columns.HAS_REGISTRATION} eq 1)`;
        return new Promise((resolve, reject) => {
            Services.getTestDrivesByFilter(filter, skip, 1000, "TestDriveStartDate", true).then((testDriveInstances: TestDrive[]) => {
                Services.getMyTestDriveIDs(0, 1000).then(mytestDrivs => {
                    if (testDriveInstances && testDriveInstances.length > 0) {
                        var activeTestDriveArr: HomeTestDrive[] = [];
                        var testDrivesIDs = [];
                        testDriveInstances = testDriveInstances.filter((testDriveInstance, index) => {
                            if ($.inArray(testDriveInstance.id, mytestDrivs) == -1) {
                                testDrivesIDs.push(testDriveInstance.id);
                                return true;
                            } else {
                                return false;
                            }
                        });
                        testDriveInstances = testDriveInstances.slice(0, top);
                        Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {
                            testDriveInstances.map((testDrive, index) => {
                                var matchedEmployeeType = testDrive.employeeType && testDrive.employeeType.length ?
                                    testDrive.employeeType.filter((value: any, index) => {
                                        return value.Label === userEmployeeType.trim();
                                    }).length : 1;
                                if ((testDrive.region && testDrive.region.indexOf(userRegion) != -1 || testDrive.region.length == 0) &&
                                    matchedEmployeeType) {
                                    activeTestDriveArr.push({
                                        id: testDrive.id,
                                        title: testDrive.title,
                                        enddate: testDrive.endDate,
                                        participants: parseInt(participants[index]),
                                        testDrive: testDrive
                                    });
                                }
                            });
                            resolve(activeTestDriveArr.slice(0, top));
                        }, err => reject(err))
                    } else {
                        resolve(testDriveInstances);
                    }
                })
            })
        });
    }

    static getUpcomingTestDrives(skip = 0, top = 3) {
        var d = new Date();
        var user = Services.getUserProfileProperties();
        var userRegion = user.region ? user.region.trim() : '';
        var userEmployeeType = user.employeeType ? user.employeeType.trim() : '';
        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var filter = "TestDriveStatus eq '" + Constants.ColumnsValues.READY_FOR_LAUNCH + "'";
        return new Promise((resolve, reject) => {
            Services.getTestDrivesByFilter(filter, skip, 1000, "TestDriveStartDate", true)
                .then((testDriveInstances: TestDrive[]) => {
                    if (testDriveInstances && testDriveInstances.length > 0) {
                        var upcomingTestDriveArr: HomeTestDrive[] = [];
                        let testDrivesIDs = [];
                        testDriveInstances.map((value, index) => {
                            testDrivesIDs.push(testDriveInstances[index].id);
                        });

                        Services.getTestDrivesParticipantCount(testDrivesIDs).then(participants => {

                            testDriveInstances.map((testDrive, index) => {
                                var matchedEmployeeType = testDrive.employeeType && testDrive.employeeType.length ?
                                    testDrive.employeeType.filter((value: any, index) => {
                                        return value.Label === userEmployeeType.trim();
                                    }).length : 1;
                                if ((testDrive.region && testDrive.region.indexOf(userRegion) != -1 || testDrive.region.length == 0) && matchedEmployeeType) {
                                    upcomingTestDriveArr.push({
                                        id: testDrive.id,
                                        title: testDrive.title,
                                        enddate: testDrive.endDate,
                                        participants: parseInt(participants[index]),
                                        testDrive: testDrive
                                    });
                                }
                            });
                            resolve(upcomingTestDriveArr.slice(0, top));
                        }, err => reject(err))
                    } else {
                        resolve(testDriveInstances);
                    }

                })
        });
    }

    static getTestDriveResponsesWithFilter(filter: string, skip: number, top: number) {
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
                    Constants.Columns.USER_ID + '/' + Constants.Columns.ID,
                    Constants.Columns.IS_REGISTRATION_COMPLETE
                )
                .filter(filter)
                .expand(Constants.Columns.TEST_DRIVE_ID, Constants.Columns.USER_ID)
                .skip(skip)
                .top(top)
                .orderBy('Modified', false)
                .get().then(testDriveInstances => {
                    resolve(testDriveInstances);
                }, err => reject(err))
        });
    }

    static getMyTestDrives(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var filter = Constants.Columns.USER_ID + ' eq ' + Services.getCurrentUserID();
            Services.getMyTestDrivesByFilter(filter, skip, top).then(testDrives => {
                resolve(testDrives);
            }, error => {
                reject(error);
            })
        })
    }
    static getMyInProgressTestDrives(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var filter = Constants.Columns.USER_ID + ' eq ' + Services.getCurrentUserID() + ' and ' +
                "( " + Constants.Columns.STATUS + " eq '" + Constants.ColumnsValues.DRAFT + "' or " +
                Constants.Columns.STATUS + " eq '" + Constants.ColumnsValues.PARTIAL_COMPLETE + "')";
            Services.getMyInProgressTestDrivesByFilter(filter, skip, top).then(testDrives => {
                resolve(testDrives);
            }, error => {
                reject(error);
            })
        })
    }
    static getMyCompletedTestDrives(skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            var filter = Constants.Columns.USER_ID + ' eq ' + Services.getCurrentUserID() + ' and ' +
                Constants.Columns.STATUS + " eq '" + Constants.ColumnsValues.COMPLETE_STATUS + "'";
            Services.getMyTestDrivesByFilter(filter, skip, top).then(testDrives => {
                resolve(testDrives);
            }, error => {
                reject(error);
            })
        });
    }

    static getMyInProgressTestDrivesByFilter(filter, skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            Services.getTestDriveResponsesWithFilter(filter, skip, top).then((testDriveInstances: any) => {
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

                            if ((testDrive.status == Constants.ColumnsValues.ACTIVE && testDrive.hasRegistration &&
                                testDriveInstances[Constants.Columns.IS_REGISTRATION_COMPLETE]) ||
                                (testDrive.status == Constants.ColumnsValues.ACTIVE && !testDrive.hasRegistration) ||
                                testDrive.status == Constants.ColumnsValues.REGISTRATION_STARTED ||
                                (testDrive.status == Constants.ColumnsValues.REGISTRATION_ENDED &&
                                    testDriveInstances[Constants.Columns.IS_REGISTRATION_COMPLETE])) {
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
                                        numberOfTestCasesCompleted: testDriveInstances.TestCaseCompleted,
                                        isRegistrationComplete: testDriveInstances[Constants.Columns.IS_REGISTRATION_COMPLETE]
                                    })
                                });
                            }
                        });
                        resolve(myTestDriveArr);
                    }, err => reject(err))
                } else {
                    resolve(testDriveInstances);
                }

            })
        });
    }

    static getMyTestDrivesByFilter(filter, skip = 0, top = 3) {
        return new Promise((resolve, reject) => {
            Services.getTestDriveResponsesWithFilter(filter, skip, top).then((testDriveInstances: any) => {
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
            if (testDrivesID.length) {
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
                            });
                        }),
                        Function.createDelegate(null, function () {
                        }));
                });
            } else {
                resolve(0);
            }
        });
    }

    static getTestDrivesReport(testDrivesID: any[]) {
        return new Promise((resolve, reject) => {
            if (testDrivesID.length) {
                SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                    let resultArr = [];
                    let testDrivesCount = testDrivesID.length;
                    var testDrives = [];
                    var clientContext = new SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var list = web.get_lists().getByTitle(Constants.Lists.TEST_CASE_RESPONSES);

                    var passCamlQuery;
                    var passCasesQuery;
                    var passCases = [];
                    var totalCases = [];
                    var failCases = [];
                    var failCamlQuery;
                    var failCasesQuery;
                    var totalCamlQuery;
                    var totalCasesQuery;

                    $.each(testDrivesID, function (index, testDriveID) {
                        passCamlQuery = new SP.CamlQuery();
                        passCasesQuery = "<View><Query><Where><And><And><Eq><FieldRef Name='TestDriveID' />" +
                            "<Value Type='Lookup'>" + testDriveID +
                            "</Value></Eq><Eq><FieldRef Name='TestCaseResponseStatus' />" +
                            "<Value Type='Choice'>Complete</Value></Eq></And><Eq>" +
                            "<FieldRef Name='SelectedResponse' />" +
                            "<Value Type='Text'>Pass</Value></Eq></And> </Where></Query></View>";
                        passCamlQuery.set_viewXml(passCasesQuery);
                        passCases[index] = list.getItems(passCamlQuery);
                        clientContext.load(passCases[index], 'Include(Id)');

                        failCamlQuery = new SP.CamlQuery();
                        failCasesQuery = "<View><Query><Where><And><And><Eq><FieldRef Name='TestDriveID' />" +
                            "<Value Type='Lookup'>" + testDriveID +
                            "</Value></Eq><Eq><FieldRef Name='TestCaseResponseStatus' />" +
                            "<Value Type='Choice'>Complete</Value></Eq></And><Eq>" +
                            "<FieldRef Name='SelectedResponse' />" +
                            "<Value Type='Text'>Fail</Value></Eq></And> </Where></Query></View>";
                        failCamlQuery.set_viewXml(failCasesQuery);
                        failCases[index] = list.getItems(failCamlQuery);

                        clientContext.load(failCases[index], 'Include(Id)');
                        totalCamlQuery = new SP.CamlQuery();
                        totalCasesQuery = "<View><Query><Where><And><Eq><FieldRef Name='TestDriveID' />" +
                            "<Value Type='Lookup'>" + testDriveID +
                            "</Value></Eq><Eq><FieldRef Name='TestCaseResponseStatus' />" +
                            "<Value Type='Choice'>Complete</Value></Eq></And> </Where></Query></View>";
                        totalCamlQuery.set_viewXml(totalCasesQuery);
                        totalCases[index] = list.getItems(totalCamlQuery);
                        clientContext.load(totalCases[index], 'Include(Id)');
                    });
                    clientContext.executeQueryAsync(
                        Function.createDelegate(null, function () {
                            var testDrives = [];
                            testDrivesID.map((testDrive, index) => {
                                var passCount = passCases[index].get_count();
                                var totalCount = totalCases[index].get_count();
                                var failCount = failCases[index].get_count();
                                testDrives.push({
                                    testDriveID: testDrive,
                                    pass: passCount,
                                    total: totalCount,
                                    fail: failCount,
                                    inProgress: totalCount - (passCount + failCount)
                                });
                            })
                            resolve(testDrives);
                        }),
                        Function.createDelegate(null, function (err) {
                            Utils.clientLog(err);
                        }));
                });
            } else {
                resolve(0);
            }
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
            }).catch(function (err) {
                Utils.clientLog("Error: " + err);
            });
        });
    }

    static getCurrentUserProfileProperty(key) {
        return new Promise((resolve, reject) => {
            pnp.sp.profiles.myProperties.get().then(function (result) {
                var props = result.UserProfileProperties.results;
                props.forEach((prop, index) => {
                    if (prop.Key == key) {
                        resolve(prop.Value);
                    }
                });
            }).catch(function (err) {
                Utils.clientLog("Error: " + err);
            });
        });
    }

    static loadProgressBar(canvasID, value: any = 0.75, size = 60) {
        Utils.loadProgressBar(canvasID, value, size);
    }

    public static loadHorizontalProgressBar(id: string, raised: number, gole: number, width = '200px', height = '50px') {
        $('#' + id).jQMeter({
            goal: '$' + gole,
            raised: '$' + raised,
            meterOrientation: 'horizontal',
            width: width,
            height: height
        });
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

    public static loadProgressBar(canvasID, value, size) {
        var startColor = 'red';
        if (value <= 1 / 3) {
            startColor = 'red';
        } else if (value <= 2 / 3) {
            startColor = '#f8971d';
        } else {
            startColor = 'green';
        }
        var options = {
            value: value,
            size: size,
            startAngle: -Math.PI,
            startColor: startColor,
            endColor: startColor,
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

        var s = options.size, // square size
            v = options.value, // current value: from 0.0 to 1.0
            r = s / 2, // radius
            t = s / 30; // thickness

        // Prepare canvas
        var canvas = $('#' + canvasID)[0];

        canvas.width = s;
        canvas.height = s;
        var ctx = canvas.getContext('2d');
        var lg = ctx.createLinearGradient(0, 0, s, 0);
        lg.addColorStop(0, options.startColor);
        lg.addColorStop(1, options.endColor);
        ctx.fillStyle = "rgba(32, 32, 32, 1)";

        // Draw circle
        if (options.animation)
            _drawAnimated(v);
        else
            _draw(v);


        function _draw(p) {
            // Clear frame
            ctx.clearRect(0, 0, s, s);

            // Draw background circle
            ctx.beginPath();
            ctx.arc(r, r, r, -Math.PI, Math.PI);
            ctx.arc(r, r, r - t, Math.PI, -Math.PI, true);
            ctx.closePath();
            ctx.fill(); // gray fill

            // Draw progress arc
            ctx.beginPath();
            ctx.arc(r, r, r, -Math.PI, -Math.PI + Math.PI * 2 * p);
            ctx.arc(r, r, r - t, -Math.PI + Math.PI * 2 * p, -Math.PI, true);
            ctx.closePath();
            ctx.save();
            ctx.clip();
            ctx.fillStyle = lg;
            ctx.fillRect(0, 0, s, s); // gradient fill
            ctx.restore();
        }

        function _drawAnimated(v) {
            $(canvas).stop(true, true).css({ value: 0 }).animate({ value: v }, $.extend({}, options.animation, {
                step: function (p) {
                    _draw(p);
                    $(canvas).trigger('circle-animation-progress', [p / v, p]);
                },

                complete: function () {
                    $(canvas).trigger('circle-animation-end');
                }
            }));
        }

        // now let's animate numbers
        var valEl: any = $('.value');
        valEl.data('origVal', valEl.text());
        $(canvas).on('circle-animation-progress', function (e, progress) {
            var p: any = valEl.data('origVal') * progress
            valEl.text(parseInt(p))
        });
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

    static loadScript(scriptName, functionName = "") {
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

    static loadTaxonomyScripts() {
        return new Promise((resolve, reject) => {
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                // Register what you need from SharePoint (in this case the term store)
                SP.SOD.registerSod('sp.taxonomy.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'));
                // Load the registered items
                SP.SOD.executeFunc('sp.taxonomy.js', 'SP.Taxonomy.TaxonomySession', () => {
                    resolve(true);
                });
                // Promise.all([
                //     // this.loadScript("sp.runtime.js"),
                //     this.loadScript("sp.taxonomy.js")
                // ]).then(() => {
                //     resolve(true);
                // }, (args) => reject(args));
            });
        });
    }

    /*
        * Returns a termset, based on ID
        *
        * @param {Array} options - options is an array of termSetName,lcid and context.
        */
    static getTermSetsInGroup(options) {
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

    static getTermSet(id) {
        return new Promise((resolve, reject) => {
            try {
                var ctx = SP.ClientContext.get_current();
                var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                var termStore = taxonomySession.getDefaultSiteCollectionTermStore();
                var termSet = termStore.getTermSet(id);
                var terms = termSet.getAllTerms();

                ctx.load(terms);
                ctx.executeQueryAsync(() => {
                    resolve(terms);
                }, (sender, args) => {
                    reject(args);
                });
            } catch (e) {
                Utils.clientLog(e);
            }

        });

    };

    static getTermSetAsTree(id, termSetName) {
        return new Promise((resolve, reject) => {
            TermStore.loadTaxonomyScripts().then(() => {
                TermStore.getTermSet(id).then((terms: any) => {
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

                    tree = TermStore.sortTermsFromTree(tree);
                    resolve(tree);
                });
            });
        });
    };

    static sortTermsFromTree = function (tree) {
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
            return Utils.tryParseJSON(str);
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

