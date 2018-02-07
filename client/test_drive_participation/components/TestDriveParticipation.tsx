import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance } from '../../test_drive_participation/model';
import TestCases from '../../test_drive_participation/components/TestCases';
import { TestCaseInstance } from '../../test_drive_participation/model';
import Overview from './OverView';
import * as $ from 'jquery';

interface TestDriveParticipationProps {
    testDriveInstance: TestDriveInstance;
    saveTestCaseResponse: (testCase: TestCaseInstance) => any;
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
        const { testDriveInstance, saveTestCaseResponse, ui, updateUI } = this.props;
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
                                        <TestCases testCases={testDriveInstance.testCases}
                                            saveTestCaseResponse={(t) => saveTestCaseResponse(t)}
                                        updateUI={updateUI}
                                        ui={ui}
                                        />
                                    </div>
                                    <div className="tab-pane fade " id="Servay_q">
                                        <h1>tab2</h1>
                                    </div>
                                    <div className="tab-pane fade " id="Description">
                                        <h1>tab3</h1>
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
