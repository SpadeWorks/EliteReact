import * as React from 'react';
import { Link } from "react-router-dom";
import Services from '../../common/services/services';
import { Lists } from '../../common/services/constants';
import { TestDriveInstance, QuestionInstance, TestCaseInstance } from '../../test_drive_participation/model';
import TestCases from '../../test_drive_participation/components/TestCases';
import Overview from './OverView';
import Survey from './Survey';
import TestDriveInfo from './TestDriveInfo';
import * as $ from 'jquery';

interface TestDriveParticipationProps {
    testDriveInstance: TestDriveInstance;
    saveTestCaseResponse: (testCase: TestCaseInstance, testDrive: TestDriveInstance) => any;
    saveQuestionResponse: (question: QuestionInstance) => any;
    loadQuestions: (testDriveID: number, questions: number[], userID: number) => any;
    updateUI: (any) => any;
    ui: any;
};
class TestDriveParticipation extends React.Component<TestDriveParticipationProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        $('#carousel-example-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('next');
                $('#carousel-example-vertical').carousel({
                    interval: 3000
                });
            }
            else {
                $(this).carousel('prev');
            }
        });
    }
    render() {
        const { testDriveInstance, saveTestCaseResponse, loadQuestions, saveQuestionResponse, ui, updateUI } = this.props;
        return (<div className="col-md-12">
            <div className="row">
                <div className="container">
                    <h2>
                        <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                        {testDriveInstance.title}
                    </h2>
                </div>
                <div className="col-md-12" style={{ overflow: "auto" }}>
                    <div className="wrapper" style={{ height: "544px" }}>
                        <div className="col-md-10 profile_box col-md-offset-1" style={{ height: "500px" }}>
                            <div className="well count_box">
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a href="#test_Cases" data-toggle="tab">Test Cases</a>
                                    </li>
                                    <li>
                                        <a href="#Servay_q" data-toggle="tab">Survey</a>
                                    </li>
                                    <li>
                                        <a href="#Description" data-toggle="tab">Description</a>
                                    </li>
                                </ul>
                                <div id="myTabContent" className="tab-content">
                                    <div className="tab-pane active in" id="test_Cases">
                                        <TestCases
                                            testDriveInstance={testDriveInstance}
                                            testCases={testDriveInstance.testCases}
                                            saveTestCaseResponse={(testCase, testDrive) =>
                                                saveTestCaseResponse(testCase, testDrive)}
                                            updateUI={updateUI}
                                            ui={ui}
                                        />
                                    </div>
                                    <div className="tab-pane fade " id="Servay_q">
                                        <Survey questions={testDriveInstance.questions}
                                            saveQuestionResponse={(q) => saveQuestionResponse(q)}
                                            loadQuestions={(testDriveID, questionIDs, userID) =>
                                                loadQuestions(testDriveID, questionIDs, userID)}
                                            ui={ui}
                                            updateUI={updateUI}
                                            testDriveInstance={testDriveInstance} />
                                    </div>
                                    <div className="tab-pane fade " id="Description">
                                        <TestDriveInfo testDriveInstance={testDriveInstance} />
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                    <div className="testcase_no ">
                        <ul className="task_circle ">
                            <li data-target="#carousel-example-vertical " data-slide-to="0 " className="active ">
                                <p> 1. <img src="images/empty.png " className="img-responsive " /></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Overview />
        </div>)
    }
}

export default TestDriveParticipation;
