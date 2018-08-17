import * as React from 'react';
import { Link } from "react-router-dom";
import { RegistrationQuestionInstance, TestDriveInstance } from '../../test_drive_participation/model';
import * as Constants from '../../common/services/constants';
import ui from 'redux-ui';
import Services from '../../common/services/services';
import * as $ from 'jquery';
import { validateControl, required, validateForm } from '../../common/components/Validations';
import Files from 'react-files';
import Loader from 'react-loader-advanced';
import Popup from '../../common/components/Popups';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";

interface RegistrationFormProps {
    showSubmitPopUp: () => any;
    testDriveInstance: TestDriveInstance;
    registrationQuestion: RegistrationQuestionInstance;
    active: boolean;
    saveRegistrationQuestionResponse: (registrationQuestion: RegistrationQuestionInstance, testdrive: TestDriveInstance) => any;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
    index: number;
    isLast: boolean;
};

@ui({
    state: {
        registrationQuestionResponse: '',
        selectedResponse: '',
        files: []
    }
})
class RegistrationForm extends React.Component<RegistrationFormProps> {
    private stepInput: FileList;

    constructor(props, context) {
        super(props, context);
        // this.saveRegistrationQuestionResponse = this.saveRegistrationQuestionResponse.bind(this);
        this.submitRegistrationQuestionResponse = this.submitRegistrationQuestionResponse.bind(this);
        this.props.updateUI({ registrationQuestionResponse: this.props.registrationQuestion.questionResponse });
        this.props.updateUI({ selectedResponse: this.props.registrationQuestion.selectedResponse });
        this.openPopUp = this.openPopUp.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.filesRemoveOne = this.filesRemoveOne.bind(this);
        this.onFilesError = this.onFilesError.bind(this);
        this.removeAttachment = this.removeAttachment.bind(this);
    }

    onFilesChange(files) {
        var duplicateFiles = [];
        var oldFiles = this.props.registrationQuestion.files;
        oldFiles && oldFiles.length && oldFiles.map(oldFile => {
            var machedElement = files && files.length && files.filter(newFile => {
                return oldFile.FileName == newFile.name
            });
            machedElement.length && duplicateFiles.push(machedElement[0].name);
        })

        if (duplicateFiles.length) {
            alert("Files with following names are alredy attached:" + '\n' + duplicateFiles.join(', '));
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
        this.props.updateUI({ registrationQuestionResponse: e.target.value });
    }

    saveRegistrationQuestionResponse(registrationQuestion: RegistrationQuestionInstance, index) {
        var isFormValid = validateForm('registration-question-form' + index);
        if (isFormValid) {
            registrationQuestion = {
                ...registrationQuestion,
                responseStatus: registrationQuestion.responseStatus == Constants.ColumnsValues.INPROGRESS ?
                    Constants.ColumnsValues.DRAFT : registrationQuestion.responseStatus,
                questionResponse: this.props.ui.registrationQuestionResponse,
                selectedResponse: this.props.ui.selectedResponse,
                files: this.props.ui.files
            }
            this.props.saveRegistrationQuestionResponse(registrationQuestion, this.props.testDriveInstance);
            toast.success("Response Saved Successfully!");
            $('#carousel-example-vertical').carousel('next');
        } else {
            //Popup.alert(Constants.Messages.ERROR_IN_FORM);
        }
    }

    submitRegistrationQuestionResponse(registrationQuestion: RegistrationQuestionInstance, index) {
        var isFormValid = validateForm('registration-question-form' + index);
        if (isFormValid && this.props.ui.selectedResponse !== Constants.ColumnsValues.INPROGRESS) {
            this.props.updateUI({ loading: true });
            registrationQuestion = {
                ...registrationQuestion,
                responseStatus: registrationQuestion.responseStatus,
                questionResponse: this.props.ui.registrationQuestionResponse,
                selectedResponse: this.props.ui.selectedResponse,
                files: this.props.ui.files
            }

            Services.createOrSaveRegistrationQuestionInstance(registrationQuestion)
                .then((testDriveInstance: TestDriveInstance) => {
                    this.props.updatePoints(testDriveInstance);
                    this.props.showSubmitPopUp();
                    this.props.updateUI({ loading: false });
                    // $('#carousel-example-vertical').carousel('next');
                })
        } else {
            this.saveRegistrationQuestionResponse(registrationQuestion, index);
        }
    }


    removeAttachment(fileName: string, index) {
        Services.deletAttachment(this.props.registrationQuestion.responseID, fileName).then(status => {
            $("#" + fileName + index).hide();
        });
    }

    openPopUp(id) {
        $(".write_testdrivebox").css({ "position": "fixed", "right": "-700px", "transition": "0.5s" });
        $("#test-case-details" + id)
            .css({ "position": "fixed", "right": "0px", "height": "100%", "transition": "0.5s" });
    }

    render() {
        const { registrationQuestion, active, saveRegistrationQuestionResponse, ui, updateUI, index, testDriveInstance, isLast } = this.props;
        return (
            <div className={"item " + (active ? 'active' : '')} id={'registration-question-form' + index}>
                <div className="row">
                    <Loader show={testDriveInstance.registrationQuestionSaveInProgress || false} message={'Saving...'}>
                        <div className="container ">
                            <div className="col-md-12 ">
                                <div className="row RegistrationQuestion_box ">
                                    <span className="orange">{"Question " + (index + 1)}</span>
                                    <h1 className="RegistrationQuestion_name">{registrationQuestion.title}</h1>

                                    <div className="row ">
                                        <div className="test_progress ">
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
                                                    value={ui.RegistrationQuestionResponse}
                                                    id={"test-case-response-description" + index}
                                                //  data-validations={[required]}
                                                />
                                                <span className="highlight "></span>
                                                <span className="bar "></span>
                                                <label className="disc_lable ">Test case result comments</label>
                                            </div>
                                            <div className="files" style={{ clear: 'both' }}>
                                                {
                                                    (registrationQuestion && registrationQuestion.files && registrationQuestion.files.length) && <div className='files-list'>
                                                        <ul>{registrationQuestion.files.map((file, index) => {
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

                                            <div className="col-md-12 participation_actionbox pull-right">
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button"
                                                    style={{ marginLeft: '40px' }}>
                                                    <input type="button"
                                                        disabled={ui.loading}
                                                        value="Submit" onClick={() => this.submitRegistrationQuestionResponse(registrationQuestion, index)} />
                                                </div>
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button"
                                                >
                                                    <input type="button"
                                                        disabled={ui.loading}
                                                        value="Save as draft" onClick={() => this.saveRegistrationQuestionResponse(registrationQuestion, index)} />
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

export default RegistrationForm;
