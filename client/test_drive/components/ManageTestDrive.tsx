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
    loadTestDrives,
    loadTestCases,
    loadQuestions,
    loadConfigurations,
    updateMaxPoints
} from '../../test_drive';

interface AppProps {
    id: number,
    testDrive: model.TestDrive;
    testDrives: model.TestDrive[];
    testCase: model.TestCase;
    loading: boolean;
    updateUI: (any) => any;
    ui: any;
    dispatch: Dispatch<{}>;
    questions: model.Question[];
    question: model.Question;
    configurationLoaded: boolean;
    testCaseFields: object;
    surveyFields: object;
    testDriveFields: object;
    view: string;
};

@ui({
    state: {
        activeTab: 0,
        requirmentMessage: '',
        title: "",
        saveLoading:false
    }
})

class ManageTestDrive extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
        this.switchTab = this.switchTab.bind(this);
        this.onTestDriveSave = this.onTestDriveSave.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddTestCase = this.onAddTestCase.bind(this);
        this.onSaveQuestion = this.onSaveQuestion.bind(this);
        this.onSaveTestCase = this.onSaveTestCase.bind(this);
        this.checkForUnsavedItems = this.checkForUnsavedItems.bind(this);
        this.getSelectedTab = this.getSelectedTab.bind(this);
    }



    getTestDriveById(testDrives, testDriveId) {
        const testDrive = testDrives.filter(testDrive => testDrive.id == testDriveId);
        if (testDrive) return testDrive[0]; //since filter returns an array, have to grab the first.
        return null;
    }

    switchTab(key) {
        this.props.updateUI({ activeTab: key });
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

    onTestDriveSave(testDrive, formID, action) {
        var isFormValid = validateForm(formID);
        var testCases = this.props.testDrive.testCases;
        var questions = this.props.testDrive.questions;
        var maxTestDrivers = parseInt(testDrive.maxTestDrivers) || 0;
        if (isFormValid) {
            // if (maxTestDrivers < 1) {
            //     Popup.alert('Max Test Drivers value should be greater than 1.');
            //     return false;
            // }
            if (testCases && testCases.length &&
                this.checkForUnsavedItems(testCases, Messages.SAVE_UNSAVED_TEST_CASE)) {
                this.switchTab(1);
                this.props.updateUI({ saveLoading : false });
                return false;
            }
            if (questions && questions.length &&
                this.checkForUnsavedItems(questions, Messages.SAVE_UNSAVED_QUESTION)) {
                this.switchTab(2);
                this.props.updateUI({ saveLoading : false });
                return false;
            }

            if (testDrive.status == ColumnsValues.SUBMIT && testCases && testCases.length == 0) {
                //Popup.alert(Messages.NO_TEST_CASE_ERROR);            
                this.props.updateUI({ requirmentMessage: Messages.NO_TEST_CASE_ERROR, title: "Alert!", saveLoading : false });
                $("#popupManageTestDriveAlert").trigger('click');
                return false;
            }

            if (testDrive.status == ColumnsValues.SUBMIT && questions && questions.length == 0) {
                //Popup.alert(Messages.NO_QUESTION_ERROR);
                this.props.updateUI({ requirmentMessage: Messages.NO_QUESTION_ERROR, title: "Alert!", saveLoading : false });
                $("#popupManageTestDriveAlert").trigger('click');
                return false;
            }
            //this.props.updateUI({ saveIsInProgress: true });
            Services.getTestDrivesByFilter("TestDriveName eq '" + testDrive.title.trim() + "' and ID ne '"+testDrive.id+"'").then((testDriveData: any) => {
                if (testDriveData && testDriveData.length > 0) {
                    //Popup.alert(Messages.TEST_DRIVE_SAME_NAME_ERROR)
                    this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SAME_NAME_ERROR, title: "Alert!" });
                    $("#popupCreateTestDriveAlert").trigger('click');
                }
                else {
                    if (action == "save") {
                        //Popup.plugins().prompt('', 'What do you want to do?', Messages.TEST_DRIVE_SAVEDDRAFT_MSG);
                        toast.success(Messages.TEST_DRIVE_SAVEDDRAFT_MSG);
                        this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SAVEDDRAFT_MSG, title: "Success!" });
                        $("#popupManageTestDriveSuccessSaveAsDraft").trigger('click');
                    }
                    else {     
                        testDrive.status = ColumnsValues.SUBMIT;                                                                
                        //Popup.plugins().prompt('', 'What do you want to do?', Messages.TEST_DRIVE_SUBMIT_MSG);
                        this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_SUBMIT_MSG, title: "Success!" });
                        $("#popupManageTestDriveSuccess").trigger('click');
                        toast.success(Messages.TEST_DRIVE_SUBMIT_MSG);
                    }
                    this.props.dispatch(saveTestDrive(testDrive));                    
                }
                this.props.updateUI({ saveLoading : false });
                //this.props.updateUI({ saveIsInProgress: false });
            });

        }
        else {
            this.switchTab(0);
            //Popup.alert(Messages.TEST_DRIVE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_ERROR, title: "Alert!", saveLoading : false });
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
                this.props.dispatch(saveQuestion(question));
                toast.success("Question Saved Successfully!");
            }
        } else {
            //Popup.alert(Messages.QUESTION_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.QUESTION_ERROR, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
        }
    }

    onSaveTestCase(testCase, formID) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            this.props.dispatch(saveTestCase(testCase));
            toast.success("Test Case Saved Successfully!");
        } else {
            //Popup.alert(Messages.TEST_CASE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_CASE_ERROR, title: "Alert!" });
            $("#popupManageTestDriveAlert").trigger('click');
        }
    }

    checkForUnsavedItems(items, message) {
        var unsaveTestCase = items && items.filter(item => {
            return item.isInEditMode == true;
        });

        if (unsaveTestCase.length) {
            //Popup.alert(message);
            this.props.updateUI({ requirmentMessage: Messages.TEST_CASE_ERROR, title: "Alert!" });
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

    manageTestDriveSuccessButtons = [{
        name: 'Go to dashboard',
        link: '/'
    },        
    ]

    manageTestDriveSaveSuccessButtons = [{
        name: 'Go to dashboard',
        link: '/'
    },
    {
        name: 'Stay on test drive',
        link: '#'
    },    
    ]

    manageTestDriveAlertButtons = [{
        name: 'Ok',
        link: '#'
    }
    ]

    createTestDriveAlertButtons = [{
        name: 'Ok',
        link: '#'
    }
    ]

    render() {
        const { testDrive, question, dispatch, loading, testCase, ui, updateUI,
            testCaseFields, surveyFields, testDriveFields, view } = this.props;
        return (
            <div className="container header_part">
                <Popup popupId="ManageTestDriveSuccess" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveSuccessButtons} />
                <Popup popupId="ManageTestDriveAlert" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveAlertButtons} />
                <Popup popupId="CreateTestDriveAlert" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.createTestDriveAlertButtons} />
                <Popup popupId="ManageTestDriveSuccessSaveAsDraft" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.manageTestDriveSaveSuccessButtons} />
                <h2 className="header_prevlink">
                    <Link to={"/testdrives"} >
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                            {this.props.id ? 
                                (this.props.view == 'edit'? "Update Test Drive" : "View Test Drive" ) : 
                                "Create test drive"}
                    </Link>
                </h2>
                <h4 className="cancel-btn"><Link to={"/testdrives"}>CANCEL</Link></h4>
                <div className="col-md-12 testdrive_createbox">
                    <div className="wrapper">
                        <Loader show={loading} message={'Loading...'}>
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
                                                switchTab={this.switchTab}
                                                view={view}
                                            />
                                        </div>
                                    </div>
                                </Pane>
                                <Pane label="TEST CASES">
                                    <div className={"row setup-content"} id="step-2">
                                        <div className="col-xs-12 form_box tab-container">
                                            <TestCases testCases={testDrive.testCases}
                                                newTestCase={testCase}
                                                saveTestCase={(t, f) => this.onSaveTestCase(t, f)}
                                                saveTestDrive={(t, f, a) => this.onTestDriveSave(t, f, a)}
                                                editTestCase={(t) => dispatch(editTestCase(t))}
                                                deleteTestCase={(id) => dispatch(deleteTestCase(id))}
                                                onChange={(e, testCase) => dispatch(updateTestCase(e, testCase))}
                                                addTestCase={this.onAddTestCase}
                                                updateMaxPoints={() => dispatch(updateMaxPoints())}
                                                testDrive={testDrive}
                                                updateUI={updateUI}
                                                ui={ui}
                                                loadTestCases={(t) => dispatch(loadTestCases(t))}
                                                testCaseIds={testDrive.testCaseIDs}
                                                fieldDescriptions={testCaseFields}
                                                switchTab={this.switchTab}
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
                                                deleteQuestion={(id) => dispatch(deleteQuestion(id))}
                                                onChange={(e, question) => dispatch(updateQuestion(e, question))}
                                                addQuestion={this.onAddQuestion}
                                                testDrive={testDrive}
                                                updateUI={updateUI}
                                                ui={ui}
                                                loadQuestions={(t) => dispatch(loadQuestions(t))}
                                                questionIds={testDrive.questionIDs}
                                                fieldDescriptions={surveyFields}
                                                view={view}
                                            />
                                        </div>
                                    </div>
                                </Pane>
                            </Tabs>
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
        testDriveFields: fieldDescriptions.testDrives,
        testCaseFields: fieldDescriptions.testCases,
        surveyFields: fieldDescriptions.survey,
        configurationLoaded: state.testDriveState.configurationLoaded,
        view: view || 'edit'
    }
};

export default connect(mapStateToProps)(ManageTestDrive);