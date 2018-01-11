import * as React from 'react';
import { TestDrive, IState, TestCase } from '../model';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

interface TestCaseFormProps {
    testCase: TestCase,
    deleteTestCase: (id: number) => any;
    saveTestCase: (testCase: TestCase) => any;
    editTestCase: (TestCase: TestCase) => any;
    onChange: (event: any, TestCase: TestCase) => any;
};
interface TestCaseFormState {
    testCase,
    editTestCases
};

class TestCasesForm extends React.Component<TestCaseFormProps, TestCaseFormState> {
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
    }

    onChange = (e) => {
        this.props.onChange(e, this.props.onChange(e, this.props.testCase));
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

    render() {
        const { testCase, editTestCase, saveTestCase, deleteTestCase } = this.props;
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
                            <a href="#"><i className="material-icons"
                                onClick={() => deleteTestCase(testCase.id)}>delete</i></a>
                            {!testCase.isInEditMode &&
                                <a href="#"><i className="material-icons"
                                    onClick={() => editTestCase(testCase)}>mode_edit</i></a>
                            }
                            {testCase.isInEditMode &&
                                <a href="#" className="check_ico"
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestCasesForm;
