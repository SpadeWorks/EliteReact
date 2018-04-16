import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, QuestionInstance, TestDriveInstance } from '../../test_drive_participation/model';
import ui from 'redux-ui';
import { ColumnsValues } from '../../common/services/constants';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as $ from 'jquery';
<<<<<<< HEAD
import Popup from '../../common/components/Popups';
import { Messages } from '../../common/services/constants';
import Promise from "ts-promise";
import { Services } from '../../common/services/data_service';
import * as Constants from '../../common/services/constants';
let confetti = require("../../js/jquery.confetti.js");
import { validateControl, required, validateForm } from '../../common/components/Validations';
import Loader from 'react-loader-advanced';
=======
import Popup from 'react-popup';
import { Messages } from '../../common/services/constants';
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
interface QuestionFormProps {
    testDriveInstance: TestDriveInstance;
    showSurvey: boolean;
    question: QuestionInstance;
    active: boolean;
    saveQuestionResponse: (question: QuestionInstance) => any;
    updateUI: (any) => any;
    ui: any;
    isLast: boolean;
    index: number;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
};

@ui({
    state: {
        questionResponse: '',
        selectedResponse: '',
        submitInProgress: false
    }
})
class QuestionForm extends React.Component<QuestionFormProps> {
    constructor(props, context) {
        super(props, context);
        this.onChangeSeletedResponseChange = this.onChangeSeletedResponseChange.bind(this);
        this.saveQuestionResponse = this.saveQuestionResponse.bind(this);
        this.getPopUpBodyData = this.getPopUpBodyData.bind(this);
        this.props.updateUI({
            questionResponse: this.props.question.questionResponse,
            selectedResponse: this.props.question.selectedResponse
        });
        this.openCompletionPopUp = this.openCompletionPopUp.bind(this);
    }

    componentDidMount(){

       
    }

    onChange(e) {
        this.props.updateUI({ [e.target.name]: e.target.value });
    }
    onChangeSeletedResponseChange(value) {
        this.props.updateUI({ selectedResponse: value });
    }
    saveQuestionResponse(question: QuestionInstance, ) {

        question = {
            ...question,
            responseStatus: ColumnsValues.DRAFT,
            questionResponse: this.props.ui.questionResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveQuestionResponse(question);
    }
    submitQuestionResponse(question: QuestionInstance, formID, isLast = false) {
        if (validateForm(formID)) {
            if(!isLast){
                $('#carousel-question-vertical').carousel('next');
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

<<<<<<< HEAD
    getCompletedQuestionCount() {
        var question = this.props.testDriveInstance.questions
        var completedQuestions = question && question.length && question.filter(question => {
            return question.responseStatus == Constants.ColumnsValues.COMPLETE_STATUS;
        });
        if (completedQuestions)
            return completedQuestions.length;
        else
            return 0;
    }

    getPopUpBodyData() {
        return new Promise((resolve, reject) => {
            var message = Messages.POP_THE_FIZZ_1 + '<br>';
            message += Messages.POP_THE_FIZZ_2 + '<br>';
            message += Messages.POP_THE_FIZZ_3.replace("#0#", this.props.testDriveInstance.completionBonus.toString()) + '<br>';
            resolve({ message });
        });
    }

    submitSurvey(question, formID) {
        if (this.submitQuestionResponse(question, formID, true)) {
            var self = this;
            $("#submitSurvey").attr('disabled', true);
            this.props.updateUI({submitInProgress: true});
            Services.submitSurvey(this.props.testDriveInstance).then((testDriveInstance: TestDriveInstance) => {
                this.props.updateUI({submitInProgress: false});
                this.props.updatePoints({...testDriveInstance, questionSaveInProgress: true});
                self.openCompletionPopUp(testDriveInstance);
            });
        };
    }

    openCompletionPopUp(testDriveInstance: any) { 
        var interval, self=this;
        Services.getTestDriveInstanceData(testDriveInstance).then((newTestDriveInstance : any) => {
            if (newTestDriveInstance.status === Constants.ColumnsValues.COMPLETE_STATUS) {
                this.props.updatePoints({...newTestDriveInstance, questionSaveInProgress: false});
                if (interval) {
                    clearInterval(interval);
                }
                self.getPopUpBodyData().then((data: any) => {
                    this.props.updateUI({ requirmentMessage: data.message });
                    $("#popupPopTheFizz").trigger("click");
                    $(".modal-backdrop.fade.in").hide();
                    confetti.InitializeConfettiInit();
                });
                $("#submitSurvey").attr('disabled', false);
                
            } else {
                interval = setInterval(self.openCompletionPopUp(newTestDriveInstance), 500);
            }
        });
        
=======
    submitSurvey(question) {
        this.submitQuestionResponse(question);
        var popUpMessage = Messages.SURVEY_SUBMITTED;
        Popup.registerPlugin('success', function (defaultValue, placeholder, callback) {
            let promptValue = null;
            let promptChange = function (value) {
                promptValue = value;
            };

            this.create({
                title: 'Success',
                content: 'Survey Submitted Successfully!',
                buttons: {
                    right: [{
                        text: 'Go to Dashboard',
                        action: function () {
                            window.location.href = "#";
                            Popup.close();
                        }
                    }]
                }
            });
        });
        Popup.plugins().success('', 'What do you want to do?');
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    render() {
        const { question, saveQuestionResponse, ui, updateUI, active, isLast, index, testDriveInstance } = this.props;
        const formID = "question-form-" + index;
        return (

            <div className={"item " + (active ? 'active' : '')} id={formID}>
                <Loader show={testDriveInstance.questionSaveInProgress ||  ui.submitInProgress || false} message={'Saving...'}>
                    <div className="container ">
                        <div className="col-md-12 ">
                            <div className="row testcase_box ">
                                <span className="orange">{"Question " + (index + 1)}</span>
                                <h1>{question.title}</h1>
                                <div className="row ">
                                    <div className="test_progress ">
                                        {
                                            question.questionType == ColumnsValues.QUESTION_TYPE_OBJECTIVE &&
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
                                            question.questionType != ColumnsValues.QUESTION_TYPE_OBJECTIVE &&

<<<<<<< HEAD
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
=======
                                    <div className="col-md-12 comment_box ">
                                        <textarea className="inputMaterial form-control"
                                            onChange={(e) => this.onChange(e)}
                                            name="questionResponse"
                                            value={ui.questionResponse}
                                            required />
                                        <span className="highlight "></span>
                                        <span className="bar "></span>
                                        <label className="disc_lable ">Description</label>
                             
                                    </div>
                                }
                                {
                                    !isLast && < div className="col-md-12 participation_actionbox">
                                        <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                            <input type="button" value="Done" onClick={() => this.submitQuestionResponse(question)} />
                                        </div>
                                    </div>
                                }
                                {
                                    isLast && <div className="col-md-12 participation_actionbox">
                                        <div className="button type1 nextBtn btn-lg pull-right animated_button">
                                            <input type="button" value="Submit survey" onClick={() => this.submitSurvey(question)} />
                                        </div>
                                    </div>
                                }
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

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
                                                    <input disabled={this.getCompletedQuestionCount() < testDriveInstance.questionIDs.length - 1} 
                                                    type="button" value="Submit survey" onClick={() => this.submitSurvey(question, formID)}
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

export default QuestionForm;
