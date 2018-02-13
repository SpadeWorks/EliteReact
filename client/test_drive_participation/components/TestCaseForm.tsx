import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, TestDriveInstance } from '../../test_drive_participation/model';
import * as Constants from '../../common/services/constants';
import ui from 'redux-ui';
import Services from '../../common/services/services';
import * as $ from 'jquery';
import { validateControl, required, validateForm } from '../../common/components/Validations';
interface TestCaseFormProps {
    testDriveInstance: TestDriveInstance
    testCase: TestCaseInstance;
    active: boolean;
    saveTestCaseResponse: (testCase: TestCaseInstance, testdrive: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
    index: number;
};

@ui({
    state: {
        testCaseResponse: '',
        selectedResponse: ''
    }
})
class TestCaseForm extends React.Component<TestCaseFormProps> {
    constructor(props, context) {
        super(props, context);
        this.saveTestCaseResponse = this.saveTestCaseResponse.bind(this);
        this.submitTestCaseResponse = this.submitTestCaseResponse.bind(this);
        this.props.updateUI({ testCaseResponse: this.props.testCase.testCaseResponse });
        this.props.updateUI({ selectedResponse: this.props.testCase.selectedResponse });
    }

    onChange(e) {
        this.props.updateUI({ testCaseResponse: e.target.value });
    }
    saveTestCaseResponse(testCase: TestCaseInstance) {
        let testDrive = this.props.testDriveInstance;
        testCase = {
            ...testCase,
            newItem: false,
            responseStatus: Constants.ColumnsValues.DRAFT,
            testCaseResponse: this.props.ui.testCaseResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveTestCaseResponse(testCase, testDrive);
    }
    submitTestCaseResponse(testCase: TestCaseInstance) {
        var isFormValid = validateForm('test-case-form' + testCase.responseID);
        if (isFormValid) {
            $('#carousel-example-vertical').carousel('next');
            testCase = {
                ...testCase,
                newItem: testCase.responseStatus == Constants.ColumnsValues.DRAFT,
                responseStatus: Constants.ColumnsValues.COMPLETE_STATUS,
                testCaseResponse: this.props.ui.testCaseResponse,
                selectedResponse: this.props.ui.selectedResponse
            }
            this.props.saveTestCaseResponse(testCase, this.props.testDriveInstance);
        } else{
            alert(Constants.Messages.ERROR_IN_FORM);
        }
    }

    openPopUp() {

    }
    render() {
        const { testCase, active, saveTestCaseResponse, ui, updateUI, index } = this.props;
        return (<div className={"item " + (active ? 'active' : '')} id={'test-case-form' + testCase.responseID}>
               <div className="row">
            <div className="container ">
             
                <div className="col-md-12 ">
                    <div className="row testcase_box ">
                        <span className="orange">{"Test Caes " + (index + 1)}</span>
                        <h1 className="testcase_name">{testCase.title}</h1>
                        <p>{testCase.description}</p>
                        
                        <a href="javascript:void(0);" onClick={this.openPopUp}> <span className="red"><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images//i.png" />Guide me to solve this test case</span></a>
                        <h4 className="testcase_title ">Select the test case status</h4>
                        <div className="row ">
                            <div className="test_progress ">
                                <div data-validations={[required]} data-value={ui.selectedResponse}
                                    className="custom-check-box" id={"test-case-response" + testCase.responseID}>
                                    <div className="col-md-3 ">
                                        <a href="javascript:void(0)"
                                            className={ui.selectedResponse == "Inprogress" ? "status_pass" : "status_inprogress"}
                                            onClick={(e) => updateUI({ selectedResponse: "Inprogress" })}>
                                            Inprogress
                                        {ui.selectedResponse == "Inprogress" && <i className="material-icons ">done</i>}</a>
                                    </div>
                                    <div className="col-md-3 ">
                                        <a href="javascript:void(0)"
                                            className={ui.selectedResponse == "Pass" ? "status_pass" : "status_inprogress"}
                                            onClick={(e) => updateUI({ selectedResponse: "Pass" })}>
                                            Pass
                                            {ui.selectedResponse == "Pass" && <i className="material-icons ">done</i>}
                                        </a>
                                    </div>

                                    <div className="col-md-3 ">
                                        <a href="javascript:void(0)"
                                            className={ui.selectedResponse == "Fail" ? "status_pass" : "status_inprogress"}
                                            onClick={(e) => updateUI({ selectedResponse: "Fail" })}>Fail
                                        {ui.selectedResponse == "Fail" && <i className="material-icons ">done</i>}
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-12 comment_box ">
                                    <i className="material-icons pull-right ">camera_enhance</i>
                                    <textarea className="inputMaterial form-control"
                                        onChange={(e: any) => this.onChange(e)}
                                        name="description"
                                        value={ui.testCaseResponse}
                                        id={"test-case-response-description" + testCase.responseID}
                                        data-validations={[required]} />

                                    <span className="highlight "></span>
                                    <span className="bar "></span>
                                    <label className="disc_lable ">Test case result comments*</label>
                                </div>
                                <div className="test-case-btn-controls">
                                    {/* {
                                        testCase.responseStatus != Constants.ColumnsValues.COMPLETE_STATUS &&
                                        <input type="button" value="Save" onClick={() => this.saveTestCaseResponse(testCase)} />
                                    } */}
                                   <input type="button" value="Done" onClick={() => this.submitTestCaseResponse(testCase)} />
                                     <Link className="button type1" onClick={() => this.submitTestCaseResponse(testCase)} > Drive Through </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

export default TestCaseForm;
