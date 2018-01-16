import Promise from "ts-promise";
import * as constants from './constants';
import pnp from 'sp-pnp-js';
import * as model from '../../test_drive/model';
import { TEST_DRIVES } from "./constants";
import * as $ from 'jquery';


declare var process: { exit(code?: number): void };

pnp.setup({

    sp: {
        headers: {
            "Accept": "application/json;odata=verbose",
        }
    }
});

class Services {
    static getWebTitle() {
        // GET /_api/web
        return new Promise((resolve, reject) => {
            pnp.sp.web.get().then(r => {
                resolve(r);
            });
        });
    }

    static getTestDrives() {
        return new Promise((resolve, reject) => {
            pnp.sp.web.lists.getByTitle(constants.TEST_DRIVES).items
                .select("Title",

                "TestDriveOwner/ID",
                "TestDriveOwner/UserInfoName"
                )
                .expand("TestDriveOwner")
                .filter("TestDriveOwner eq 1").get().then(testDrives => {
                    resolve(testDrives);
                })
        });
    }

    //   DisplayName="Name" Name="TestDriveName" />
    //   DisplayName="Test Drive Status" Name="TestDriveStatus" />
    //   DisplayName="Start Date" Name="TestDriveStartDate" Format="DateOnly" />
    //   DisplayName="End Date" Name="TestDriveEndDate" Format="DateOnly" />
    //   DisplayName="Total Points" Name="TotalPoints" />
    //   DisplayName="Test Drive Department" Required="FALSE" Name="TestDriveDepartment" />
    //   DisplayName="Test Drive Location" Required="FALSE" Name="TestDriveLocation" />
    //   DisplayName="Devices Required" Required="FALSE" Name="AvailableDevices" />
    //   DisplayName="OS Required" Required="FALSE" Name="AvailableOS" />
    //   DisplayName="Max Test Drivers" Name="MaxTestDrivers" />
    //   DisplayName="Details Page" Required="FALSE" Name="DetailsPage" Format="Image" />
    //   DisplayName="Level ID" Name="LevelID" />
    //   DisplayName="TestDriveDepartment Name_0" Hidden="TRUE" Name="TestDriveDepartmentTaxHTField0" />
    //   DisplayName="TestDriveLocation Name_0" Hidden="TRUE" Name="TestDriveLocationTaxHTField0" />
    //   DisplayName="AvailableDevices Name_0" Hidden="TRUE" Name="AvailableDevicesTaxHTField0" />
    //   DisplayName="AvailableOS Name_0" Hidden="TRUE" Name="AvailableOSTaxHTField0" />
    //   DisplayName="Owner" Name="TestDriveOwner" />

    static createTestDrive(testDrive: model.TestDrive) {
        return new Promise((resolve, reject) => {
            var promises = [];

            Promise.all([this.createTestCase(testDrive.testCases),
            this.createQuestions(testDrive.questions)]).then((results) => {
                let list = pnp.sp.web.lists.getByTitle(constants.TEST_DRIVES);
                list.items.add({
                    // TestDriveName: testDrive.title,
                    // TestDriveStatus: testDrive.status,
                    // TestDriveStartDate: testDrive.startDate,
                    // TestDriveEndDate: testDrive.endDate,
                    // TotalPoints: testDrive.maxPoints,
                    // // TestDriveLocation: testDrive.location,
                    // // AvailableOS: testDrive.requiredOs,
                    // MaxTestDrivers: testDrive.maxTestDrivers,
                    TestDriveOwnerId: 1,
                    QuestionIDId: {
                        results: results[1]
                    },
                    TestCaseIdsId: {
                        results: results[0]
                    }


                }).then(result => {
                    resolve(result.data.ID);
                })
            })
        });
    }

    static createTestCase(testCases: model.TestCase[]) {
        return new Promise((resolve, reject) => {
            var promises = [];
            let list = pnp.sp.web.lists.getByTitle(constants.TEST_CASES);

            let batch = pnp.sp.web.createBatch();
            let newTestCases = [];

            testCases.forEach((testCase, index) => {
                promises.push(list.items.add({
                    Title: testCase.title,
                    EliteDescription: testCase.description,
                    TestCaseOutcome: testCase.expectedOutcome,
                    Type: testCase.testCaseType,
                    Scenario: testCase.scenario,
                    TestCasePriority: testCase.priority,
                    Points: testCase.points,
                    ReTest: testCase.reTest
                }));
            })

            Promise.all(promises).then(function (results) {
                results.forEach((result, index) => {
                    newTestCases[index] = result.data.ID;
                })
                resolve(newTestCases);
            });
        });
    }

    static createQuestions(questions: model.Question[]) {
        return new Promise((resolve, reject) => {
            var promises = [];
            let list = pnp.sp.web.lists.getByTitle(constants.SURVEY_QUESTIONS);
            let newQuestions = [];

            questions.forEach((question, index) => {
                promises.push(list.items.add({
                    Question: question.title,
                    Responses: JSON.stringify(question.options),
                    ResponseType: question.questionType
                }));
            })

            Promise.all(promises).then(function (results) {
                results.forEach((result, index) => {
                    newQuestions[index] = result.data.ID;
                })
                resolve(newQuestions);
            });
        });
    }

    static getTearmSet() {
        // get termSet
        return new Promise((resolve, reject) => {
            let termStore = new TermStore();
            termStore.getTermSet({

            }).then(data => {
                resolve(data);
            })
        })

    }


}

class TermStore {

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
                    resolve(scriptName);
                });
            }
            else {
                resolve(scriptName);
            }
        });
    }

    /*
        * Returns a termset, based on ID
        *
        * @param {Array} options - options is an array of termSetName,lcid and context.
        */
    getTermSet(options) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.loadScript("sp.runtime.js"),
                this.loadScript("sp.js"),
                this.loadScript("sp.taxonomy.js")
            ]).then(() => {
                let settings = { termSetName: "Elite Termsets", lcid: "1033", context: SP.ClientContext.get_current() };
                let scriptbase = _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/";
                $.extend(settings, options);
                var taxonomySession,
                    termStores,
                    termStore,
                    termSets,
                    termSet,
                    terms;

                taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(settings.context);
                // Get all term store
                termStores = taxonomySession.get_termStores();
                // Get particular term store by name
                termStore = taxonomySession.getDefaultSiteCollectionTermStore();
                //termSet = termStore.getTermSet(id),
                // Get term set by name and lcid
                termSets = termStore.getTermSetsByName(settings.termSetName, 1033);
                // Get term set by name
                termSet = termSets.getByName(settings.termSetName);
                // Get all terms in a term set
                terms = termSet.getAllTerms();
                settings.context.load(terms);
                settings.context.executeQueryAsync(() => {
                    resolve(terms);
                }, (error) => {
                    reject(error);
                });
            })
        });

    }
}

export default Services;