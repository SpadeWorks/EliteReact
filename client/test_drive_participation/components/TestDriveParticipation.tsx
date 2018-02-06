import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance } from '../../test_drive_participation/model';
import TestCases from '../../test_drive_participation/components/TestCases';

interface TestDriveParticipationProps {
    testDriveInstance: TestDriveInstance;
};
class TestDriveParticipation extends React.Component<TestDriveParticipationProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { testDriveInstance } = this.props;
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
                                        <TestCases testCases={testDriveInstance.testCases} />
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
                <div className="row overview ">
                    <div className="container ">
                        <div className="col-md-10 col-md-offset-1 ">
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 ">
                                        <p><span className="orange "><i>1</i></span> of 8</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">Test case completed</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 ">
                                        <p><span className="orange "><i>1</i></span> of 8</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">Test case completed</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 testcase_title ">
                                        <p className="inactive ">Mar 13, 2018</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">Test drive end date</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 ">
                                        <p>Mar 13, 2018</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">Test drive end date</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 navigation_box ">
                            <div className="row ">
                                <div className="col-md-6 ">
                                    <a className="up carousel-control " href="#carousel-example-vertical " role="button" data-slide="prev ">
                                        <span className="glyphicon glyphicon-chevron-up " aria-hidden="true "></span>
                                        <span className="sr-only ">Previous</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <a className="down carousel-control " href="#carousel-example-vertical " role="button" data-slide="next ">
                                    <span className="glyphicon glyphicon-chevron-down " aria-hidden="true "></span>
                                    <span className="sr-only ">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDriveParticipation;
