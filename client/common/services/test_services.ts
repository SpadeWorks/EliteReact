import Services from './data_service';
import { data } from '../../test_drive/api/mockApi';
import * as $ from 'jquery';

const testDrive = {
    id: -1,
    title: "Test Drive 2",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: [],
    location: ["India", "USA"],
    requiredDevices: ["Device1", "Device2"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    status: "Active",
    testCases: [{
        id: -1,
        title: "Test Case 1",
        description: "Test Case Description",
        expectedOutcome: "Test Case expected values.",
        isInEditMode: false,
        testCaseType: "Choice",
        scenario: "Test Case Senario 1",
        priority: "High",
        points: 100,
        reTest: false

    },
    {
        id: -1,
        title: "Test Case 2",
        description: "Test Case Description",
        expectedOutcome: "Test Case expected values.",
        isInEditMode: false,
        testCaseType: "Choice",
        scenario: "Test Case Senario 1",
        priority: "High",
        points: 100,
        reTest: false

    },
    {
        id: -1,
        title: "Test Case 3",
        description: "Test Case Description",
        expectedOutcome: "Test Case expected values.",
        isInEditMode: false,
        testCaseType: "Choice",
        scenario: "Test Case Senario 1",
        priority: "High",
        points: 100,
        reTest: false

    }
    ],
    questions: [
        {
            id: -1,
            title: "Question1",
            questionType: "choice",
            options: ["test", "beset"],
            isInEditMode: false
        }, {
            id: 48,
            title: "Question2",
            questionType: "choice",
            options: ["test", "beset"],
            isInEditMode: false
        },
        {
            id: 49,
            title: "Comments2",
            questionType: "comments",
            options: [],
            isInEditMode: false
        }]
}


class TestServices {
    static main() {
        // Services.getWebTitle().then(data => {
        //     console.log("testing get web: ", data);
        // });

        // Services.getTestDrives().then(data => {
        //     console.log("get test Drives: ", data);
        // });

        Services.createTestDrive(testDrive).then(data => {
            console.log("create test case: ", data);
        });

        // Services.createQuestions(testDrive.questions).then(data => {
        //     console.log("create test case: ", data);
        // })
        // console.log("testing get testdrives: ", Services.getTestDrives());

        // Services.getAllTermsInTermGroup().then(data=>{
        //     console.log("Term sets: ", data);
        // })

        // Services.updateReferralList([
        //     { email: 'askext@gmail.com' }, 
        //     { email: 'akash@equinix.com'}
        // ], 1).then((data)=>{
        //     console.log(data);
        // })

        // Services.creatListItemsInBatch('Referral', [
        //     { ReferentEmail: 'askext@gmail.com' }, 
        //     { ReferentEmail: 'akash@equinix.com'}
        // ]).then((data)=>{
        //     console.log(data);
        // });

        // Services.createTestCase(data[0].testCases).then(data=>{
        //     console.log("From createTestCase: ", data);
        // })
    }

}

$(function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        TestServices.main();
    });
});

export default TestServices;