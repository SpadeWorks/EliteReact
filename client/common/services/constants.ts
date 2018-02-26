import { STATUS_CODES } from "http";

export class Lists {
    static TEST_DRIVES = 'Test Drives';
    static TEST_CASES = 'Test Cases';
    static SURVEY_QUESTIONS = 'Survey Questions';
    static RACE_LEVELS = 'Race Levels';
    static POINTS_CONFIGURATIONS = 'Points Configurations'
    static USER_INFORMATION = 'User Information';
    static TEST_DRIVE_INSTANCES = 'Test Drive Instances';
    static POINTS = 'Points';
    static AVATAR = 'Avatars';
    static CARMASTER = 'Car Master';
    static BADGES = 'Badges';
    static APPLICATION_CONFIGURATIONS = "Application Configuration";
    static TEST_CASE_RESPONSES = "Test Case Responses";
    static SURVEY_RESPONSES = "Survey Responses";
    static VIDEOS = "Videos";
}

export class CacheKeys {
    static CONFIGURATIONS = 'configurations';
    static ELITE_PROFILE = 'ELITE_PROFILE';
    static APPLICATION_CONFIGURATIONS = 'APPLICATION_CONFIGURATIONS';

}

export class Columns {
    static TITLE = 'Title';
    static USER_REGION = 'UserRegion';
    static USER_REGION_TEXT = 'UserRegionText';
    static ID = 'ID';
    static TEST_DRIVE_NAME = 'TestDriveName';
    static ELITE_DESCRIPTION = 'EliteDescription';
    static TESTDRIVE_STATUS = 'TestDriveStatus';
    static TEST_DRIVE_START_DATE = 'TestDriveStartDate';
    static TESTDRIVE_END_DATE = 'TestDriveEndDate';
    static TOTAL_POINTS = 'TotalPoints';
    static TEST_DRIVE_DEPARTMENT = 'TestDriveDepartment';
    static TEST_DRIVE_LOCATION = 'TestDriveLocation';
    static AVAILABLE_DEVICES = 'AvailableDevices';
    static AVAILABLE_OS = 'AvailableOS';
    static MAX_TESTDRIVERS = 'MaxTestDrivers';
    static LEVEL_ID = 'LevelID';
    static LEVEL_NAME = 'LevelName';
    static TESTDRIVE_OWNER = 'TestDriveOwner';
    static USER_NAME = 'UserInfoName';
    static TESTCASE_ID = 'TestCaseID';
    static QUESTION_ID = 'QuestionID';
    static EXPECTED_BUSINESS_VALUE = 'ExpectedBusinessValue';
    static CAR_IMAGE = 'CarImage';
    static CAR_NAME = 'CarName';
    static CAR_LEVEL = 'CarLevel';
    static Car_ID = 'CarID';
    static AVATAR_IMAGE = 'AvatarImage';
    static AVATAR_NAME = 'AvatarName';
    static COMPLETED_TEST_DRIVES = 'CompletedTestDrives';
    static COMPLETED_TEST_CASES = 'CompletedTestCases';
    static DATE_JOINED = 'DateJoined';
    static USER_ROLE = 'UserRole';
    static POINTS = 'Points';
    static TYPE = 'Type';
    static SCENARIO = 'Scenario';
    static TEST_CASE_OUTCOME = 'TestCaseOutcome';
    static TEST_CASE_PRIORITY = 'TestCasePriority';
    static RETEST = 'ReTest';
    static QUESTION = 'Question';
    static RESPONSES = 'Responses';
    static RESPONSETYPE = 'ResponseType';
    static USER_ID = 'UserID';
    static USER_LOCATION = 'UserLocation';
    static PERCENTAGE_COMPLETION = "PercentageCompletion";
    static CURRENT_POINTS = "CurrentPoints";
    static STATUS = "Status";
    static TEST_CASE_COMPLETED = "TestCaseCompleted";
    static TEST_DRIVE_ID = "TestDriveID";
    static TEST_CASE_RESPONSE = "TestCaseResponse";
    static TEST_CASE_RESPONSE_STATUS = "TestCaseResponseStatus";
    static SURVEY_RESPONSE = "SurveyResponse";
    static Selected_Response = "SelectedResponse";
    static USER_INFO_NAME = "UserInfoName"
    static ACCOUNT_NAME = "AccountName";
    static RESPONSE_ATTACHMENTS = "ResponseAttachments";
    static LevelNumber = "LevelNumber";

}

export class ColumnsValues {
    static COMPLETE_STATUS = 'Complete';
    static ACTIVE = 'Active';
    static READY_FOR_LAUNCH = 'Ready for Launch';
    static DRAFT = "Draft";
    static INPROGRESS = "Inprogress";
    static SUBMIT = "Submit";
    static TEST_CASE_COMPLETION = 'Test Case Bonus';
    static QUESTION_TYPE_OBJECTIVE = "Objective";
    static SITE_OWNER = "Elite Site Owner"
    static TEST_DRIVER = "Elite Test Drives";
    static TEST_DRIVE_OWNER = "Elite Test Drive Owner";
    static SITE_OWNER_DISPLAY_NAME = "Site Owner"
    static TEST_DRIVER_DISPLAY_NAME = "Test Driver";
    static TEST_DRIVE_OWNER_DISPLAY_NAME = "Test Drive Owner";

}

export class Globals {
    static IMAGE_BASE_URL = _spPageContextInfo.siteAbsoluteUrl + '/Style%20Library/Elite/images/';
    static TEST_DRIVE_THAT_I_RUN = "testDriveThatIRun";
    static UPCOMMING_Test_Drive = "upTestDrive";
}

export class Messages {
    static SAVE_UNSAVED_QUESTION = 'Please save the unsaved question and then try saving test drive again.';
    static SAVE_UNSAVED_TEST_CASE = 'Please save the unsaved test case and then try saving test drive again.';
    static TEST_CASE_ERROR = 'There are some errors in the form. Please correct them and Save again.';
    static TEST_DRIVE_ERROR = 'There are some errors in the form. Please correct them and Save again.';
    static QUESTION_ERROR = 'There are some errors in the form. Please correct them and Save again.';
    static LOADING_QUESTIONS = 'Loading questions...';
    static LOADING_TSETCASES = 'Loading test cases...';
    static LOADING_TESTDRIVE = 'Loading test drive...';
    static SAVING_TESTCASE = 'Saving test case...';
    static Saving_question = 'Saving questions...';
    static SAVING = 'Saving...';
    static LOADING = 'Loading...';
    static ERROR_IN_FORM = 'Please fill all the required fields and save again. Fields marked with * are mandetory.';
    static TEST_DRIVE_LOCATION_ERROR = 'This test drive is not available for your location.';
    static TEST_DRIVE_DEVICE_ERROR = 'You don\'t have the required device to participate in this test drive.';
    static TEST_DRIVE_OS_ERROR = 'You don\'t have the required os to participate in this test drive.';
    static NO_TEST_CASE_ERROR = 'Please add atleast one test case before submiting for approval.';
    static NO_QUESTION_ERROR = 'Please add atleast one question before submiting for approval.';
    static NO_OPTIONS_ERROR = 'Please add more that one question responses';
    static SURVEY_SUBMITTED = 'Survey submitted sucessfully.';
}
