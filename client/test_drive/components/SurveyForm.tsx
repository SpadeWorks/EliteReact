import * as React from 'react';
import { TestDrive, IState, Question } from '../model';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ui from 'redux-ui';

interface SurveyFormProps {
    question: Question,
    deleteQuestion: (id: number) => any;
    saveQuestion: (question: Question) => any;
    editQuestion: (question: Question) => any;
    onChange: (event: any, question: Question) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        questionOptions: [],
        questionType: 'Objective'
    }
})

class SurveyForm extends React.Component<SurveyFormProps> {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.updateQuestionType = this.updateQuestionType.bind(this);
        this.updateQuestionOptions = this.updateQuestionOptions.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.onChange(e, this.props.question));
    }

    options = [
        { value: 'Objective', label: 'Choice' },
        { value: 'Subjective', label: 'Comments' },
    ]

    answers = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'Satisfied', label: 'Satisfied' },
        { value: 'unsatisfied', label: 'unsatisfied' }
    ]

    updateQuestionType(newValue) {
        let e = {
            target: {
                type: 'custom-select',
                name: 'questionType',
                value: newValue
            }
        };

        this.props.onChange(e, this.props.onChange(e, this.props.question));
    }

    updateQuestionOptions(value) {
        let e = {
            target: {
                type: 'custom-select',
                name: 'options',
                value: value
            }
        };

        this.props.onChange(e, this.props.onChange(e, this.props.question));
    }

    render() {
        const { question, editQuestion, saveQuestion, deleteQuestion, ui } = this.props;
        question.isInEditMode = question.isInEditMode === undefined ? false : question.isInEditMode;
        const checkBoxStyle = {
            color: "green"
        }
        return (
            <div className="card">
                <div className="card-header" data-role="tab" id="headingOne">
                    <h5 className="mb-0">
                        <a data-toggle="collapse"
                            href={"#collapse" + question.id}
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            className="pull-left"
                            onClick={() => editQuestion(question)}>
                            {question.title}

                        </a>

                        <div className="pull-right">
                            <a href="javascript:void(0);"><i className="material-icons"
                                onClick={() => deleteQuestion(question.id)}>delete</i></a>
                            {!question.isInEditMode &&
                                <a href="javascript:void(0);"><i className="material-icons"
                                    onClick={() => editQuestion(question)}>mode_edit</i></a>
                            }
                            {question.isInEditMode &&
                                <a href="javascript:void(0);" className="check_ico"
                                    onClick={() => saveQuestion(question)}>
                                    <i className="material-icons" style={checkBoxStyle}>check</i>
                                </a>}
                        </div>
                    </h5>
                </div>
                <div id={"collapse" + question.id}
                    data-role="tabpanel"
                    className={question.isInEditMode ? "collapse in" : "collapse"}
                    aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.

                        <form>
                            <div className="col-md-12 register_input">

                                <input className="inputMaterial" type="text"
                                    onChange={this.onChange} name="title"
                                    value={question.title || ""}
                                    required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Test drive title</label>
                            </div>

                            
                            <div className="col-md-12">
                                <h5>Question Type:</h5>
                                <Select
                                    id="question-type"
                                    onBlurResetsInput={false}
                                    onSelectResetsInput={false}
                                    autoFocus
                                    options={this.options}
                                    simpleValue
                                    clearable={true}
                                    name="question-type"
                                    value={question.questionType}
                                    onChange={this.updateQuestionType}
                                    rtl={false}
                                    searchable={false}
                                />

                                <br></br>
                                { question.questionType === "Objective" && <div>
                                <h5>Please Select the Choices or add new choices.</h5>
                                <Select.Creatable
                                    multi={true}
                                    options={this.answers}
                                    onChange={this.updateQuestionOptions}
                                    value={question.options}
                                />
                                </div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SurveyForm;
