import * as React from 'react';
import { Link } from "react-router-dom";
import ui from 'redux-ui';
import { TestCaseInstance, TestDriveInstance } from '../../test_drive_participation/model';
import TestCaseForm from './TestCaseForm';
import * as $ from 'jquery';
import '../../js/jquery.confetti.js';
import Loader from 'react-loader-advanced';
import * as Constants from '../../common/services/constants';
//import Popup from 'react-popup';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";
import Popup from '../../common/components/Popups';
import { ToastContainer, toast } from 'react-toastify';
let confetti = require("../../js/jquery.confetti.js");
import Services from '../../common/services/services';
//declare var InitializeConfetti():any; 
interface TestCasesProps {
    testDriveInstance: TestDriveInstance;
    testCases: TestCaseInstance[];
    saveTestCaseResponse: (testCase: TestCaseInstance, testDrive: TestDriveInstance) => any;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
};
@ui({
    state: {
        isSurveyPopUpVisiable: false,
        activeItemID: 0,
        loading: false
    }
})
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
        this.getPopUpBodyDataHighFive = this.getPopUpBodyDataHighFive.bind(this);
        this.getPopUpBodyDataMissingOut = this.getPopUpBodyDataMissingOut.bind(this);
    }
    componentDidMount() {
        $('#carousel-example-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('prev');
            }
            else {
                $(this).carousel('next');
            }
        });

        $('#carousel-example-vertical').carousel({
            wrap: false
        });
    }

    getPopUpBodyDataMissingOut() {
        return new Promise((resolve, reject) => {
            var message = Messages.MISSING_OUT_1.replace("#0#", this.props.testDriveInstance.numberOfTestCasesCompleted.toString()).replace("#1#", this.props.testDriveInstance.testCases.length.toString()) + '<br>';
            message += Messages.MISSING_OUT_2.replace("#0#", this.props.testDriveInstance.currentPoint.toString()) + '<br>';
            message += Messages.MISSING_OUT_3.replace("#0#", "5th") + '<br>';
            message += Messages.MISSING_OUT_4.replace("#0#", (this.props.testDriveInstance.maxPoints - this.props.testDriveInstance.currentPoint).toString()).replace("#1#", "Supercar") + '<br>';
            resolve({ message });
        });
    }

    getPopUpBodyDataHighFive() {
        var message = Messages.HIGH_FIVE_1.replace("#0#", this.props.testDriveInstance.numberOfTestCasesCompleted.toString()).replace("#1#", this.props.testDriveInstance.testCases.length.toString()) + '<br>';
        message += Messages.HIGH_FIVE_2.replace("#0#", (this.props.testDriveInstance.currentPoint - this.props.testDriveInstance.joiningBonus - this.props.testDriveInstance.completionBonus).toString()) + '<br>';
        message += Messages.HIGH_FIVE_3.replace("#0#", this.props.testDriveInstance.joiningBonus.toString()) + '<br>';
        // message += Messages.HIGH_FIVE_3.replace("#0#", "5th") + '<br>';
        // message += Messages.HIGH_FIVE_4.replace("#0#", (this.props.testDriveInstance.maxPoints - this.props.testDriveInstance.currentPoint).toString()).replace("#1#", "Supercar") + '<br>';                
        return { message };
    }

    showSubmitPopUp(testCase) {
        var interval, self=this;
        if (this.props.testDriveInstance.numberOfTestCasesCompleted == this.props.testDriveInstance.testCaseIDs.length) {
            this.props.updatePoints({...this.props.testDriveInstance, questionSaveInProgress: true});
            Services.getTestDriveInstanceData(this.props.testDriveInstance).then((newTestDriveInstance: any) => {
                if (newTestDriveInstance.joiningBonus > 0) {
                    if (interval) {
                        clearInterval(interval);
                    }
                    this.props.updatePoints({...newTestDriveInstance, questionSaveInProgress: false});
                    this.props.updateUI({ requirmentMessage: this.getPopUpBodyDataHighFive().message });
                    $("#popupHighFive").trigger("click");
                    $(".modal-backdrop.fade.in").hide();
                    confetti.InitializeConfettiInit();
                } else{
                    interval = setInterval(self.showSubmitPopUp(testCase), 1000);
                }
            });
        } else {
            var self = this;
            Services.getTestPointConfiguration(Constants.Lists.POINTS_CONFIGURATIONS).then(testCasePoinsts => {
                if (testCase.responseStatus === Constants.ColumnsValues.COMPLETE_STATUS) {
                    toast.success("Test Case Responses Submitted Successfully! You just got " + testCasePoinsts + " points for submission.");
                } else {
                    toast.success("Test Case Responses Submitted Successfully!");
                }
                $('#carousel-example-vertical').carousel('next');
            });
        }

    }

    render() {
        const { testCases, saveTestCaseResponse, updatePoints, ui, updateUI, testDriveInstance } = this.props;
        return (
            <div className="col-md-12">
                {/* {this.showSubmitPopUp()} */}
                <Loader show={ui.loading || testDriveInstance.questionSaveInProgress || false} message={'Loading...'}>
                    <div id="carousel-example-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                        <div className="testcase_no " id="test_Cases">
                            <ul className="task_circle carousel-indicators">
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
                                            showSubmitPopUp={() => this.showSubmitPopUp(testCase)}
                                            isLast={index == testCases.length - 1}
                                            testDriveInstance={testDriveInstance}
                                            key={index}
                                            index={index}
                                            active={index == 0 ? true : false}
                                            testCase={testCase}
                                            saveTestCaseResponse={(testCase, testDrive) =>
                                                saveTestCaseResponse(testCase, testDrive)}
                                            updatePoints={(t) => updatePoints(t)}
                                            ui={ui}
                                            updateUI={updateUI} />
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
                </Loader>
            </div >

        )
    }
}

export default TestCases;



