import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui';
import Loader from 'react-loader-advanced';
import TestDriveForm from './TestDriveForm';
import TestCases from './TestCases';
import TabCar from './TabCar';
import Services from '../../common/services/services';
import Surveys from './Surveys';
import { Link } from "react-router-dom";
import { validateControl, required, validateForm } from '../../common/components/Validations';
import { Messages } from '../../common/services/constants';
import { Globals } from '../../common/services/constants';
import { ToastContainer, toast } from 'react-toastify';
import { ColumnsValues } from '../../common/services/constants';
import { Tabs, Pane } from '../../common/components/Tabs';
import * as $ from 'jquery';
import Popup from '../../common/components/Popups';
import {
    model,
    saveTestDrive,
    submitTestDrive,
    updateTestDrive,
    saveTestCase,
    editTestCase,
    deleteTestCase,
    updateTestCase,
    switchTab,
    updateMultiSelect,
    updateDate,
    addTestCase,
    loadTestDrive,
    saveQuestion,
    editQuestion,
    deleteQuestion,
    addQuestion,
    updateQuestion,
    loadQuestions,
    saveRegistrationQuestion,
    editRegistrationQuestion,
    deleteRegistrationQuestion,
    addRegistrationQuestion,
    updateRegistrationQuestion,
    loadRegistrationQuestions,
    loadTestDrives,
    loadTestCases,
    loadConfigurations,
    updateMaxPoints
} from '../../test_drive';
import Registration from './Registration';
import { TestDrive, TestCase, RegistrationQuestion, Question } from '../model';
import { CurrentUser } from 'sp-pnp-js/lib/sharepoint/siteusers';

interface AppProps {
    id: number,
    testDrive: model.TestDrive;
    testDrives: model.TestDrive[];
    testCase: model.TestCase;
    loading: boolean;
    updateUI: (any) => any;
    ui: any;
    dispatch: any;
    questions: model.Question[];
    registrationQuestion?: model.RegistrationQuestion;
    registrationQuestions?: model.RegistrationQuestion[];
    question: model.Question;
    configurationLoaded: boolean;
    testCaseFields: object;
    surveyFields: object;
    testDriveFields: object;
    view: string;
    registration: boolean;
    waitingMessage: string;
};

@ui({
    state: {
        activeTab: 0,
        requirmentMessage: '',
        title: "",
        saveLoading: false,
        saveTestDriveApprovalLoading: false,
        loadingMessage: 'Loading...',
        deletedItem: null,
        deletedItemType: null
    }
})

class ManageTestDrive extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
        this.switchTab = this.switchTab.bind(this);
        this.onTestDriveSave = this.onTestDriveSave.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onSaveQuestion = this.onSaveQuestion.bind(this);
        this.onAddRegistrationQuestion = this.onAddRegistrationQuestion.bind(this);
        this.onSaveRegistrationQuestion = this.onSaveRegistrationQuestion.bind(this);
        this.onAddTestCase = this.onAddTestCase.bind(this);
        this.onSaveTestCase = this.onSaveTestCase.bind(this);
        this.checkForUnsavedItems = this.checkForUnsavedItems.bind(this);
        this.getSelectedTab = this.getSelectedTab.bind(this);
        this.approveTestDrive = this.approveTestDrive.bind(this);
        this.onSwitchTab = this.onSwitchTab.bind(this);
        this.isTestDriveInEditMode = this.isTestDriveInEditMode.bind(this);
        this.deleteConfirmationRequired = this.deleteConfirmationRequired.bind(this);
        this.deleteConfirmed = this.deleteConfirmed.bind(this);
    }

    getTestDriveById(testDrives, testDriveId) {
        const testDrive = testDrives.filter(testDrive => testDrive.id == testDriveId);
        if (testDrive) return testDrive[0]; //since filter returns an array, have to grab the first.
        return null;
    }

    switchTab(key) {
        var tabIndex = $("[data-label='" + key + "']").attr("data-index");
        this.props.updateUI({ activeTab: tabIndex });
    }

    onSwitchTab(direction: number, formID: string, testDrive: TestDrive) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            if ($('.nav.nav-tabs li[data-index=' + (this.props.ui.activeTab + direction) + ']').length) {
                this.props.updateUI({ activeTab: (this.props.ui.activeTab + direction) });
            } else {
                this.props.updateUI({ activeTab: (this.props.ui.activeTab + direction + direction) });
            }

            testDrive.hasRegistration = this.props.registration || false;
            this.props.updateUI({ loadingMessage: 'Saving...', saveLoading: true });
            this.props.dispatch(saveTestDrive(testDrive)).then(() => {
                this.props.updateUI({ loadingMessage: 'Loading...', saveLoading: false });
            });

        } else {
            //Popup.alert(Messages.TEST_DRIVE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_ERROR, title: "Alert!" });
            $("#popupCreateTestDriveAlert").trigger('click');
        }
    }

    componentDidMount() {
        var self = this;
        if (!this.props.configurationLoaded) {
            this.props.dispatch(loadConfigurations());
        }
        this.props.dispatch(loadTestDrive(this.props.id || -1));

        $('.nav.nav-tabs li').click(function () {
            var selectedIndex = $(this).attr('data-index');
            try {

                selectedIndex = parseInt(selectedIndex)
            } catch (err) {
                selectedIndex = 0;
            }
            self.props.updateUI({ activeTab: selectedIndex });
        });
        /** Call the plugin */
    }

    onTestDriveSave(testDrive: TestDrive, formID, action) {
        var isFormValid = validateForm(formID);
        var testCases = this.props.testDrive.testCases;
        var questions = this.props.testDrive.questions;
        var maxTestDrivers = parseInt(testDrive.maxTestDrivers.toString()) || 0;
        this.props.updateUI({ saveLoading: true });

        testDrive.hasRegistration = this.props.registration || false;
        if (isFormValid) {
            if (testCases && testCases.length &&
                this.checkForUnsavedItems(testCases, Messages.SAVE_UNSAVED_TEST_CASE)) {
                this.switchTab("TEST CASES");
                this.props.updateUI({ saveLoading: false });
                return false;
            }
            if (questions && questions.length &&
                this.checkForUnsavedItems(questions, Messages.SAVE_UNSAVED_QUESTION)) {
                this.switchTab("SURVEY QUESTIONS");
                this.props.updateUI({ saveLoading: false });
                return false;
            }

            if (action == "submit" && testCases && testCases.length == 0) {
                //Popup.alert(Messages.NO_TEST_CASE_ERROR);            
                this.props.updateUI({ requirmentMessage: Messages.NO_TEST_CASE_ERROR, title: "Alert!", saveLoading: false });
                $("#popupManageTestDriveAlert").trigger('click');
                return false;
            }

            if (action == "submit" && questions && questions.length == 0) {
                //Popup.alert(Messages.NO_QUESTION_ERROR);
                this.props.updateUI({ requirmentMessage: Messages.NO_QUESTION_ERROR, title: "Alert!", saveLoading: false });
                $("#popupManageTestDriveAlert").trigger('click');
                return false;
            }
            //this.props.updateUI({ saveIsInProgress: true });
            Services.getTestDrivesByFilter("TestDriveName eq '" + testDrive.title.trim() + "' and ID ne '" + testDrive.id + "'")
                .then((testDriveData: any) => {
                    if (testDriveData && testDriveData.length > 0) {
                        //Popup.alert(Messages.TEST_DRIVE_SAME_NAME_ERROR)
                        this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SAME_NAME_ERROR, title: "Alert!" });
                        $("#popupCreateTestDriveAlert").trigger('click');
                    }
                    else {
                        if (action == "save") {
                            var self = this;
                            testDrive.changeStatus = ColumnsValues.CHANGE_DRAFTED;
                            this.props.dispatch(saveTestDrive(testDrive)).then(() => {
                                // toast.success(Messages.TEST_DRIVE_SAVEDDRAFT_MSG);
                                this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SAVEDDRAFT_MSG, title: "Success!" });
                                $("#popupManageTestDriveSuccessSaveAsDraft").trigger('click');
                                this.props.updateUI({ saveLoading: false });
                            });
                        } else if (action == "approve") {
                            if (testDrive.status === ColumnsValues.SUBMIT) {
                                testDrive.status = ColumnsValues.READY_FOR_LAUNCH;
                            }
                            if (testDrive.changeStatus === ColumnsValues.CHANGE_SUBMITTED) {
                                testDrive.changeStatus = ColumnsValues.CHANGE_APPROVED;
                                // testDrive.approvalStatus = ColumnsValues.APPROVED;
                            }

                            this.props.dispatch(saveTestDrive(testDrive)).then(() => {
                                this.props.updateUI({
                                    requirmentMessage: Messages.TEST_DRIVE_APPROVE_MSG,
                                    title: "Success!",
                                    saveLoading: false
                                });
                                $("#popupApprovalSuccess").trigger('click');
                                this.props.updateUI({ saveLoading: false });
                            });
                        }
                        else {
                            if (testDrive.status === ColumnsValues.DRAFT || testDrive.status == '') {
                                testDrive.status = ColumnsValues.SUBMIT;
                            }
                            testDrive.changeStatus = ColumnsValues.CHANGE_SUBMITTED;
                            this.props.dispatch(saveTestDrive(testDrive)).then(() => {
                                //Popup.plugins().prompt('', 'What do you want to do?', Messages.TEST_DRIVE_SUBMIT_MSG);
                                this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SUBMIT_MSG, title: "Success!" });
                                $("#popupManageTestDriveSuccess").trigger('click');
                                // toast.success(Messages.TEST_DRIVE_SUBMIT_MSG);
                                this.props.updateUI({ saveLoading: false });
                            });
                        }

                    }
                });

        }
        else {
            this.switchTab("REGISTER A TEST DRIVE");
            //Popup.alert(Messages.TEST_DRIVE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_ERROR, title: "Alert!", saveLoading: false });
            $("#popupManageTestDriveAlert").trigger('click');
        }
    }

    onSaveQuestion(question, formID) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            if (question.questionType == "Objective" && question.options.length < 2) {
                //Popup.alert(Messages.NO_OPTIONS_ERROR);
                this.props.updateUI({ requirmentMessage: Messages.NO_OPTIONS_ERROR, title: "Alert!" });
                $("#popupManageTestDriveAlert").trigger('click');
            } else {
                if (this.isTestDriveInEditMode()) {
                    if (!question.newItem) {
                        Services.getQuestionsByIds([question.id]).then((oldQuestion: TestCase[]) => {
                            if (!this.compareQuestions(oldQuestion[0], question)) {
                                question.isEdited = true;
                                question.editStatus = ColumnsValues.EDIT_STATUS_EDITED;
                                this.props.dispatch(saveQuestion(question));
                                toast.success("Test Case Saved Successfully!");
                            } else {
                                this.props.dispatch(saveQuestion(question));
                                toast.success("Test Case Saved Successfully!");
                            }
                        })
                    } else {
                        question.isEdited = false;
                        question.editStatus = ColumnsValues.EDIT_STATUS_NEW;
                        this.props.dispatch(saveQuestion(question));
                        toast.success("Question Saved Successfully!");
                    }
                } else {
                    this.props.dispatch(saveQuestion(question));
                    toast.success("Question Saved Successfully!");
                }
            }
        } else {
            //Popup.alert(Messages.QUESTION_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.QUESTION_ERROR, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
        }
    }

    onSaveRegistrationQuestion(question, formID) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            if ((question.questionType === "SingleSelect" ||
                question.questionType === "MultiSelect") && question.options.length < 2) {
                //Popup.alert(Messages.NO_OPTIONS_ERROR);
                this.props.updateUI({ requirmentMessage: Messages.NO_OPTIONS_ERROR, title: "Alert!" });
                $("#popupManageTestDriveAlert").trigger('click');
            } else {
                if (this.isTestDriveInEditMode()) {
                    if (!question.newItem) {
                        Services.getRegistrationQuestonsByIds([question.id]).then((oldQuestion: TestCase[]) => {
                            if (!this.compareQuestions(oldQuestion[0], question)) {
                                question.isEdited = true;
                                question.editStatus = ColumnsValues.EDIT_STATUS_EDITED;
                                this.props.dispatch(saveRegistrationQuestion(question));
                                toast.success("Test Case Saved Successfully!");
                            } else {
                                this.props.dispatch(saveRegistrationQuestion(question));
                                toast.success("Test Case Saved Successfully!");
                            }
                        })
                    } else {
                        question.isEdited = false;
                        question.editStatus = ColumnsValues.EDIT_STATUS_NEW;
                        this.props.dispatch(saveRegistrationQuestion(question));
                        toast.success("Question Saved Successfully!");
                    }

                } else {
                    this.props.dispatch(saveRegistrationQuestion(question));
                    toast.success("Question Saved Successfully!");
                }
            }
        } else {
            //Popup.alert(Messages.QUESTION_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.QUESTION_ERROR, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
        }
    }


    compareQuestions(oldQuestion, newQuestion) {
        return oldQuestion.title === newQuestion.title &&
            oldQuestion.questionType === newQuestion.questionType &&
            JSON.stringify(oldQuestion.options) == JSON.stringify(newQuestion.options)
    }

    onSaveTestCase(testCase: model.TestCase, formID) {
        var isFormValid = validateForm(formID);
        var editorEmpty = false;
        if (!$(testCase.scenario).text().replace(/[\n\r]+/g, '').trim() && !this.haveImage(testCase.scenario)) {
            $('#scenario-validation').remove();
            $("#scenario .rdw-editor-wrapper").after('<div class="error-container" id="scenario-validation"><span class="error-lable">This field is required</spand></div>');
            editorEmpty = true;
        }

        if (!$(testCase.expectedOutcome).text().replace(/[\n\r]+/g, '').trim() && !this.haveImage(testCase.expectedOutcome)) {
            $('#expectedOutcome-validation').remove();
            $("#expectedOutcome .rdw-editor-wrapper").after('<div class="error-container" id="expectedOutcome-validation"><span class="error-lable">This field is required</spand></div>');
            editorEmpty = true;
        }

        if (!editorEmpty && isFormValid) {
            if (this.isTestDriveInEditMode()) {
                if (!testCase.newItem) {
                    Services.getTestCasesByIds([testCase.id]).then((oldTestCases: TestCase[]) => {
                        if (!this.compareTestCases(oldTestCases[0], testCase)) {
                            testCase.isEdited = true;
                            testCase.editStatus = ColumnsValues.EDIT_STATUS_EDITED;
                            this.props.dispatch(saveTestCase(testCase));
                            toast.success("Test Case Saved Successfully!");
                        } else {
                            this.props.dispatch(saveTestCase(testCase));
                            toast.success("Test Case Saved Successfully!");

                        }
                    })
                } else {
                    testCase.isEdited = false;
                    testCase.editStatus = ColumnsValues.EDIT_STATUS_NEW;
                    this.props.dispatch(saveTestCase(testCase));
                    toast.success("Test Case Saved Successfully!");
                }

            } else {
                this.props.dispatch(saveTestCase(testCase));
                toast.success("Test Case Saved Successfully!");
            }

        } else {
            //Popup.alert(Messages.TEST_CASE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_CASE_ERROR, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
        }

    }

    compareTestCases(oldCase: TestCase, newCase: TestCase) {
        return oldCase.title === newCase.title &&
            oldCase.description === newCase.description &&
            oldCase.expectedOutcome === newCase.expectedOutcome &&
            oldCase.testCaseType === newCase.testCaseType &&
            oldCase.scenario === newCase.scenario
    }

    isTestDriveInEditMode() {
        return this.props.testDrive.status !== ColumnsValues.DRAFT &&
            this.props.testDrive.status !== ColumnsValues.SUBMIT;
    }

    haveImage(html) {
        var haveImage = false;
        $(html).each(function () {
            if (this.tagName && this.tagName.toLowerCase() === "img") {
                haveImage = true;
                return false;
            }
        });
        return haveImage;
    }

    checkForUnsavedItems(items, message) {
        var unsaveTestCase = items && items.filter(item => {
            return item.isInEditMode == true;
        });

        if (unsaveTestCase.length) {
            //Popup.alert(message);
            this.props.updateUI({ requirmentMessage: message, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
            return true;
        } else {
            return false;
        }
    }

    onAddQuestion() {
        var questions = this.props.testDrive.questions;
        var isUnsavedItem = true;;
        isUnsavedItem = this.checkForUnsavedItems(questions, Messages.SAVE_UNSAVED_QUESTION);
        if (!isUnsavedItem) {
            this.props.dispatch(addQuestion());
        } else {
            this.switchTab(2);
        }
    }

    onAddRegistrationQuestion() {
        var RegistrationQuestions = this.props.testDrive.registrationQuestions;
        var isUnsavedItem = true;
        isUnsavedItem = this.checkForUnsavedItems(RegistrationQuestions, Messages.SAVE_UNSAVED_RegistrationQuestion);
        if (!isUnsavedItem) {
            this.props.dispatch(addRegistrationQuestion());
        } else {
            this.switchTab(2);
        }
    }

    onAddTestCase() {
        var testCases = this.props.testDrive.testCases;
        var isUnsavedItem = false;
        isUnsavedItem = this.checkForUnsavedItems(testCases, Messages.SAVE_UNSAVED_TEST_CASE);
        if (!isUnsavedItem) {
            this.props.dispatch(addTestCase());
            this.props.dispatch(updateMaxPoints());
        } else {
            this.switchTab(1);
        }
    }

    getSelectedTab() {
        return this.props.ui.activeTab;
    }

    approveTestDrive(testDriveId) {
        this.props.updateUI({ saveLoading: true, saveTestDriveApprovalLoading: true });
        Services.approveTestdrive(testDriveId).then(() => {
            this.props.updateUI({
                requirmentMessage: Messages.TEST_DRIVE_APPROVE_MSG,
                title: "Success!",
                saveLoading: false
            });
            $("#popupApprovalSuccess").trigger('click');
        });
    }


    closePopUp() {
        console.log("popup closed.");
    }

    manageTestDriveSuccessButtons = [{
        name: 'Test drive center',
        link: '/testdrives'
    },
    ]

    manageTestDriveSaveSuccessButtons = [{
        name: 'Test drive center',
        link: '/testdrives'
    },
    {
        name: 'Stay on test drive',
        link: '#'
    },
    ]

    manageTestDriveAlertButtons = [{
        name: 'Ok',
        link: '#',
        callBack: this.closePopUp
    }
    ]

    createTestDriveAlertButtons = [{
        name: 'Ok',
        link: '#'
    }
    ]

    ApprovalButtons = [{
        name: 'Test drive center',
        link: '/testdrives'
    },
    {
        name: 'Stay on test drive',
        link: '#'
    }]

    self = this;

    deleteConfirmationButtons = [{
        name: 'Yes',
        callBack: this.deleteConfirmed.bind(this)
    },
    {
        name: 'No',
        link: '#'
    }]

    deleteConfirmed() {
        console.log("delete", this.props.ui.deletedItem);
        let deletedItem = this.props.ui.deletedItem;
        let deletedItemType = this.props.ui.deletedItemType;
        if (deletedItemType === Globals.ITEM_TYPE_REIGSTRATION_QUESTION) {
            this.props.dispatch(deleteRegistrationQuestion(deletedItem))
        } else if (deletedItemType === Globals.ITEM_TYPE_QUESTION) {
            this.props.dispatch(deleteQuestion(deletedItem));
        } else if (deletedItemType === Globals.ITEM_TYPE_TEST_CASE) {
            this.props.dispatch(deleteTestCase(deletedItem));
        }
    }

    hasAccess() {
        let currentUser = Services.getCurrentUser();
        let matchedUsers = this.props.testDrive.owners ?
            this.props.testDrive.owners.filter(o => currentUser.ID == o.ID) : ["loading"];
        return matchedUsers && matchedUsers.length ||
            this.props.testDrive.status === ColumnsValues.DRAFT || this.props.testDrive.id === -1 ?
            true : false;
    }

    deleteConfirmationRequired(registrationQuestion, deltedItemType) {
        this.props.updateUI({
            deletedItem: registrationQuestion,
            deletedItemType: deltedItemType
        });
        $("#popupDeleteConfirmation").trigger('click');
    }

    render() {
        const { testDrive, question, dispatch, loading, testCase, ui, updateUI,
            testCaseFields, surveyFields, testDriveFields, view, registration,
            registrationQuestion, registrationQuestions, waitingMessage } = this.props;

        const currentUserRole = Services.getUserProfileProperties().role;
        return (
            <div className="container header_part">
                <Popup key={1} popupId="ManageTestDriveSuccess" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveSuccessButtons} />
                <Popup key={2} popupId="ApprovalSuccess" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.ApprovalButtons} />
                <Popup key={3} popupId="ManageTestDriveAlert" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveAlertButtons} />
                <Popup key={4} popupId="CreateTestDriveAlert" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.createTestDriveAlertButtons} />
                <Popup key={5} popupId="ManageTestDriveSuccessSaveAsDraft" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveSaveSuccessButtons} />
                <Popup key={6} popupId="DeleteConfirmation" title={"Alert"}
                    body={"Are you sure you want to delete this item?"}
                    buttons={this.deleteConfirmationButtons} />
                <h2 className="header_prevlink">
                    <a href="javascript:;" onClick={() => Services.goBack()}>
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                        {this.props.id ?
                            (this.props.view == 'edit' ? "Update Test Drive" : "View Test Drive") :
                            "Create test drive"}
                    </a>
                </h2>
                <h4 className="cancel-btn"><Link to={"/testdrives"}>CANCEL</Link></h4>
                <div className="col-md-12 testdrive_createbox">
                    <div className="wrapper">
                        <Loader show={loading || ui.saveLoading} message={waitingMessage || ui.loadingMessage || 'Loading...'}>
                            {
                                !loading && !this.hasAccess() ? "You don't have access on this test drive." :
                                    <Tabs selected={this.getSelectedTab() || 0}>
                                        <Pane label="REGISTER A TEST DRIVE">
                                            <div className={"row setup-content"} id="step-1" >
                                                <div className="col-xs-12 form_box tab-container">
                                                    <TestDriveForm
                                                        testDrive={testDrive}
                                                        saveTestDrive={(t, f, a) => this.onTestDriveSave(t, f, a)}
                                                        submitTestDrive={(t) => dispatch(submitTestDrive(t))}
                                                        onChange={(e, testDrive) => dispatch(updateTestDrive(e, testDrive))}
                                                        updateMultiSelect={(value, control, testDrive) => dispatch(updateMultiSelect(value, control, testDrive))}
                                                        updateDates={(dates) => dispatch(updateDate(dates))}
                                                        updateMaxPoints={() => dispatch(updateMaxPoints())}
                                                        updateUI={updateUI}
                                                        fieldDescriptions={testDriveFields}
                                                        ui={ui}
                                                        switchTab={this.onSwitchTab}
                                                        view={view}
                                                        currentUserRole={currentUserRole}
                                                        approveTestDrive={this.approveTestDrive}
                                                        registration={registration}
                                                    />
                                                </div>
                                            </div>
                                        </Pane>
                                        {registration && <Pane label={registration ? "REGISTRATION QUESTIONS" : null}>
                                            <div className={"row setup-content"} id="step-4">
                                                <div className="col-xs-12 form_box tab-container">
                                                    <Registration registrationQuestions={testDrive.registrationQuestions}
                                                        newRegistrationQuestion={registrationQuestion}
                                                        saveRegistrationQuestion={(t, f) => this.onSaveRegistrationQuestion(t, f)}
                                                        saveTestDrive={(t, f, a) => this.onTestDriveSave(t, f, a)}
                                                        editRegistrationQuestion={(t) => dispatch(editRegistrationQuestion(t))}
                                                        deleteRegistrationQuestion={(registrationQuestion) => 
                                                            this.deleteConfirmationRequired(registrationQuestion, Globals.ITEM_TYPE_REIGSTRATION_QUESTION)}
                                                        onChange={(e, registrationQuestion) => dispatch(updateRegistrationQuestion(e, registrationQuestion))}
                                                        addRegistrationQuestion={this.onAddRegistrationQuestion}
                                                        testDrive={testDrive}
                                                        updateUI={updateUI}
                                                        ui={ui}
                                                        loadRegistrationQuestions={(t) => dispatch(loadRegistrationQuestions(t))}
                                                        registrationQuestionIds={testDrive.registrationQuestionIDs}
                                                        fieldDescriptions={surveyFields}
                                                        currentUserRole={currentUserRole}
                                                        approveTestDrive={this.approveTestDrive}
                                                        view={view}
                                                        switchTab={this.onSwitchTab}
                                                    />
                                                </div>
                                            </div>
                                        </Pane>}
                                        <Pane label="TEST CASES">
                                            <div className={"row setup-content"} id="step-2">
                                                <div className="col-xs-12 form_box tab-container">
                                                    <TestCases testCases={testDrive.testCases}
                                                        newTestCase={testCase}
                                                        saveTestCase={(t, f) => this.onSaveTestCase(t, f)}
                                                        saveTestDrive={(t, f, a) => this.onTestDriveSave(t, f, a)}
                                                        editTestCase={(t) => dispatch(editTestCase(t))}
                                                        deleteTestCase={(testCase) => this.deleteConfirmationRequired(testCase, Globals.ITEM_TYPE_TEST_CASE)}
                                                        onChange={(e, testCase) => dispatch(updateTestCase(e, testCase))}
                                                        addTestCase={this.onAddTestCase}
                                                        updateMaxPoints={() => dispatch(updateMaxPoints())}
                                                        testDrive={testDrive}
                                                        updateUI={updateUI}
                                                        ui={ui}
                                                        loadTestCases={(t) => dispatch(loadTestCases(t))}
                                                        testCaseIds={testDrive.testCaseIDs}
                                                        fieldDescriptions={testCaseFields}
                                                        switchTab={this.onSwitchTab}
                                                        currentUserRole={currentUserRole}
                                                        approveTestDrive={this.approveTestDrive}
                                                        view={view}
                                                    />
                                                </div>
                                            </div>
                                        </Pane>
                                        <Pane label="SURVEY QUESTIONS">
                                            <div className={"row setup-content"} id="step-3">
                                                <div className="col-xs-12 form_box tab-container">
                                                    <Surveys questions={testDrive.questions}
                                                        newQuestion={question}
                                                        saveQuestion={(t, f) => this.onSaveQuestion(t, f)}
                                                        saveTestDrive={(t, f, a) => this.onTestDriveSave(t, f, a)}
                                                        editQuestion={(t) => dispatch(editQuestion(t))}
                                                        deleteQuestion={(question) => 
                                                            this.deleteConfirmationRequired(question, Globals.ITEM_TYPE_QUESTION)}
                                                        onChange={(e, question) => dispatch(updateQuestion(e, question))}
                                                        addQuestion={this.onAddQuestion}
                                                        testDrive={testDrive}
                                                        updateUI={updateUI}
                                                        ui={ui}
                                                        loadQuestions={(t) => dispatch(loadQuestions(t))}
                                                        questionIds={testDrive.questionIDs}
                                                        fieldDescriptions={surveyFields}
                                                        view={view}
                                                        currentUserRole={currentUserRole}
                                                        approveTestDrive={this.approveTestDrive}
                                                        switchTab={this.onSwitchTab}
                                                    />
                                                </div>
                                            </div>
                                        </Pane>
                                    </Tabs>
                            }
                        </Loader>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let testDriveId = ownProps.match.params.id;
    testDriveId = isNaN(parseInt(testDriveId)) ? "" : testDriveId;

    let registration = ownProps.match.params.id ?
        ownProps.match.params.id.toLowerCase() === "with_registration" : false;



    let view = ownProps.match.params.view;
    const testDriveState = state.testDriveState;
    let fieldDescriptions = testDriveState.configurations.fieldDescription || {}
    return {
        id: testDriveId,
        testDrive: testDriveState.testDrive,
        testDrives: testDriveState.testDrives,
        loading: testDriveState.loading || state.asyncInitialState.loading,
        testCase: testDriveState.testCase,
        question: testDriveState.question,
        registrationQuestion: testDriveState.registrationQuestion,
        testDriveFields: fieldDescriptions.testDrives,
        testCaseFields: fieldDescriptions.testCases,
        surveyFields: fieldDescriptions.survey,
        configurationLoaded: state.testDriveState.configurationLoaded,
        view: view || 'edit',
        registration: testDriveState.testDrive.hasRegistration || registration,
        waitingMessage: testDriveState.waitingMessage
    }
};

export default connect(mapStateToProps)(ManageTestDrive);

