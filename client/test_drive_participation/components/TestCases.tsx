import * as React from 'react';
import { Link } from "react-router-dom";
import ui from 'redux-ui';
import { TestCaseInstance, TestDriveInstance } from '../../test_drive_participation/model';
import TestCaseForm from './TestCaseForm';
import * as $ from 'jquery';
import Loader from 'react-loader-advanced';
import * as Constants from '../../common/services/constants';
//import Popup from 'react-popup';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";
import Popup from '../../common/components/Popups';

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
        isSurveyPopUpVisiable: false,
        activeItemID: 0,
    }
})
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
        this.getPopUpBodyData = this.getPopUpBodyData.bind(this);
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

        // /** Prompt plugin */
        // Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
        //     let promptValue = null;
        //     let promptChange = function (value) {
        //         promptValue = value;
        //     };

        //     this.create({
        //         title: 'Success',
        //         content: 'Test Drive Submitted Successfully!',
        //         buttons: {
        //             left: [{
        //                 text: 'Take Survey',
        //                 action: function () {

        //                     Popup.close();
        //                     $('[href="#Servay_q"]').trigger('click');
        //                 }
        //             }],
        //             right: [{
        //                 text: 'Go to Dashboard',
        //                 action: function () {
        //                     window.location.href = "#";
        //                     Popup.close();
        //                 }
        //             }]
        //         }
        //     });
        // });
        // /** Call the plugin */



    }

    getPopUpBodyData() {
        return new Promise((resolve, reject) => {        
                var message = Messages.HIGH_FIVE_1.replace("#0#", this.props.testDriveInstance.numberOfTestCasesCompleted.toString()).replace("#1#", this.props.testDriveInstance.testCases.length.toString()) + '<br>';                
                message += Messages.HIGH_FIVE_2.replace("#0#", this.props.testDriveInstance.currentPoint.toString()) + '<br>';
                message += Messages.HIGH_FIVE_3.replace("#0#", "5th") + '<br>';
                message += Messages.HIGH_FIVE_4.replace("#0#", (this.props.testDriveInstance.maxPoints - this.props.testDriveInstance.currentPoint).toString()).replace("#1#", "Supercar") + '<br>';                
                resolve({ message });            
        });
    }

    showSubmitPopUp() {
        if (this.props.testDriveInstance.isTestDriveSubmissionCompleted &&
            this.props.testDriveInstance.status == Constants.ColumnsValues.COMPLETE_STATUS && !this.props.ui.isSurveyPopUpVisiable) {
            //Popup.plugins().prompt('', 'What do you want to do?');
            $("#popupHighFive").trigger("click");
            this.props.updateUI({ isSurveyPopUpVisiable: true });
        }
    }    

    render() {
        const { testCases, saveTestCaseResponse, submitTestDriveInstance, ui, updateUI, testDriveInstance } = this.props;
        return (
            <div className="col-md-12">            
                {this.showSubmitPopUp()}
                <Loader show={testDriveInstance.isSumbitInProgress || false} message={'Loading...'}>
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



