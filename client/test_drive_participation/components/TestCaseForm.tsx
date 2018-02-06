import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance } from '../../test_drive_participation/model';
interface TestCaseFormProps {
    testCase: TestCaseInstance;
};
class TestCaseForm extends React.Component<TestCaseFormProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {testCase} = this.props;
        return (<div className="row testcase_box ">
            <h1>{testCase.title}</h1>
            <p>{testCase.scenario}</p>
            <h4 className="testcase_title ">Select the test case status</h4>
            <div className="row ">
                <div className="test_progress ">
                    <div className="col-md-3 ">
                        <a href="# " className="status_inprogress ">Inprogress</a>
                    </div>
                    <div className="col-md-3 ">
                        <a href="# " className="status_pass">Pass <i className="material-icons ">done</i> </a>
                    </div>
                    <div className="col-md-3 ">
                        <a href="# " className="status_fail ">Fail</a>
                    </div>
                    <div className="col-md-12 comment_box ">
                        <i className="material-icons pull-right ">camera_enhance</i>
                        <textarea className="inputMaterial form-control" />
                        <span className="highlight "></span>
                        <span className="bar "></span>
                        <label className="disc_lable ">Description</label>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestCaseForm;
