import * as React from 'react';
import { TestDrive, IState, RegistrationQuestion } from '../model';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ui from 'redux-ui';
import * as Constants from '../../common/services/constants';
import { validateControl, required, validateForm } from '../../common/components/Validations';

interface RegistrationFormProps {
    registrationQuestion: RegistrationQuestion,
    deleteRegistrationQuestion: (id: number) => any;
    saveRegistrationQuestion: (registrationQuestion: RegistrationQuestion, formID: string) => any;
    editRegistrationQuestion: (registrationQuestion: RegistrationQuestion) => any;
    onChange: (event: any, registrationQuestion: RegistrationQuestion) => any;
    updateUI: (any) => any;
    ui: any;
    fieldDescriptions: any;
};

@ui({
    state: {
        registrationQuestionOptions: [],
        registrationQuestionType: 'Objective'
    }
})

class RegistrationForm extends React.Component<RegistrationFormProps> {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.selectControlChange = this.selectControlChange.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.onChange(e, this.props.registrationQuestion));
        validateControl(e.target.id, e.target.value);
    }

    options = [
        { value: 'SingleSelect', label: 'Single Select' },
        { value: 'MultiSelect', label: 'Multi Select' },
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
        const { 
            registrationQuestion,
            editRegistrationQuestion,
            saveRegistrationQuestion,
            deleteRegistrationQuestion,
            ui,
            fieldDescriptions } = this.props;

        registrationQuestion.isInEditMode = registrationQuestion && 
            registrationQuestion.isInEditMode === undefined ? 
            false : registrationQuestion.isInEditMode;
        
        
            const checkBoxStyle = {
            color: "green"
        }
        return (
            <div className="card">
                <div className="card-header" data-role="tab" id="headingOne">
                    <h5 className="mb-0">
                        <a data-toggle="collapse"
                            href={"#collapse" + registrationQuestion.id}
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            className="pull-left"
                            onClick={() => editRegistrationQuestion(registrationQuestion)}>
                            {registrationQuestion.title || "registrationQuestion " + registrationQuestion.id}

                        </a>
                        <div className="pull-right button-container">
                            <a href="javascript:;"><i className="material-icons"
                                onClick={() => deleteRegistrationQuestion(registrationQuestion.id)}>delete</i></a>
                            {!registrationQuestion.isInEditMode &&
                                <a href="javascript:;"><i className="material-icons"
                                    onClick={() => editRegistrationQuestion(registrationQuestion)}>mode_edit</i></a>
                            }
                            {registrationQuestion.isInEditMode &&
                                <a href="javascript:;" className="check_ico"
                                    onClick={() => saveRegistrationQuestion(registrationQuestion, "registrationQuestion-form" + registrationQuestion.id)}>
                                    <i className="material-icons check-mark" >check</i><i className="btn-save-textbox">Save</i>
                                </a>}
                        </div>
                    </h5>
                </div>
                <div id={"collapse" + registrationQuestion.id}
                    data-role="tabpanel"
                    className={registrationQuestion.isInEditMode ? "collapse in" : "collapse"}
                    aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">


                        <form id={"registrationQuestion-form" + registrationQuestion.id}>
                            <div className="col-md-12 register_input">
                                <input className="inputMaterial"
                                    type="text"
                                    onChange={this.onChange}
                                    name="title"
                                    value={registrationQuestion.title || ""}
                                    id={"question-title" + registrationQuestion.id}
                                    data-validations={[required]} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Question*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.TITLE]}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                <div data-validations={[required]} className="custom-select" id={"registrationQuestion-type-" + registrationQuestion.id}>
                                    <Select
                                        onBlurResetsInput={false}
                                        onSelectResetsInput={false}
                                        autoFocus
                                        options={this.options}
                                        simpleValue
                                        clearable={true}
                                        name="registrationQuestion-type"
                                        value={registrationQuestion.questionType}
                                        onChange={(value) => this.selectControlChange(value, "registrationQuestion-type-" + registrationQuestion.id, "questionType")}
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
                                {(registrationQuestion.questionType === "SingleSelect" ||
                                    registrationQuestion.questionType === "MultiSelect") && 
                                <div>
                                    <div data-validations={[required]} className="custom-select" id={"registrationQuestion-options" + registrationQuestion.id}>
                                        <Select.Creatable
                                            name="options"
                                            multi={true}
                                            options={this.answers}
                                            onChange={(value) => this.selectControlChange(value, "registrationQuestion-options-" + registrationQuestion.id, "options")}
                                            value={registrationQuestion.options}
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

export default RegistrationForm;
