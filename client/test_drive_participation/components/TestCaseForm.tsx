import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance } from '../../test_drive_participation/model';
import { ColumnsValues } from '../../common/services/constants';
import ui from 'redux-ui';
interface TestCaseFormProps {
    testCase: TestCaseInstance;
    active: boolean;
    saveTestCaseResponse: (testCase: TestCaseInstance) => any;
    updateUI: (any) => any;
    ui: any;
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
        testCase = {
            ...testCase,
            responseStatus: ColumnsValues.DRAFT,
            testCaseResponse: this.props.ui.testCaseResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveTestCaseResponse(testCase);
    }
    submitTestCaseResponse(testCase: TestCaseInstance) {
        testCase = {
            ...testCase,
            responseStatus: ColumnsValues.COMPLETE_STATUS,
            testCaseResponse: this.props.ui.testCaseResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveTestCaseResponse(testCase);
    }
    render() {
        const { testCase, active, saveTestCaseResponse, ui, updateUI } = this.props;
        return (<div className={"item " + (active ? 'active' : '')}>
            <div className="container ">
                <div className="col-md-12 ">
                    <div className="row testcase_box ">
                        <h1>{testCase.title}</h1>
                        <p>{testCase.scenario}</p>
                        <h4 className="testcase_title ">Select the test case status</h4>
                        <div className="row ">
                            <div className="test_progress ">
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
                                <div className="col-md-12 comment_box ">
                                    <i className="material-icons pull-right ">camera_enhance</i>
                                    <textarea className="inputMaterial form-control"
                                        onChange={(e: any) => this.onChange(e)}
                                        name="description"
                                        value={ui.testCaseResponse}
                                        required />

                                    <span className="highlight "></span>
                                    <span className="bar "></span>
                                    <label className="disc_lable ">Description</label>
                                </div>
                                <div className="test-case-btn-controls">
                                    {
                                        testCase.responseStatus != ColumnsValues.COMPLETE_STATUS &&
                                        <input type="button" value="Save" onClick={() => this.saveTestCaseResponse(testCase)} />
                                    }
                                    <input type="button" value="Submit" onClick={() => this.submitTestCaseResponse(testCase)} />
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
