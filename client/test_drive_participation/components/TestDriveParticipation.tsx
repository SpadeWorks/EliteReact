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
import * as Constants from '../../common/services/constants';
import ui from 'redux-ui';
import { ToastContainer, toast } from 'react-toastify';
import Popup from '../../common/components/Popups';

interface TestDriveParticipationProps {
    testDriveInstance: TestDriveInstance;
    saveTestCaseResponse: (testCase: TestCaseInstance, testDrive: TestDriveInstance) => any;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
    saveQuestionResponse: (question: QuestionInstance) => any;
    loadQuestions: (testDriveID: number, questions: number[], userID: number) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        activeTab: 'test_Cases',
        requirmentMessage: ''
    }
})

class TestDriveParticipation extends React.Component<TestDriveParticipationProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        $(document).mouseup(function (e) {
            var container = $(".write_testdrivebox");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.css({ "position": "fixed", "right": "-700px", "transition": "0.5s" });
            }
        });


        $('.testdrive_completionbox').click(e => {
            if (e.target.src) {
                window.open(e.target.src);
            }
        })
    }

    closePopUp(id) {
        $("#test-case-details" + id)
            .css({ "position": "fixed", "right": "-700px", "transition": "0.5s" });
    }
    missingOutButtons = [{
        name: 'Go to survey',
        callBack: function () {
            $(".close-popup").trigger('click');
            $(".close-popup").trigger('click');
            $("a[href='#Servay_q']").trigger('click');
        }
    },
    {
        name: 'Complete test cases',
        link: '#'
    }
    ]

    highFiveButtons = [{
        name: 'Go to survey',
        callBack: function () {
            $(".close-popup").trigger('click');
            $(".close-popup").trigger('click');
            $("a[href='#Servay_q']").trigger('click');
        }
    },
    {
        name: 'Dashboard',
        link: '/'
    }
    ]

    render() {
        const { testDriveInstance, saveTestCaseResponse, updatePoints, loadQuestions, saveQuestionResponse, ui, updateUI } = this.props;
        return (<div className="col-md-12">
            <div className="row">
                <div className="container header_part">
                    <h2>
                        <Link to={"/testdrives"}><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                            {testDriveInstance.title}
                        </Link>
                    </h2>
                </div>
                <div className="container participation_container">
                    <div className="wrapper" style={{ height: "784px" }}>
                        <div className="col-md-11 profile_box">
                            <div className="well count_box">
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a href="#test_Cases" data-toggle="tab" onClick={() => updateUI({ activeTab: 'test_Cases' })}>Test Cases</a>
                                    </li>
                                    <li>
                                        <a href="#Servay_q" data-toggle="tab" onClick={() => updateUI({ activeTab: 'Servay_q' })}>Survey</a>
                                    </li>
                                    <li>
                                        <a href="#Description" data-toggle="tab" onClick={() => updateUI({ activeTab: 'Description' })}>Description</a>
                                    </li>
                                </ul>
                                <div id="myTabContent" className="tab-content">
                                    <div className="tab-pane active in" id="test_Cases">
                                        <TestCases
                                            testDriveInstance={testDriveInstance}
                                            testCases={testDriveInstance.testCases}
                                            saveTestCaseResponse={(testCase, testDrive) =>
                                                saveTestCaseResponse(testCase, testDrive)}
                                            updatePoints={(t) => updatePoints(t)}
                                            updateUI={updateUI}
                                            ui={ui}
                                        />
                                        <Popup popupId="HighFive" title={"High five!"}
                                            body={ui.requirmentMessage}
                                            buttons={this.highFiveButtons} />
                                        <Popup popupId="MissingOut" title={"You are missing out!"}
                                            body={ui.requirmentMessage}
                                            buttons={this.missingOutButtons} />
                                    </div>
                                    <div className="tab-pane fade " id="Servay_q">
                                        <Survey questions={testDriveInstance.questions}
                                            saveQuestionResponse={(q) => saveQuestionResponse(q)}
                                            loadQuestions={(testDriveID, questionIDs, userID) =>
                                                loadQuestions(testDriveID, questionIDs, userID)}
                                            ui={ui}
                                            updateUI={updateUI}
                                            testDriveInstance={testDriveInstance}
                                            updatePoints={(t) => updatePoints(t)} />

                                    </div>
                                    <div className="tab-pane fade " id="Description">
                                        <TestDriveInfo testDriveInstance={testDriveInstance} />
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                    <div>
                        {
                            testDriveInstance.testCases && testDriveInstance.testCases.length &&
                            testDriveInstance.testCases.map((testCase, index) => {
                                return (<div className="col-md-8 write_testdrivebox" id={"test-case-details" + index} key={index}>
                                    <div className="col-md-12">
                                        <i onClick={() => this.closePopUp(index)}
                                            className="material-icons pull-right close-btn"
                                            id={"close_discription" + index}>close</i>
                                    </div>
                                    <div className="col-md-12 testdrive_completionbox testcase_detiled">
                                        <div className="col-md-11 pull-left"><h3>Description</h3></div>
                                        <div className="col-md-12" dangerouslySetInnerHTML={{ __html: testCase.description }}>
                                        </div>

                                        <div className="col-md-11 pull-left"><h3>Scenario</h3></div>
                                        <div className="col-md-12" dangerouslySetInnerHTML={{ __html: testCase.scenario }}>
                                        </div>
                                        <div className="col-md-11 pull-left"><h3>Expected Outcome</h3></div>
                                        <div className="col-md-12" dangerouslySetInnerHTML={{ __html: testCase.expectedOutcome }}>
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Overview testDriveInstance={testDriveInstance} ui={ui} updateUI={updateUI} />
        </div>)
    }
}

export default TestDriveParticipation;
