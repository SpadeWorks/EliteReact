import * as React from 'react';
import { Link } from "react-router-dom";
import ui from 'redux-ui';
import { TestCaseInstance, TestDriveInstance } from '../../test_drive_participation/model';
import TestCaseForm from './TestCaseForm';
import * as $ from 'jquery';
import Loader from 'react-loader-advanced';
import * as Constants from '../../common/services/constants';
interface TestCasesProps {
    testDriveInstance: TestDriveInstance;
    testCases: TestCaseInstance[];
    saveTestCaseResponse: (testCase: TestCaseInstance, testDrive: TestDriveInstance) => any;
    submitTestDriveInstance: (testDriveInstance: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
};
@ui({
    state: {
        showSurveyPopUp: true,
        activeItemID: 0
    }
})
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
        this.isTestDriveCompleted = this.isTestDriveCompleted.bind(this);
        this.props.ui.showSurveyPopUp = this.isTestDriveCompleted();
    }

    isTestDriveCompleted() {
        let testDrive = this.props.testDriveInstance;
        return testDrive.testCases.length == testDrive.numberOfTestCasesCompleted;
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
        const { testCases, saveTestCaseResponse, submitTestDriveInstance, ui, updateUI, testDriveInstance } = this.props;
        return (

            <div className="col-md-12">

                <div id="carousel-example-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                    <div className="testcase_no " id="test_Cases">
                        <ul className="task_circle ">
                            {
                                testDriveInstance.testCases && testDriveInstance.testCases.length &&
                                testDriveInstance.testCases.map((testCase, index) => {
                                    return (<li key={index} data-target="#carousel-example-vertical"
                                        data-slide-to={index} className={index == 0 ? 'active' : ''}>
                                        <p> {index + 1}. {testCase.responseStatus == Constants.ColumnsValues.INPROGRESS &&
                                            <img src={Constants.Globals.IMAGE_BASE_URL + "/empty.png"} className="img-responsive" />}
                                            {testCase.responseStatus == Constants.ColumnsValues.DRAFT &&
                                                <img src={Constants.Globals.IMAGE_BASE_URL + "/half.png"} className="img-responsive" />}
                                            {testCase.responseStatus == Constants.ColumnsValues.COMPLETE_STATUS &&
                                                <img src={Constants.Globals.IMAGE_BASE_URL + "/done.png"} className="img-responsive" />}
                                        </p>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="carousel-inner " role="listbox ">
                        {
                            testCases &&
                            testCases.length &&
                            testCases.map((testCase, index) => {
                                return (

                                    <TestCaseForm
                                        isLast={index == testCases.length - 1}
                                        testDriveInstance={testDriveInstance}
                                        key={index}
                                        index={index}
                                        active={index == 0 ? true : false}
                                        testCase={testCase}
                                        saveTestCaseResponse={(testCase, testDrive) =>
                                            saveTestCaseResponse(testCase, testDrive)}
                                        submitTestDriveInstance={(t) => submitTestDriveInstance(t)}
                                        ui={ui}
                                        updateUI={updateUI}
                                        isTestDriveCompleted={this.isTestDriveCompleted} />
                                )
                            })
                        }
                    </div>
                    <input id="test-drive-completion-btn" style={{ display: 'none' }}
                        type="button"
                        className="btn btn-info btn-lg"
                        data-toggle="modal"
                        data-target="#test-drive-completion" />
                </div>
            </div>

        )
    }
}

export default TestCases;



