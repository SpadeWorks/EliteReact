import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, QuestionInstance } from '../../test_drive_participation/model';
import ui from 'redux-ui';
import { ColumnsValues } from '../../common/services/constants';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as $ from 'jquery';
interface QuestionFormProps {
    showSurvey: boolean;
    question: QuestionInstance;
    active: boolean;
    saveQuestionResponse: (question: QuestionInstance) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        questionResponse: '',
        selectedResponse: ''
    }
})
class QuestionForm extends React.Component<QuestionFormProps> {
    constructor(props, context) {
        super(props, context);
        this.onChangeSeletedResponseChange = this.onChangeSeletedResponseChange.bind(this);

        this.props.updateUI({
            questionResponse: this.props.question.questionResponse,
            selectedResponse: this.props.question.selectedResponse
        });
    }

    onChange(e){
        this.props.updateUI({[e.target.name] : e.target.value});
    }
    onChangeSeletedResponseChange(value) {
        this.props.updateUI({ selectedResponse: value });
    }
    saveQuestionResponse(question: QuestionInstance) {
        question = {
            ...question,
            responseStatus: ColumnsValues.DRAFT,
            questionResponse: this.props.ui.questionResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveQuestionResponse(question);
    }
    submitQuestionResponse(question: QuestionInstance) {
        $('#carousel-question-vertical').carousel('next');
        question = {
            ...question,
            responseStatus: ColumnsValues.COMPLETE_STATUS,
            questionResponse: this.props.ui.questionResponse,
            selectedResponse: this.props.ui.selectedResponse
        }
        this.props.saveQuestionResponse(question);
    }

    render() {
        const { question, saveQuestionResponse, ui, updateUI, active } = this.props;
        return (<div className={"item " + (active ? 'active' : '')}>
            <div className="container ">
                <div className="col-md-12 ">
                    <div className="row testcase_box ">
                        <h1>{question.title}</h1>
                        <div className="row ">
                            <div className="test_progress ">
                            {
                                    question.questionType == ColumnsValues.QUESTION_TYPE_OBJECTIVE &&

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
                            }
                                {
                                    question.questionType != ColumnsValues.QUESTION_TYPE_OBJECTIVE &&

                                    <div className="col-md-12 comment_box ">
                                        <i className="material-icons pull-right ">camera_enhance</i>
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

                                <div className="col-md-12 participation_actionbox">
                                    <div className="button">
                                    <input type="button" value="Done" onClick={() => this.submitQuestionResponse(question)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default QuestionForm;
