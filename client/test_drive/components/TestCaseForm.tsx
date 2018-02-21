import * as React from 'react';
import ui from 'redux-ui';
import Select from 'react-select';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-select/dist/react-select.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TestDrive, IState, TestCase } from '../model';
import { Services } from '../../common/services/data_service';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { unemojify } from "node-emoji";
import * as Constants from '../../common/services/constants';
import { validateControl, required, validateForm } from '../../common/components/Validations';

interface TestCaseFormProps {
    testCase: TestCase,
    deleteTestCase: (id: number) => any;
    saveTestCase: (testCase: TestCase, formID: string) => any;
    editTestCase: (TestCase: TestCase) => any;
    onChange: (event: any, TestCase: TestCase) => any;
    updateMaxPoints: () => any;
    updateUI: (any) => any;
    ui: any;
    fieldDescriptions: any;
};

@ui({
    state: {
        scenario: null,
        expectedOutcome: null
    }
})

class TestCasesForm extends React.Component<TestCaseFormProps> {
    formStyle = {
        marginTop: '20px',
        marginBottom: '50px'
    }

    butttonGroup = {
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        left: "900px"
    }

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.selectControlChange = this.selectControlChange.bind(this);
        this.onScenarioChange = this.onScenarioChange.bind(this);
        this.onExpectedOutcomeChange = this.onExpectedOutcomeChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.testCase);
        validateControl(e.target.id, e.target.value);
    }

    selectControlChange = (value, id, name) => {

        let e = {
            target: {
                type: 'custom-select',
                name: 'testCaseType',
                value: value,
                id: id
            }
        };
        this.onChange(e);
        validateControl(id, value);
    }


    testCaseTypes = [
        { value: 'Positive', label: 'Positive' },
        { value: 'Negative', label: 'Negative' },
    ]

    onScenarioChange(value) {
        let e = {
            target: {
                type: 'rte-change',
                name: 'scenario',
                value: draftToHtml(convertToRaw(value.getCurrentContent()))
            }
        }
        const newValue = unemojify(
            draftToHtml(convertToRaw(value.getCurrentContent()))
        );

        if (value !== newValue) {
            this.onChange(e);
        }

        this.props.updateUI({
            scenario: value
        })
    }
    onExpectedOutcomeChange(value) {
        let e = {
            target: {
                type: 'rte-change',
                name: 'expectedOutcome',
                value: draftToHtml(convertToRaw(value.getCurrentContent()))
            }
        }
        const newValue = unemojify(
            draftToHtml(convertToRaw(value.getCurrentContent()))
        );

        if (value !== newValue) {
            this.onChange(e);
        }

        this.props.updateUI({
            expectedOutcome: value
        })
    }

    uploadImageCallBack(file) {
        return Services.uploadFiles(file, file.name);
    }

    updateInitialEditorValue(editorName) {
        if (this.props.testCase[editorName]) {
            const html = htmlToDraft(this.props.testCase[editorName]);
            if (html) {
                const contentState = ContentState.createFromBlockArray(html.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.props.updateUI({
                    [editorName]: editorState
                })
            } else {
                this.props.updateUI({
                    [editorName]: EditorState.createEmpty()
                });
            }
        } else {
            this.props.updateUI({
                [editorName]: EditorState.createEmpty()
            });
        }
    }

    deleteTestCase(testCaseID: number) {
        this.props.deleteTestCase(testCaseID);
        this.props.updateMaxPoints();
    }

    componentDidMount() {
        this.updateInitialEditorValue("scenario");
        this.updateInitialEditorValue("expectedOutcome");
    }

    render() {
        const { testCase, editTestCase, saveTestCase, deleteTestCase, ui, updateUI, fieldDescriptions } = this.props;
        testCase.isInEditMode = testCase.isInEditMode === undefined ? false : testCase.isInEditMode;
        const checkBoxStyle = {
            color: "green"
        }
        return (
            <div className="card">
                <div className="card-header" data-role="tab" id="headingOne">
                    <h5 className="mb-0">
                        <a data-toggle="collapse"
                            href={"#collapse" + testCase.id}
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            className="pull-left"
                            onClick={() => editTestCase(testCase)}>
                            {testCase.title || "New test case " + testCase.id}
                        </a>
                        <div className="pull-right">
                            <a href="javascript:void(0);"><i className="material-icons"
                                onClick={() => this.deleteTestCase(testCase.id)}>delete</i></a>
                            {!testCase.isInEditMode &&
                                <a href="javascript:void(0);"><i className="material-icons"
                                    onClick={() => editTestCase(testCase)}>mode_edit</i></a>
                            }
                            {testCase.isInEditMode &&
                                <a href="javascript:void(0);" className="check_ico"
                                    onClick={() => saveTestCase(testCase, "test-case-form" + testCase.id)}>
                                    <i className="material-icons" style={checkBoxStyle}>check</i>
                                </a>}
                        </div>
                    </h5>
                </div>
                <div id={"collapse" + testCase.id}
                    data-role="tabpanel"
                    className={testCase.isInEditMode ? "collapse in" : "collapse"}
                    aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">  
                        <div className="testcase_details">
                        <form id={"test-case-form" + testCase.id}>
                            <div className="col-md-12 register_input">
                                <input className="inputMaterial" type="text"
                                    onChange={this.onChange} name="title"
                                    value={testCase.title || ""}
                                    data-validations={[required]}
                                    data-container-name="test-case-title"
                                    id={"test-case-title" + testCase.id}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Test case title*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.TITLE]}
                                </span>
                            </div>
                            <div className="col-md-12 register_input textarea-custom">
                                <textarea className="inputMaterial"
                                    onChange={this.onChange}
                                    name="description"
                                    id={"test-case-description" + testCase.id}
                                    value={testCase.description || ""}
                                    data-validations={[required]} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label className="disc_lable">Description*</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.ELITE_DESCRIPTION]}
                                </span>
                            </div>
                            <div className="col-md-12 register_input">
                                <div data-validations={[required]} className="custom-select" id={"test-case-type" + testCase.id}>
                                    <Select
                                        id={"test-case-type" + testCase.id}
                                        onBlurResetsInput={false}
                                        onSelectResetsInput={false}
                                        autoFocus
                                        options={this.testCaseTypes}
                                        simpleValue
                                        clearable={true}
                                        name="testCaseType"
                                        value={testCase.testCaseType}
                                        onChange={(value) => this.selectControlChange(value, "test-case-type" + testCase.id, "testCaseType")}
                                        rtl={false}
                                        searchable={false}
                                    />
                                </div>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.TYPE]}
                                </span>
                                <label className="disc_lable">Test case type*</label>
                            </div>

                            <div className="col-md-12 custom-editor" id="scenario">
                                {ui.scenario &&
                                    <Editor
                                        editorState={ui.scenario}
                                        toolbarOnFocus
                                        toolbarClassName="rte-toolbar"
                                        wrapperClassName="rte-wrapper"
                                        editorClassName="rte-editor"
                                        onEditorStateChange={this.onScenarioChange}
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            history: { inDropdown: true },
                                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                                        }}
                                    />
                                }
                                <label className="disc_lable">Scenario</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.SCENARIO]}
                                </span>
                            </div>
                            <div className="col-md-12 custom-editor" id="expectedOutcome">
                                {ui.expectedOutcome &&
                                    <Editor
                                        editorState={ui.expectedOutcome}
                                        toolbarOnFocus
                                        toolbarClassName="rte-toolbar"
                                        wrapperClassName="rte-wrapper"
                                        editorClassName="rte-editor"
                                        onEditorStateChange={this.onExpectedOutcomeChange}
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            history: { inDropdown: true },
                                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                                        }}
                                    />
                                }
                                <label className="disc_lable">Expected outcome</label>
                                <span className="help-text">
                                    {fieldDescriptions && fieldDescriptions[Constants.Columns.TEST_CASE_OUTCOME]}
                                </span>
                            </div>
                        </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default TestCasesForm;
