import { Services, Utils, TermStore } from './data_service';
import * as $ from 'jquery';
import pnp, { config } from 'sp-pnp-js';
import * as Constants from './constants';

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

        // Services.createTestDrive(testDrive).then(data => {
        //     console.log("create test case: ", data);
        // });

        // Services.getTestDriveById(17).then(data =>{
        //     console.log("test drive with id 17: ", data);
        // })

        // Services.getTestCasesByIds([107, 108, 109, 110, 111, 112, 113, 114, 115, 116]).then(data =>{
        //     console.log("get test cases for test drive with id 17: ", data);
        // })
        // Services.getQuestonsByIds([48, 49, 50, 51, 52]).then(data =>{
        //     console.log("get question for test drive with id 17: ", data);
        // })

        // Services.getFieldMetadata(Constants.Lists.TEST_DRIVES, [
        //     'ID',
        //     'TestDriveName',
        //     'EliteDescription',
        //     'TestDriveStatus',
        //     'TestDriveStartDate',
        //     'TestDriveEndDate',
        //     'TotalPoints',
        //     'TestDriveDepartment',
        //     'TestDriveLocation',
        //     'AvailableDevices',
        //     'AvailableOS',
        //     'MaxTestDrivers',
        //     'LevelID/ID',
        //     'LevelID/LevelName',
        //     'TestDriveOwner/ID',
        //     'TestDriveOwner/UserInfoName',
        //     'TestCases/ID',
        //     'Questions/ID',
        //     'ExpectedBusinessValue'
        // ]).then(fields => {
        //     console.log(fields);
        // })
        // Services.getFieldMetadata(Constants.Lists.TEST_CASES, [
        //     'Title',
        //     'ID',
        //     'EliteDescription',
        //     'Type',
        //     'Scenario',
        //     'TestCaseOutcome',
        //     'TestCasePriority',
        //     'Points',
        //     'ReTest'
        // ]).then(fields => {
        //     console.log(fields);
        // })
        // Services.getFieldMetadata(Constants.Lists.TEST_CASES, [
        //     'Title',
        //             'ID',
        //             'Question',
        //             'Responses',
        //             'ResponseType',
        // ]).then(fields => {
        //     console.log(fields);
        // })

        // Services.getConfigurations().then(data => {
        //     console.log(data);
        // });



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


        // let data = Services.getUserProfileProperties();
        // console.log(data);
        // Services.getGlobalLeaders(0,5);
        // Services.getGlobalLeaders(5,5);
        // Services.getGlobalLeaders(10,5);
        // Services.getGlobalLeaders(15,5);

        // Services.getRegionalLeaders("Asia Pacific");

        // Services.getRegions();
        // Services.getLocations();
        // Services.getDevices();
        // Services.getOSes();

        // const  item = pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).items.getById(87);
        // Services.getAttachments(item);
        // Services.deletAttachments(item, ['Jellyfish.jpg']).then(t=>{
        //     Services.getAttachments(item);
        // })


        // Services.getTestDrivesWaitingForApproval().then(t=>{
        //     console.log("getTestDrivesWaitingForApproval", t);
        // })
        // Services.getApprovedTestDrives().then(t=>{
        //     console.log("getApprovedTestDrives", t);
        // })
        Services.approveTestdrive(3).then(t=>{
            console.log("approveTestdrive", t);
        })
        Services.getApplicationConfigurations().then(t=>{
            console.log("getApplicationConfigurations", t);
        })
        Services.getTestDrivesByOwerneID(18).then(t=>{
            console.log("getTestDrivesByOwerneID", t);
        })
        Services.getDraftedTestDrivesIRun(18).then(t=>{
            console.log("getDraftedTestDrivesIRun", t);
        })
        Services.getSubmitedTestDrivesIRun(18).then(t=>{
            console.log("getSubmitedTestDrivesIRun",t);
        })

        Services.getInProgressTestDrivesIRun(18).then(t=>{
            console.log("getInProgressTestDrivesIRun", t);
        })
        Services.getCompletedTestDriveIRun(18).then(t=>{
            console.log("getCompletedTestDriveIRun", t);
        })
        Services.getUpCommingTestDriveIRun(18).then(t=>{
            console.log("getUpCommingTestDriveIRun",t);
        })
        Services.getUpcomingTestDrives().then(t=>{
            console.log("getUpcomingTestDrives",t);
        })
        Services.getActiveTestDrives().then(t=>{
            console.log("getActiveTestDrives",t);
        })
    }

}

$(function () {
    // SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        TestServices.main();
        // $("#DeltaPlaceHolderMain").after("<input type='button' value='Add' id='add'>");
        // $('#add').bind('click', function () {
        //     if ($("#file").length > 0) {
        //         const  item = pnp.sp.web.lists.getByTitle(Constants.Lists.TEST_CASE_RESPONSES).items.getById(87);
        //         let input = <HTMLInputElement>document.getElementById("file");
        //         Services.setAttachmentByItemID(item, input.files).then(files =>{
        //             console.log(files);
        //             Services.getAttachments(item);
        //         })
                
        //     } else {
        //         var addControl = '<label>Upload Text File:</label>';
        //         addControl += ' <input type="file" name = "file[]" class="imageupload" id="file" multiple="multiple"> ';
        //         addControl += '<input type="button" value="upload" id="upload">';
        //         $('#add').before(addControl);
        //     }
        // });
    // });
});

export default TestServices;