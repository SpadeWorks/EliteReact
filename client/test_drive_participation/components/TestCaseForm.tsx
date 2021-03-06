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
<<<<<<< HEAD
import Popup from '../../common/components/Popups';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";

=======
import Popup from 'react-popup';
import { ToastContainer, toast } from 'react-toastify';
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
interface TestCaseFormProps {
    showSubmitPopUp: () => any;
    testDriveInstance: TestDriveInstance;
    testCase: TestCaseInstance;
    active: boolean;
    saveTestCaseResponse: (testCase: TestCaseInstance, testdrive: TestDriveInstance) => any;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
    index: number;
    isLast: boolean;
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
        // this.saveTestCaseResponse = this.saveTestCaseResponse.bind(this);
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
        var duplicateFiles = [];
        var oldFiles = this.props.testCase.files;
        oldFiles && oldFiles.length && oldFiles.map(oldFile => {
            var machedElement = files && files.length && files.filter(newFile => {
                return oldFile.FileName == newFile.name
            });
            machedElement.length && duplicateFiles.push(machedElement[0].name);
        })

        if (duplicateFiles.length) {
            Popup.alert("Files with following names are alredy attached:" + '\n' + duplicateFiles.join(', '));
        } else {
            this.props.updateUI({
                files: files
            });
        }
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
    }

    onChange(e) {
        this.props.updateUI({ testCaseResponse: e.target.value });
    }

    saveTestCaseResponse(testCase: TestCaseInstance, index) {
        var isFormValid = validateForm('test-case-form' + index);
        if (isFormValid) {
            testCase = {
                ...testCase,
                responseStatus: testCase.responseStatus == Constants.ColumnsValues.INPROGRESS ?
                    Constants.ColumnsValues.DRAFT : testCase.responseStatus,
                testCaseResponse: this.props.ui.testCaseResponse,
                selectedResponse: this.props.ui.selectedResponse,
                files: this.props.ui.files
            }
            this.props.saveTestCaseResponse(testCase, this.props.testDriveInstance);
            toast.success("Test Case Response Saved Successfully!");
            $('#carousel-example-vertical').carousel('next');
        } else {
<<<<<<< HEAD
            //Popup.alert(Constants.Messages.ERROR_IN_FORM);
=======
            Popup.alert(Constants.Messages.ERROR_IN_FORM);
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
        }
    }

    submitTestCaseResponse(testCase: TestCaseInstance, index) {
<<<<<<< HEAD
        var isFormValid = validateForm('test-case-form' + index);
        if (isFormValid && this.props.ui.selectedResponse !== Constants.ColumnsValues.INPROGRESS) {
            this.props.updateUI({ loading: true });
            testCase = {
                ...testCase,
                responseStatus: testCase.responseStatus,
                testCaseResponse: this.props.ui.testCaseResponse,
                selectedResponse: this.props.ui.selectedResponse,
                files: this.props.ui.files
            }

            Services.submitTestCaseResponse(testCase, this.props.testDriveInstance)
                .then((testDriveInstance: TestDriveInstance) => {
                    this.props.updatePoints(testDriveInstance);
                    this.props.showSubmitPopUp();
                    this.props.updateUI({ loading: false });
                    // $('#carousel-example-vertical').carousel('next');
                })
        } else {
            this.saveTestCaseResponse(testCase, index);
        }
=======
        this.props.submitTestDriveInstance(this.props.testDriveInstance);
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
        // this.props.updateUI({ showSurveyPopUp: true })
        // $('#test-drive-completion-btn').trigger('click');
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
        const { testCase, active, saveTestCaseResponse, ui, updateUI, index, testDriveInstance, isLast } = this.props;
        return (
            <div className={"item " + (active ? 'active' : '')} id={'test-case-form' + index}>
                <div className="row">
                    <Loader show={testDriveInstance.testCaseSaveInProgress || false} message={'Saving...'}>
                        <div className="container ">
                            <div className="col-md-12 ">
                                <div className="row testcase_box ">
                                    <span className="orange">{"Test Case " + (index + 1)}</span>
                                    <h1 className="testcase_name">{testCase.title}</h1>
                                    <p>{testCase.description && testCase.description.length > 200 ?
                                        testCase.description.slice(0, 200) + '...   ' : testCase.description}
                                        {testCase.description && testCase.description.length > 200 ?
<<<<<<< HEAD
                                            <a href="javascript:;" onClick={() => this.openPopUp(index)}>
                                                <span className="read-more">Read more</span>
                                            </a> : ''}</p>
                                    <a href="javascript:;" onClick={() => this.openPopUp(index)}> <span className="red">
                                        <img src="/Style%20Library/Elite/images//i.png" />
                                        Show me all test case details</span>
=======
                                            <a href="javascript:void(0);" onClick={() => this.openPopUp(index)}>
                                                <span className="read-more">Read more</span>
                                        </a> : ''}</p>
                                    <a href="javascript:void(0);" onClick={() => this.openPopUp(index)}> <span className="red">
                                        <img src="/sites/elite/Style%20Library/Elite/images//i.png" />
                                        Guide me to solve this test case</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    </a>
                                    <h4 className="testcase_title ">Select the test case status *</h4>
                                    <div className="row ">
                                        <div className="test_progress ">
                                            <div data-validations={[required]} data-value={ui.selectedResponse}
                                                className="custom-check-box" id={"test-case-response" + index}>
                                                <div className="col-md-3 ">
                                                    <a href="javascript:void(0)"
                                                        className={ui.selectedResponse == "Inprogress" ? "status_pass" : "status_inprogress"}
                                                        onClick={(e) => updateUI({ selectedResponse: "Inprogress" })}>
                                                        Skip for now
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
                                                ><i className="material-icons pull-right">attachment</i>
                                                </Files>

                                                <textarea className="inputMaterial form-control"
                                                    onChange={(e: any) => this.onChange(e)}
                                                    name="description"
                                                    value={ui.testCaseResponse}
                                                    id={"test-case-response-description" + index}
                                                //  data-validations={[required]}
                                                />
                                                <span className="highlight "></span>
                                                <span className="bar "></span>
                                                <label className="disc_lable ">Test case result comments</label>
                                            </div>
                                            <div className="files" style={{ clear: 'both' }}>
                                                {
                                                    (testCase && testCase.files && testCase.files.length) && <div className='files-list'>
                                                        <ul>{testCase.files.map((file, index) => {
                                                            return (<li className='files-list-item' key={file.FileName + index}>
                                                                <div className='files-list-item-preview'>
                                                                    <img className='files-list-item-preview-image' src={file.ServerRelativeUrl || "/Style%20Library/Elite/images/file-empty-icon.png"} />
                                                                </div>
                                                                <div className='files-list-item-content'>
                                                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.FileName}</div>
                                                                </div>
                                                            </li>)
                                                        }
                                                        )}</ul>
                                                    </div>
                                                }
                                                <div className='files-list'>
                                                    <ul>{
                                                        (ui.files && ui.files.length) ? ui.files.map((file) => {
                                                            return <li className='files-list-item' key={file.id}>
                                                                <div className='files-list-item-preview'>
                                                                    <img className='files-list-item-preview-image' src={file.preview.url || "/Style%20Library/Elite/images/file-empty-icon.png"} />
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
<<<<<<< HEAD
=======
                                            <div className="col-md-12 participation_actionbox">
                                                <div className="button type1 nextBtn btn-lg pull-left animated_button">
                                                    <input type="button" value="Save" onClick={() => this.saveTestCaseResponse(testCase, index)} />
                                                </div>
                                            </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

                                            <div className="col-md-12 participation_actionbox pull-right">
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button"
                                                    style={{ marginLeft: '40px' }}>
                                                    <input type="button"
                                                        disabled={ui.loading}
                                                        value="Submit" onClick={() => this.submitTestCaseResponse(testCase, index)} />
                                                </div>
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button"
                                                >
                                                    <input type="button"
                                                        disabled={ui.loading}
                                                        value="Save as draft" onClick={() => this.saveTestCaseResponse(testCase, index)} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Loader>
                </div>
            </div >

        )
    }
}

export default TestCaseForm;
