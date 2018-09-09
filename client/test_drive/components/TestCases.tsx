import * as React from 'react';
import { TestDrive, IState, TestCase } from '../model';
import TestCaseForm from './TestCaseForm';
import Services from '../../common/services/services';
import ui from 'redux-ui';
import { validateControl, required, validateForm } from '../../common/components/Validations';
import { ToastContainer, toast } from 'react-toastify';
import * as $ from 'jquery';
import Popup from '../../common/components/Popups';
import { ColumnsValues } from '../../common/services/constants';
import { Messages } from '../../common/services/constants';
import {
    model,
    saveTestCase,
    editTestCase,
    deleteTestCase,
    updateTestCase
} from '../../test_drive';

interface TestCasesProps {
    testCaseIds: number[];
    testCases: TestCase[];
    newTestCase: TestCase;
    addTestCase: () => any;
    updateMaxPoints: () => any;
    deleteTestCase: (id: number) => any;
    saveTestCase: (testCase: TestCase, formID: string) => any;
    editTestCase: (TestCase: TestCase) => any;
    onChange: (event: any, TestCase: TestCase) => any;
    saveTestDrive: (testDrive: TestDrive, formID: string, action: string) => any;
    loadTestCases: (testCasesIds: number[]) => any
    switchTab: (tabName, formID: string, testDrive: TestDrive) => any;
    fieldDescriptions: any;
    testDrive: TestDrive;
    currentUserRole: string;
    approveTestDrive: (any) => any;
    updateUI: (any) => any;
    ui: any;
    view: string;
};

@ui({
    state: {
        helpText: '',
        requirmentMessage: '',
        title: ""
    }
})
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
        this.switchTab = this.switchTab.bind(this);
        this.getHelpText = this.getHelpText.bind(this);
    }

    switchTab(direction) {
        // this.props.saveTestDrive(this.props.testDrive, "test-drive-form" + this.props.testDrive.id);
        var isFormValid = validateForm("test-drive-form" + this.props.testDrive.id);
        if (isFormValid) {
            this.props.updateUI({ activeTab: this.props.ui.activeTab + direction });
        } else {
            //Popup.alert(Messages.TEST_DRIVE_ERROR);
            this.props.updateUI({ requirmentMessage: Messages.TEST_DRIVE_ERROR, title: "Alert!" });
            $("#popupTestCasesAlert").trigger('click');
        }

    }

    componentDidMount() {
        const testCase = this.props.testCases;
        // if (!testCase || testCase.length == 0) {
        this.props.loadTestCases(this.props.testCaseIds);
        // }
        this.getHelpText();
    }
    getHelpText() {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            this.props.updateUI({ helpText: appConfig.TestCaseHelpText });
        })
    }

    testCasesAlertButtons = [{
        name: 'Ok',
        link: '#'
    }
    ]

    render() {
        const {
            testDrive,
            testCases,
            saveTestCase,
            editTestCase,
            onChange,
            newTestCase,
            deleteTestCase,
            updateMaxPoints,
            addTestCase,
            saveTestDrive,
            ui,
            updateUI,
            fieldDescriptions,
            view,
            currentUserRole,
            approveTestDrive,
            switchTab
        } = this.props;
        return (
            <div className="test-case-container col-xs-12">
                <Popup popupId="TestCasesAlert" title={ui.title}
                    body={ui.requirmentMessage}
                    buttons={this.testCasesAlertButtons} />
                <div className="col-md-8 sample_text">
                    <p>{ui.helpText}</p>
                </div>
                <div className="add-button col-md-2 add_test pull-right text-right">
                    <a href="javascript:;" onClick={addTestCase}> + ADD TEST CASE </a>
                </div>
                <div className="col-md-12">
                    {
                        testCases && testCases.map(testCase => {
                            return <TestCaseForm
                                testCase={(testCase && testCase.isInEditMode) ? { ...newTestCase, isInEditMode: true } : testCase}
                                saveTestCase={saveTestCase}
                                editTestCase={editTestCase}
                                deleteTestCase={deleteTestCase}
                                updateMaxPoints={updateMaxPoints}
                                onChange={onChange}
                                key={testCase.id}
                                ui={ui}
                                updateUI={updateUI}
                                fieldDescriptions={fieldDescriptions}
                            />
                        })
                    }
                </div>

                <div className="col-md-12 testdrive_actionbox">
                    <div className="button type1 nextBtn btn-lg animated_button pull-left left_mnone">
                        <input type="button" value="Back" disabled={ui.saveLoading}
                            onClick={() => switchTab(-1, "test-drive-form" + this.props.testDrive.id, testDrive)} />
                    </div>
                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <input type="button" value="Next" disabled={ui.saveLoading}
                            onClick={() => switchTab(1, "test-drive-form" + this.props.testDrive.id, testDrive)} />
                    </div>

                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <input disabled={ui.saveLoading}
                            type="button" value="Save as a draft"
                            onClick={() => { saveTestDrive(testDrive, "test-drive-form" + testDrive.id, "save") }} />
                    </div>

                    {testDrive.status == ColumnsValues.SUBMIT ||
                        testDrive.changeStatus == ColumnsValues.CHANGE_SUBMITTED &&
                        currentUserRole == ColumnsValues.SITE_OWNER ?
                        <div className="button type1 nextBtn btn-lg pull-right animated_button">
                            <input type="button" value="Approve"
                                disabled={ui.saveTestDriveApprovalLoading}
                                onClick={() => this.props.saveTestDrive(testDrive, "test-drive-form" + testDrive.id, "approve")} />
                        </div>
                        : ''
                    }
                </div>
            </div>
        );
    }
}

export default TestCases;
