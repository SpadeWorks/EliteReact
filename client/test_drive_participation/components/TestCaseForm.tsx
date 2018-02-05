import * as React from 'react';
import ui from 'redux-ui';
import Select from 'react-select';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-select/dist/react-select.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TestDriveInstance, IState, TestCase } from '../model';
import { Services } from '../../common/services/data_service';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { unemojify } from "node-emoji";
interface TestCaseFormProps {
    testCase: TestCase,
    deleteTestCase: (id: number) => any;
    saveTestCase: (testCase: TestCase) => any;
    editTestCase: (TestCase: TestCase) => any;
    onChange: (event: any, TestCase: TestCase) => any;
    updateMaxPoints: () => any;
    updateUI: (any) => any;
    ui: any;
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
        this.updateTestCaseType = this.updateTestCaseType.bind(this);
        this.onScenarioChange = this.onScenarioChange.bind(this);
        this.onExpectedOutcomeChange = this.onExpectedOutcomeChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.testCase);
    }

    testCaseTypes = [
        { value: 'Positive', label: 'Positive' },
        { value: 'Negative', label: 'Negative' },
    ]

    updateTestCaseType(value) {
        let e = {
            target: {
                type: 'custom-select',
                name: 'testCaseType',
                value: value
            }
        };
        this.onChange(e);
    }

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
        const { testCase, editTestCase, saveTestCase, deleteTestCase, ui, updateUI } = this.props;
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
                            {testCase.title}

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
                                    onClick={() => saveTestCase(testCase)}>
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.

                        <form>
                            <div className="col-md-12 register_input">

                                <input className="inputMaterial" type="text"
                                    onChange={this.onChange} name="title"
                                    value={testCase.title || ""}
                                    required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Test drive title</label>
                            </div>
                            <div className="col-md-12 register_input">
                                <textarea className="inputMaterial"
                                    onChange={this.onChange}
                                    name="description"
                                    value={testCase.description || ""}
                                    required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label className="disc_lable">Description</label>
                            </div>
                            <h5>Test Case Type</h5>
                            <Select
                                id="question-type"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                autoFocus
                                options={this.testCaseTypes}
                                simpleValue
                                clearable={true}
                                name="question-type"
                                value={testCase.testCaseType}
                                onChange={this.updateTestCaseType}
                                rtl={false}
                                searchable={false}
                            />
                            <h5>Scenario</h5>
                            <div id="scenario">
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
                            </div>
                            <h5>Expected Outcome</h5>
                            <div id="expectedOutcome">
                                {ui.expectedOutcome &&
                                    <Editor
                                        /*editorState={ui.expectedOutcome}*/
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
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestCasesForm;
