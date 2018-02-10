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
        this.getTabClass.bind(this);
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
        if(!this.props.configurationLoaded){
            this.props.dispatch(loadConfigurations());
        }
        this.props.dispatch(loadTestDrive(this.props.id || -1));
    }

    render() {
        const { testDrive, question, dispatch, loading, testCase, ui, updateUI, 
                testCaseFields, surveyFields, testDriveFields} = this.props;
        return (
            <div className="container">
                <h2 className="page-heading">Create Test Drive</h2>
                <h4 className="cancel-btn"><Link to={"/testdrives"}>Cancel</Link></h4>
                <div className="col-md-12">
                    <div className="wrapper">
                        <Loader show={loading} message={'Loading...'}>
                            <TabCar switchTab={(key) => this.switchTab(key)} />
                            <div className={"row setup-content " + this.getTabClass('step-1')} id="step-1" >
                                <div className="col-xs-12 form_box tab-container">
                                    <TestDriveForm
                                        testDrive={testDrive}
                                        saveTestDrive={(t) => dispatch(saveTestDrive(t))}
                                        submitTestDrive={(t) => dispatch(submitTestDrive(t))}
                                        onChange={(e, testDrive) => dispatch(updateTestDrive(e, testDrive))}
                                        updateMultiSelect={(value, control, testDrive) => dispatch(updateMultiSelect(value, control, testDrive))}
                                        updateDates={(dates) => dispatch(updateDate(dates))}
                                        updateMaxPoints = {() => dispatch(updateMaxPoints())}
                                        updateUI={updateUI}
                                        fieldDescriptions = {testDriveFields}
                                        ui={ui}
                                    />
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-2')} id="step-2">
                                <div className="col-xs-12 form_box tab-container">
                                    {(this.getTabClass('step-2') ==  "show-tab") &&
                                        <TestCases testCases={testDrive.testCases}
                                            newTestCase={testCase}
                                            saveTestCase={(t) => dispatch(saveTestCase(t))}
                                            saveTestDrive={(t) => dispatch(saveTestDrive(t))}
                                            editTestCase={(t) => dispatch(editTestCase(t))}
                                            deleteTestCase={(id) => dispatch(deleteTestCase(id))}
                                            onChange={(e, testCase) => dispatch(updateTestCase(e, testCase))}
                                            addTestCase={() => dispatch(addTestCase())}
                                            updateMaxPoints = {() => dispatch(updateMaxPoints())}
                                            testDrive={testDrive}
                                            updateUI={updateUI}
                                            ui={ui}
                                            loadTestCases={(t) => dispatch(loadTestCases(t))}
                                            testCaseIds={testDrive.testCaseIDs}
                                            fieldDescriptions = {testCaseFields}
                                        />}
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-3')} id="step-3">
                                <div className="col-xs-12 form_box tab-container">
                                    {
                                        (this.getTabClass('step-3') ==  "show-tab") &&
                                        <Surveys questions={testDrive.questions}
                                            newQuestion={question}
                                            saveQuestion={(t) => dispatch(saveQuestion(t))}
                                            saveTestDrive={(t) => dispatch(saveTestDrive(t))}
                                            editQuestion={(t) => dispatch(editQuestion(t))}
                                            deleteQuestion={(id) => dispatch(deleteQuestion(id))}
                                            onChange={(e, question) => dispatch(updateQuestion(e, question))}
                                            addQquestion={() => dispatch(addQuestion())}
                                            testDrive={testDrive}
                                            updateUI={updateUI}
                                            ui={ui}
                                            loadQuestions={(t) => dispatch(loadQuestions(t))}
                                            questionIds={testDrive.questionIDs}
                                            fieldDescriptions = {surveyFields}
                                        />
                                    }
                                </div>
                            </div>
                        </Loader>
                    </div>
                </div>
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