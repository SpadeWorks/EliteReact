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
    loadQuestions
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
        this.props.dispatch(loadTestDrive(this.props.id || -1));
        this.props.dispatch(loadTestCases(this.props.testDrive.testCaseIDs));
        this.props.dispatch(loadQuestions(this.props.testDrive.questionIDs));
    }

    render() {
        const { testDrive, question, dispatch, loading, testCase, ui, updateUI } = this.props;
        return (
            <div className="container">
                <h2>REGISTER A TEST DRIVE</h2>
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
                                        updateMultiSelect={(value, testDrive) => dispatch(updateMultiSelect(value, testDrive))}
                                        updateDates={(dates) => dispatch(updateDate(dates))}
                                        updateUI={updateUI}
                                        ui={ui}
                                    />
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-2')} id="step-2">
                                <div className="col-xs-12 form_box tab-container">
                                    {testDrive.testCases &&
                                        <TestCases testCases={testDrive.testCases}
                                            newTestCase={testCase}
                                            saveTestCase={(t) => dispatch(saveTestCase(t))}
                                            saveTestDrive={(t) => dispatch(saveTestDrive(t))}
                                            editTestCase={(t) => dispatch(editTestCase(t))}
                                            deleteTestCase={(id) => dispatch(deleteTestCase(id))}
                                            onChange={(e, testCase) => dispatch(updateTestCase(e, testCase))}
                                            addTestCase={() => dispatch(addTestCase())}
                                            testDrive={testDrive}
                                            updateUI={updateUI}
                                            ui={ui}
                                            loadTestCases={(t) => dispatch(loadTestCases(t))}
                                            testCaseIds={testDrive.testCaseIDs}
                                        />}
                                </div>
                            </div>
                            <div className={"row setup-content " + this.getTabClass('step-3')} id="step-3">
                                <div className="col-xs-12 form_box tab-container">
                                    {
                                        testDrive.testCases &&
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
    return {
        id: testDriveId,
        testDrive: state.testDriveState.testDrive,
        testDrives: state.testDriveState.testDrives,
        loading: state.testDriveState.loading || state.asyncInitialState.loading,
        testCase: state.testDriveState.testCase,
        question: state.testDriveState.question
    }
};

export default connect(mapStateToProps)(ManageTestDrive);