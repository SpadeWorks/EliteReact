import * as React from 'react';
import { TestDrive, IState, Question } from '../model';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ui from 'redux-ui';
import * as Constants from '../../common/services/constants';
import { validateControl, required, validateForm } from '../../common/components/Validations';

interface SurveyFormProps {
    question: Question,
    deleteQuestion: (question: Question) => any;
    saveQuestion: (question: Question, formID: string) => any;
    editQuestion: (question: Question) => any;
    onChange: (event: any, question: Question) => any;
    updateUI: (any) => any;
    ui: any;
    fieldDescriptions: any;
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
        this.selectControlChange = this.selectControlChange.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.onChange(e, this.props.question));
        validateControl(e.target.id, e.target.value);
    }

    options = [
        { value: 'Objective', label: 'Choice' },
        { value: 'Subjective', label: 'Comments' },
    ]

    answers = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'Satisfied', label: 'Satisfied' },
        { value: 'Highly satisfied', label: 'Highly satisfied' },
        { value: 'Unsatisfied', label: 'Unsatisfied' },
        { value: 'Highly unsatisfied', label: 'Highly unsatisfied' },
        { value: 'Neutral', label: 'Neutral' },
        { value: 'N/A', label: 'N/A' },

    ]

    selectControlChange = (value, id, name) => {
        let e = {
            target: {
                type: 'custom-select',
                name: name,
                value: value,
                id: id
            }
        };
        this.onChange(e);
        validateControl(id, value);
    }

    render() {
        const { question, editQuestion, saveQuestion, deleteQuestion, ui, fieldDescriptions } = this.props;
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
                            {question.title || "Question " + question.id}

                        </a>
                        <div className="pull-right button-container">
                            <a href="javascript:;"><i className="material-icons"
                                onClick={() => deleteQuestion(question)}>delete</i></a>
                            {!question.isInEditMode &&
                                <a href="javascript:;"><i className="material-icons"
                                    onClick={() => editQuestion(question)}>mode_edit</i></a>
                            }
                            {question.isInEditMode &&
                                <a href="javascript:;" className="check_ico"
                                    onClick={() => saveQuestion(question, "question-form" + question.id)}>
                                    <i className="material-icons check-mark" >check</i><i className="btn-save-textbox">Save</i>
                                </a>}
                        </div>
                    </h5>
                </div>
                <div id={"collapse" + question.id}
                    data-role="tabpanel"
                    className={question.isInEditMode ? "collapse in" : "collapse"}
                    aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">


                        <form id={"question-form" + question.id}>
                            <div className="col-md-12 register_input">
                                <input className="inputMaterial"
                                    type="text"
                                    onChange={this.onChange}
                                    name="title"
                                    value={question.title || ""}
                                    id={"question-title" + question.id}
                                    data-validations={[required]} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Question*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.TITLE]}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                <div data-validations={[required]} className="custom-select" id={"question-type-" + question.id}>
                                    <Select
                                        onBlurResetsInput={false}
                                        onSelectResetsInput={false}
                                        autoFocus
                                        options={this.options}
                                        simpleValue
                                        clearable={true}
                                        name="question-type"
                                        value={question.questionType}
                                        onChange={(value) => this.selectControlChange(value, "question-type-" + question.id, "questionType")}
                                        rtl={false}
                                        searchable={false}
                                    />
                                </div>
                                <label className="disc_lable">Question type*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.RESPONSETYPE]}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                {question.questionType === "Objective" && <div>
                                    <div data-validations={[required]} className="custom-select" id={"question-options" + question.id}>
                                        <Select.Creatable
                                            name="options"
                                            multi={true}
                                            options={this.answers}
                                            onChange={(value) => this.selectControlChange(value, "question-options-" + question.id, "options")}
                                            value={question.options}
                                        />
                                    </div>
                                    <label className="disc_lable">Response</label>
                                    <span className="help-text">
                                        {fieldDescriptions && fieldDescriptions[Constants.Columns.RESPONSES]}
                                    </span>
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
