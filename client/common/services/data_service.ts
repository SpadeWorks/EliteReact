import Promise from "ts-promise";
import * as Constants from './constants';
import pnp from 'sp-pnp-js';
import { TestDrive, Question, TestCase } from '../../test_drive/model';
import * as $ from 'jquery';
import * as moment from 'moment';

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
                            testCasesIds: testCases,
                            questionsIds: questions,
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

    // static getTestDriveById(testDriveID: number) {
    //     return new Promise((resolve, reject) => {
    //         if (testDriveID == -1) {
    //             resolve({
    //                 id: -1,
    //                 title: "",
    //                 description: "",
    //                 maxPoints: 0,
    //                 startDate: "",
    //                 endDate: "",
    //                 expectedBusinessValue: "",
    //                 function: [],
    //                 location: [],
    //                 requiredDevices: [],
    //                 requiredOs: [],
    //                 maxTestDrivers: 0,
    //                 testCases: [],
    //                 questions: []
    //             });
    //         }
    //         pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_DRIVES).items.getById(testDriveID)
    //             .select(
    //             'ID',
    //             'TestDriveName',
    //             'EliteDescription',
    //             'TestDriveStatus',
    //             'TestDriveStartDate',
    //             'TestDriveEndDate',
    //             'TotalPoints',
    //             'TestDriveDepartment',
    //             'TestDriveLocation',
    //             // 'TestDriveFunction',
    //             'AvailableDevices',
    //             'AvailableOS',
    //             'MaxTestDrivers',
    //             'LevelID/ID',
    //             'LevelID/LevelName',
    //             'TestDriveOwner/ID',
    //             'TestDriveOwner/UserInfoName',
    //             'TestCases/ID',
    //             'Questions/ID',
    //         )
    //             .expand('TestDriveOwner', 'LevelID', 'Questions', 'TestCases')
    //             .get().then(testDrive => {
    //                 let questions = testDrive.Questions.results.map((question) => {
    //                     return question.ID;
    //                 })
    //                 let testCases = testDrive.TestCases.results.map((testCase) => {
    //                     return testCase.ID;
    //                 })

    //                 Promise.all([this.getQuestonsByIds(questions),
    //                 this.getTestCasesByIds(testCases)]).then((results: any[][]) => {
    //                     let testCase: TestCase;
    //                     let testCases: TestCase[];
    //                     let question: Question;
    //                     let questions: Question[];
    //                     let testDriveObj: TestDrive;


    //                     questions = results[0].map((result) => {
    //                         return question = {
    //                             id: result.ID,
    //                             title: result.Question,
    //                             questionType: result.QuestionType,
    //                             options: result.Responses
    //                         }

    //                     });

    //                     testCases = results[1].map((result) => {
    //                         return testCase = {
    //                             id: result.ID,
    //                             title: result.Title,
    //                             description: result.EliteDescription,
    //                             expectedOutcome: result.TestCaseOutcome,
    //                             points: result.Points,
    //                             priority: result.TestCasePriority,
    //                             reTest: result.ReTest,
    //                             testCaseType: result.Type,
    //                             scenario: result.EliteDescription
    //                         }
    //                     });

    //                     testDriveObj = {
    //                         title: testDrive.TestDriveName,
    //                         description: testDrive.EliteDescription,
    //                         status: testDrive.TestDriveStatus,
    //                         startDate: testDrive.TestDriveStartDate,
    //                         endDate: testDrive.TestDriveEndDate,
    //                         maxPoints: testDrive.TotalPoints,
    //                         department: testDrive.TestDriveDepartment.results,
    //                         function: [], //testDrive.TestDriveFunction.results,
    //                         location: testDrive.TestDriveLocation.results,
    //                         requiredDevices: testDrive.AvailableDevices.results,
    //                         requiredOs: testDrive.AvailableOS.results,
    //                         maxTestDrivers: testDrive.MaxTestDrivers,
    //                         id: testDrive.ID,
    //                         level: testDrive.LevelID.LevelName,
    //                         owner: testDrive.TestDriveOwner.UserInfoName,
    //                         testCases: testCases,
    //                         questions: questions,
    //                         expectedBusinessValue: ''
    //                     };
    //                     resolve(testDriveObj);
    //                 })


    //             }, error => {
    //                 reject(error);
    //             });
    //     });
    // }

    static getTestDriveById(testDriveID: number) {
        return new Promise((resolve, reject) => {
            if (testDriveID == -1) {
                resolve({
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
                    testCases: [],
                    questions: []
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
                        level: testDrive.LevelID.LevelName,
                        owner: testDrive.TestDriveOwner.UserInfoName,
                        testCases: null,
                        questions: null,
                        testCaseIDs: testCases,
                        questionIDs: questions,
                        expectedBusinessValue: ''
                    };
                    resolve(testDriveObj);

                }, error => {
                    reject(error);
                });
        });
    }

    static getTestCasesByIds(testCaseIds: number[]) {
        let filter = '';
        testCaseIds.map((id, index) => {
            filter += 'ID eq ' + id + (testCaseIds.length - 1 != index ? ' or ' : '');
        })
        return new Promise((resolve, reject) => {
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
                    resolve(testCases);
                }, error => {
                    reject(error);
                });
        });
    }

    static getQuestonsByIds(questionIds: number[]) {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(Constants.Lists.SURVEY_QUESTIONS).items
                .select('Title',
                'ID',
                'Question',
                'Responses',
                'Title',
            )
                .filter("ID eq 48 or ID eq 49 or ID eq 50")
                .get().then(questions => {
                    resolve(questions);
                }, error => {
                    reject(error);
                });
        });
    }

    static createOrSaveTestDrive(testDrive: TestDrive) {
        return new Promise((resolve, reject) => {
            var promises = [];
            Promise.all([this.createTestCase(testDrive.testCases),
            this.createQuestions(testDrive.questions)]).then((results) => {
                this.createOrUpdateListItemsInBatch(Constants.Lists.TEST_DRIVES,
                    [{
                        ID: testDrive.id,
                        Title: 'Test item',
                        // TestDriveLocation_tax: [{
                        //     id: "256f4668-fefd-410a-b8fd-405a78de3f73",
                        //     name: "Location1"
                        // }, {
                        //     id: "9612ad4e-4001-4024-a42f-3006e9e5348c",
                        //     name: "Location2"
                        // }],

                        TestDriveName: testDrive.title,
                        TestDriveStatus: testDrive.status,
                        TestDriveStartDate: testDrive.startDate,
                        TestDriveEndDate: testDrive.endDate,
                        TotalPoints: testDrive.maxPoints,
                        MaxTestDrivers: testDrive.maxTestDrivers,
                        TestDriveOwner_id: 1,
                        LevelID_id: 1,
                        Questions_id: {
                            results: results[1]
                        },
                        TestCases_id: {
                            results: results[0]
                        }
                    }]).then(data => {
                        resolve({ ...testDrive, id: data[0] });
                    }, err => {
                        reject(err);
                    });
            });
        });
    }

    static createTestCase(testCases: TestCase[]) {
        return new Promise((resolve, reject) => {
            var testCasesArray = [];
            testCases.forEach((testCase, index) => {
                testCasesArray.push({
                    ID: testCase.id,
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
            });
        });
    }

    static createQuestions(questions: Question[]) {
        return new Promise((resolve, reject) => {
            var questionsArray = [];
            questions.forEach((question, index) => {
                questionsArray.push({
                    ID: question.id,
                    Question: question.title,
                    Responses: JSON.stringify(question.options),
                    ResponseType: question.questionType
                });
            });
            this.createOrUpdateListItemsInBatch(Constants.Lists.SURVEY_QUESTIONS, questionsArray).then((data) => {
                resolve(data);
            })
        });
    }

    static createOrUpdateListItemsInBatch(listName: string, items: any[]) {
        return new Promise((resolve, reject) => {
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
                                termsArray.push("-1;#" + item.name + "|" + item.id);
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
                listItems.forEach(element => {
                    results.push(element.get_id());
                });
                resolve(results);
            }, (sender, args) => {
                reject(new Error(args.get_message()));
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
        });
    }
}

export class Utils {
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

export default Services;