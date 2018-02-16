import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, TestDriveInstance } from '../../test_drive_participation/model';
import * as Constants from '../../common/services/constants';
import ui from 'redux-ui';
import Services from '../../common/services/services';
import * as $ from 'jquery';
import { validateControl, required, validateForm } from '../../common/components/Validations';
import Files from 'react-files';
import Loader from 'react-loader-advanced';
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
        selectedResponse: '',
        files: []
    }
})
class TestCaseForm extends React.Component<TestCaseFormProps> {
    private stepInput: FileList;

    constructor(props, context) {
        super(props, context);
        this.saveTestCaseResponse = this.saveTestCaseResponse.bind(this);
        this.submitTestCaseResponse = this.submitTestCaseResponse.bind(this);
        this.props.updateUI({ testCaseResponse: this.props.testCase.testCaseResponse });
        this.props.updateUI({ selectedResponse: this.props.testCase.selectedResponse });
        this.openPopUp = this.openPopUp.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.filesRemoveOne = this.filesRemoveOne.bind(this);
        this.onFilesError = this.onFilesError.bind(this);
        this.removeAttachment = this.removeAttachment.bind(this);
    }

    onFilesChange(files) {
        this.props.updateUI({
            files: files
        });
    }

    filesRemoveOne = (removedFile) => {
        var files: any = this.refs.files;
        files.removeFile(removedFile);
        const newFiles = this.props.ui.files.filter((file: any) => {
            return file.id != removedFile.id;
        })
        this.props.updateUI({
            files: newFiles
        });
    }

    onFilesError(error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
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
            selectedResponse: this.props.ui.selectedResponse,
            files: this.props.ui.files
        }
        this.props.saveTestCaseResponse(testCase, testDrive);
    }
    submitTestCaseResponse(testCase: TestCaseInstance, index) {
        var isFormValid = validateForm('test-case-form' + index);
        if (isFormValid) {
            $('#carousel-example-vertical').carousel('next');
            testCase = {
                ...testCase,
                newItem: testCase.responseStatus == Constants.ColumnsValues.DRAFT,
                responseStatus: Constants.ColumnsValues.COMPLETE_STATUS,
                testCaseResponse: this.props.ui.testCaseResponse,
                selectedResponse: this.props.ui.selectedResponse,
                files: this.props.ui.files
            }
            this.props.saveTestCaseResponse(testCase, this.props.testDriveInstance);
        } else {
            alert(Constants.Messages.ERROR_IN_FORM);
        }
    }


    removeAttachment(fileName: string, index) {
        Services.deletAttachment(this.props.testCase.responseID, fileName).then(status => {
            $("#" + fileName + index).hide();
        });
    }

    openPopUp(id) {
        $(".write_testdrivebox").css({ "position": "fixed", "right": "-700px", "transition": "0.5s" });
        $("#test-case-details" + id)
            .css({ "position": "fixed", "right": "0px", "height": "100%", "transition": "0.5s" });
    }

    render() {
        const { testCase, active, saveTestCaseResponse, ui, updateUI, index, testDriveInstance } = this.props;
        return (

            <div className={"item " + (active ? 'active' : '')} id={'test-case-form' + index}>
                <div className="row">
                    <Loader show={testDriveInstance.testCaseSaveInProgress} message={'Loading...'}>
                        <div className="container ">
                            <div className="col-md-12 ">
                                <div className="row testcase_box ">
                                    <span className="orange">{"Test Caes " + (index + 1)}</span>
                                    <h1 className="testcase_name">{testCase.title}</h1>
                                    <p>{testCase.description}</p>

                                    <a href="javascript:void(0);" onClick={() => this.openPopUp(index)}> <span className="red">
                                        <img src="/sites/elite/Style%20Library/Elite/images//i.png" />
                                        Guide me to solve this test case</span>
                                    </a>
                                    <h4 className="testcase_title ">Select the test case status</h4>
                                    <div className="row ">
                                        <div className="test_progress ">
                                            <div data-validations={[required]} data-value={ui.selectedResponse}
                                                className="custom-check-box" id={"test-case-response" + index}>
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
                                                <Files
                                                    ref='files'
                                                    className='files-dropzone-list'
                                                    onChange={this.onFilesChange}
                                                    onError={this.onFilesError}
                                                    multiple
                                                    maxFiles={10}
                                                    maxFileSize={10000000}
                                                    minFileSize={0}
                                                    clickable
                                                ><i className="material-icons pull-right ">camera_enhance</i>
                                                </Files>

                                                <textarea className="inputMaterial form-control"
                                                    onChange={(e: any) => this.onChange(e)}
                                                    name="description"
                                                    value={ui.testCaseResponse}
                                                    id={"test-case-response-description" + index}
                                                    data-validations={[required]} />

                                                <span className="highlight "></span>
                                                <span className="bar "></span>
                                                <label className="disc_lable ">Test case result comments*</label>
                                            </div>
                                            <div className="files" style={{ clear: 'both' }}>
                                                {
                                                    (testCase && testCase.files && testCase.files.length) && <div className='files-list'>
                                                        <ul>{testCase.files.map((file, index) =>
                                                            <li className='files-list-item' key={file.FileName + index}>
                                                                <div className='files-list-item-preview'>
                                                                    <img className='files-list-item-preview-image' src={file.ServerRelativeUrl} />
                                                                </div>
                                                                <div className='files-list-item-content'>
                                                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.FileName}</div>
                                                                </div>
                                                            </li>
                                                        )}</ul>
                                                    </div>
                                                }
                                                <div className='files-list'>
                                                    <ul>{
                                                        (ui.files && ui.files.length) ? ui.files.map((file) => {
                                                            return <li className='files-list-item' key={file.id}>
                                                                <div className='files-list-item-preview'>
                                                                    <img className='files-list-item-preview-image' src={file.preview.url} />
                                                                </div>
                                                                <div className='files-list-item-content'>
                                                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                                                </div>
                                                                <div
                                                                    id={file.id}
                                                                    className='files-list-item-remove'
                                                                    onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                                                ></div>
                                                            </li>
                                                        }) : ''}</ul>
                                                </div>

                                            </div>
                                            <div className="col-md-12 participation_actionbox">
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                                    <input type="button" value="Done" onClick={() => this.submitTestCaseResponse(testCase, index)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Loader>
                </div>
            </div>
        )
    }
}

export default TestCaseForm;
