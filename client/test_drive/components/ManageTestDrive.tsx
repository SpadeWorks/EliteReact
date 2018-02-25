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
import Popup from 'react-popup';
import { ColumnsValues } from '../../common/services/constants';
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
};

@ui({
    state: {
        activeTab: 'step-1',
    }
})
class ManageTestDrive extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
        this.getTabClass = this.getTabClass.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.onTestDriveSave = this.onTestDriveSave.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddTestCase = this.onAddTestCase.bind(this);
        this.onSaveQuestion = this.onSaveQuestion.bind(this);
        this.onSaveTestCase = this.onSaveTestCase.bind(this);
        this.checkForUnsavedItems = this.checkForUnsavedItems.bind(this);
    }

    getTabClass(key) {
        this.props.ui.activeTab = this.props.ui.activeTab || 'step-1';
        return this.props.ui.activeTab === key ? "show-tab" : "hide-tab";
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
        if (!this.props.configurationLoaded) {
            this.props.dispatch(loadConfigurations());
        }
        this.props.dispatch(loadTestDrive(this.props.id || -1));

        /** Prompt plugin */
        Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
            let promptValue = null;
            let promptChange = function (value) {
                promptValue = value;
            };

            this.create({
                title: 'Sucess',
                content: 'Data Saved Sucessfully!',
                buttons: {
                    left: [{
                        text: 'Go Back and Edit',
                        action: function () {
                            Popup.close();
                        }
                    }],
                    right: [{
                        text: 'Go to Dashboard',
                        action: function () {
                            window.location.href = "#";
                            Popup.close();
                        }
                    }]
                }
            });
        });

        /** Call the plugin */
    }

    onTestDriveSave(testDrive, formID) {
        var isFormValid = validateForm(formID);
        var testCases = this.props.testDrive.testCases;
        var questions = this.props.testDrive.questions;
        var maxTestDrivers = parseInt(testDrive.maxTestDrivers) || 0;
        if (isFormValid) {
            if(maxTestDrivers < 1){
                Popup.alert('Max Test Drivers value should be greater than 1.');
                return false;
            }
            if (testCases && testCases.length &&
                this.checkForUnsavedItems(testCases, Messages.SAVE_UNSAVED_TEST_CASE)) {
                this.switchTab('step-2');
                return false;
            }
            if (questions && questions.length &&
                this.checkForUnsavedItems(questions, Messages.SAVE_UNSAVED_QUESTION)) {
                this.switchTab('step-3');
                return false;
            }

            if (testDrive.status == ColumnsValues.SUBMIT && testCases && testCases.length == 0) {
                Popup.alert(Messages.NO_TEST_CASE_ERROR);
                return false;
            }

            if (testDrive.status == ColumnsValues.SUBMIT && questions && questions.length == 0) {
                Popup.alert(Messages.NO_QUESTION_ERROR);
                return false;
            }

            this.props.dispatch(saveTestDrive(testDrive));
            Popup.plugins().prompt('', 'What do you want to do?');
            toast.success("Test Drive Saved Sucessfully!");
        }
        else {
            this.switchTab('step-1');
            Popup.alert(Messages.TEST_DRIVE_ERROR);
        }
    }

    onSaveQuestion(question, formID) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            if (question.questionType == "Objective" && question.options.length < 2) {
                Popup.alert(Messages.NO_OPTIONS_ERROR);
            } else {
                this.props.dispatch(saveQuestion(question));
                toast.success("Question Saved Sucessfully!");
            }
        } else {
            Popup.alert(Messages.QUESTION_ERROR);
        }
    }

    onSaveTestCase(testCase, formID) {
        var isFormValid = validateForm(formID);
        if (isFormValid) {
            this.props.dispatch(saveTestCase(testCase));
            toast.success("Test Case Saved Sucessfully!");
        } else {
            Popup.alert(Messages.TEST_CASE_ERROR);
        }
    }

    checkForUnsavedItems(items, message) {
        var unsaveTestCase = items && items.filter(item => {
            return item.isInEditMode == true;
        });

        if (unsaveTestCase.length) {
            Popup.alert(message);
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
            this.switchTab('step-3');
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
            this.switchTab('step-2');
        }
    }

    render() {
        const { testDrive, question, dispatch, loading, testCase, ui, updateUI,
            testCaseFields, surveyFields, testDriveFields } = this.props;
        return (
            <div className="container header_part">
                <Popup />
                
                    <h2 className="header_prevlink">
                        <Link to={"/"} >
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Create Test Drive
                        </Link>
                        </h2>


                <h4 className="cancel-btn"><Link to={"/testdrives"}>Cancel</Link></h4>
                <div className="col-md-12">
                    <div className="wrapper">
                        <Loader show={loading} message={'Loading...'}>
                            <TabCar switchTab={this.switchTab} ui={ui} updateUI={updateUI} />
                            <div className={"row setup-content " + this.getTabClass('step-1')} id="step-1" >
                                <div className="col-xs-12 form_box tab-container">
                                    <TestDriveForm
                                        testDrive={testDrive}
                                        saveTestDrive={(t, f) => this.onTestDriveSave(t, f)}
                                        submitTestDrive={(t) => dispatch(submitTestDrive(t))}
                                        onChange={(e, testDrive) => dispatch(updateTestDrive(e, testDrive))}
                                        updateMultiSelect={(value, control, testDrive) => dispatch(updateMultiSelect(value, control, testDrive))}
                                        updateDates={(dates) => dispatch(updateDate(dates))}
                                        updateMaxPoints={() => dispatch(updateMaxPoints())}
                                        updateUI={updateUI}
                                        fieldDescriptions={testDriveFields}
                                        ui={ui}
                                        switchTab={this.switchTab}
                                    />
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-2')} id="step-2">
                                <div className="col-xs-12 form_box tab-container">
                                    {(this.getTabClass('step-2') == "show-tab") &&
                                        <TestCases testCases={testDrive.testCases}
                                            newTestCase={testCase}
                                            saveTestCase={(t, f) => this.onSaveTestCase(t, f)}
                                            saveTestDrive={(t, f) => this.onTestDriveSave(t, f)}
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
                                        />}
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-3')} id="step-3">
                                <div className="col-xs-12 form_box tab-container">
                                    {
                                        (this.getTabClass('step-3') == "show-tab") &&
                                        <Surveys questions={testDrive.questions}
                                            newQuestion={question}
                                            saveQuestion={(t, f) => this.onSaveQuestion(t, f)}
                                            saveTestDrive={(t, f) => this.onTestDriveSave(t, f)}
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
                                        />
                                    }
                                </div>
                            </div>
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
    }
};

export default connect(mapStateToProps)(ManageTestDrive);