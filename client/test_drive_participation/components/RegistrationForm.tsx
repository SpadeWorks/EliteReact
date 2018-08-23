import * as React from 'react';
import { Link } from "react-router-dom";
import { RegistrationQuestionInstance, TestDriveInstance } from '../../test_drive_participation/model';
import ui from 'redux-ui';
import { ColumnsValues } from '../../common/services/constants';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as $ from 'jquery';
import Popup from '../../common/components/Popups';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";
import { Services } from '../../common/services/data_service';
import * as Constants from '../../common/services/constants';
let confetti = require("../../js/jquery.confetti.js");
import { validateControl, required, validateForm } from '../../common/components/Validations';
import Loader from 'react-loader-advanced';
interface RegistrationFormProps {
    isLast: boolean;
    index: number;
    testDriveInstance: TestDriveInstance;
    question: RegistrationQuestionInstance;
    active: boolean;
    saveQuestionResponse: (question: RegistrationQuestionInstance) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        questionResponse: '',
        selectedResponse: '',
        submitInProgress: false
    }
})
class RegistrationForm extends React.Component<RegistrationFormProps> {
    constructor(props, context) {
        super(props, context);
        this.onChangeSeletedResponseChange = this.onChangeSeletedResponseChange.bind(this);
        this.saveQuestionResponse = this.saveQuestionResponse.bind(this);
        this.props.updateUI({
            questionResponse: this.props.question.questionResponse,
            selectedResponse: this.props.question.selectedResponse
        });
        this.openCompletionPopUp = this.openCompletionPopUp.bind(this);
    }

    onChange(e) {
        this.props.updateUI({ [e.target.name]: e.target.value });
    }
    onChangeSeletedResponseChange(value) {
        this.props.updateUI({ selectedResponse: value });
    }
    saveQuestionResponse(question: RegistrationQuestionInstance) {
        question = {
            ...question,
            responseStatus: ColumnsValues.DRAFT,
            questionResponse: this.props.ui.questionResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveQuestionResponse(question);
    }
    submitQuestionResponse(question: RegistrationQuestionInstance, formID, isLast = false) {
        if (validateForm(formID)) {
            if (!isLast) {
                $('#carousel-registration-question-vertical').carousel('next');
            }
            question = {
                ...question,
                responseStatus: ColumnsValues.COMPLETE_STATUS,
                questionResponse: this.props.ui.questionResponse,
                selectedResponse: this.props.ui.selectedResponse
            }
            this.props.saveQuestionResponse(question);
            return true;
        } else {
            return false;
        }

    }

    getCompletedQuestionCount() {
        var question = this.props.testDriveInstance.registrationQuestions
        var completedQuestions = question && question.length && question.filter(question => {
            return question.responseStatus == Constants.ColumnsValues.COMPLETE_STATUS;
        });
        if (completedQuestions)
            return completedQuestions.length;
        else
            return 0;
    }

    submitSurvey(question, formID) {
        if (this.submitQuestionResponse(question, formID, true)) {
            var self = this;
            $("#submitSurvey").attr('disabled', true);
            this.props.updateUI({ submitInProgress: true });
            Services.submitRegistration(this.props.testDriveInstance).then((testDriveInstance: TestDriveInstance) => {
                this.props.updateUI({ submitInProgress: false });
                self.openCompletionPopUp(testDriveInstance);
            });
        };
    }

    openCompletionPopUp(testDriveInstance: any) {
        this.props.updateUI({ requirmentMessage: Constants.Messages.REGISTRATION_COMPLETED + Services.formatDate(this.props.testDriveInstance.startDate)});
        $("#popupregistrationCompletion").trigger("click");
        $(".modal-backdrop.fade.in").hide();
        confetti.InitializeConfettiInit();
        $("#submitSurvey").attr('disabled', false);
    }

    render() {
        const { question, saveQuestionResponse, ui, updateUI, active, isLast, index, testDriveInstance } = this.props;
        const formID = "question-form-" + index;
        return (

            <div className={"item " + (active ? 'active' : '')} id={formID}>
                <Loader show={testDriveInstance.questionSaveInProgress || ui.submitInProgress || false} message={'Saving...'}>
                    <div className="container ">
                        <div className="col-md-12 ">
                            <div className="row testcase_box ">
                                <span className="orange">{"Question " + (index + 1)}</span>
                                <h1>{question.title}</h1>
                                <div className="row ">
                                    <div className="test_progress ">
                                        {
                                            question.questionType == ColumnsValues.QUESTION_TYPE_SINGLE_SELECT &&
                                            <div data-validations={[required]} className="custom-select" id={"selectedResponse" + question.responseID}>
                                                <Select
                                                    id="question-response"
                                                    onBlurResetsInput={false}
                                                    onSelectResetsInput={false}
                                                    options={question.options}
                                                    simpleValue
                                                    clearable={true}
                                                    name="selectedResponse"
                                                    value={ui.selectedResponse}
                                                    onChange={(value) => this.onChangeSeletedResponseChange(value)}
                                                    rtl={false}
                                                    searchable={false}
                                                />
                                            </div>
                                        }
                                        {
                                            question.questionType == ColumnsValues.QUESTION_TYPE_MULTI_SELECT &&
                                            <div data-validations={[required]} className="custom-select" id={"selectedResponse" + question.responseID}>
                                                <Select
                                                    id="question-response"
                                                    onBlurResetsInput={false}
                                                    onSelectResetsInput={false}
                                                    options={question.options}
                                                    simpleValue
                                                    clearable={true}
                                                    name="selectedResponse"
                                                    value={ui.selectedResponse}
                                                    onChange={(value) => this.onChangeSeletedResponseChange(value)}
                                                    rtl={false}
                                                    searchable={false}
                                                    type="select-multiple"
                                                    multi={true}
                                                />
                                            </div>
                                        }
                                        {
                                            question.questionType == ColumnsValues.QUESTION_TYPE_SUBJECTIVE &&

                                            <div className="col-md-12 comment_box ">
                                                <textarea className="inputMaterial form-control"
                                                    onChange={(e) => this.onChange(e)}
                                                    name="questionResponse"
                                                    value={ui.questionResponse || ""}
                                                    data-validations={[required]}
                                                    id={"comments" + question.responseID}
                                                />
                                                <span className="highlight "></span>
                                                <span className="bar "></span>
                                                <label className="disc_lable ">Description *</label>

                                            </div>
                                        }
                                        {
                                            !isLast && < div className="col-md-12 participation_actionbox">
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                                    <input type="button" value="Done" onClick={() => this.submitQuestionResponse(question, formID)} />
                                                </div>
                                            </div>
                                        }
                                        {
                                            isLast && <div className="col-md-12 participation_actionbox">
                                                <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                                    <input disabled={this.getCompletedQuestionCount() < testDriveInstance.registrationQuestions.length - 1}
                                                        type="button" value="Register" onClick={() => this.submitSurvey(question, formID)}
                                                        id="submitSurvey" />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Loader>
            </div >)
    }
}

export default RegistrationForm;
