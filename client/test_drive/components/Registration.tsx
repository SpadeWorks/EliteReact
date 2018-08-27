import * as React from 'react';
import { TestDrive, IState, RegistrationQuestion } from '../model';
import { ColumnsValues } from '../../common/services/constants';
import Services from '../../common/services/services';
import ui from 'redux-ui';
import {
    model,
    saveRegistrationQuestion,
    editRegistrationQuestion,
    deleteRegistrationQuestion,
    updateRegistrationQuestion,
    switchTab
} from '../../test_drive';
import RegistrationForm from './RegistrationForm';

interface RegistrationProps {
    registrationQuestions: RegistrationQuestion[];
    newRegistrationQuestion: RegistrationQuestion;
    addRegistrationQuestion: () => any;
    deleteRegistrationQuestion: (id: number) => any;
    saveRegistrationQuestion: (registrationQuestion: RegistrationQuestion, formID: string) => any;
    editRegistrationQuestion: (registrationQuestion: RegistrationQuestion) => any;
    onChange: (event: any, RegistrationQuestion: RegistrationQuestion) => any;
    saveTestDrive: (testDrive: TestDrive, formID: string, action: string) => any;
    testDrive: TestDrive;
    updateUI: (any) => any;
    ui: any;
    loadRegistrationQuestions: (registrationQuestionIds: number[]) => any
    registrationQuestionIds: number[];
    fieldDescriptions: any;
    view: string;
    currentUserRole: string;
    approveTestDrive: (any) => any;
    switchTab: (tabName, formID: string, testDrive: TestDrive) => any;
};
@ui({
    state: {
        helpText: ''
    }
})
class Registration extends React.Component<RegistrationProps> {
    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        this.getHelpText = this.getHelpText.bind(this);
        //  this.handleEdit = this.handleEdit.bind(this);
    }

    onSubmit() {
        this.props.updateUI({ saveLoading: true });
        var testDrive = this.props.testDrive;
        this.props.saveTestDrive(testDrive, "test-drive-form" + testDrive.id, "submit");
    }

    componentDidMount() {
        const registrationQuestions = this.props.registrationQuestions;
        if (!registrationQuestions || registrationQuestions.length == 0) {
            this.props.loadRegistrationQuestions(this.props.registrationQuestionIds);
        }
        this.getHelpText();
    }

    getHelpText() {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            this.props.updateUI({ helpText: appConfig.RegistrationQuestionHelpText });
        })
    }

    render() {
        const {
            testDrive,
            registrationQuestions,
            saveRegistrationQuestion,
            editRegistrationQuestion,
            onChange,
            newRegistrationQuestion,
            deleteRegistrationQuestion,
            addRegistrationQuestion,
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
                <div className="col-md-10 sample_text">
                    <p>{ui.helpText}</p>
                </div>
                <div className="add-button col-md-2 add_test pull-right text-right">
                    <a href="javascript:;" onClick={addRegistrationQuestion}> + ADD Question </a>
                </div>
                <div className="col-md-12">
                    {
                        registrationQuestions && registrationQuestions.map(registrationQuestion => {
                            return <RegistrationForm
                                registrationQuestion={(registrationQuestion && registrationQuestion.isInEditMode) ?
                                    { ...newRegistrationQuestion, isInEditMode: true } : registrationQuestion}
                                saveRegistrationQuestion={saveRegistrationQuestion}
                                editRegistrationQuestion={editRegistrationQuestion}
                                deleteRegistrationQuestion={deleteRegistrationQuestion}
                                onChange={onChange}
                                updateUI={updateUI}
                                ui={ui}
                                key={registrationQuestion.id}
                                fieldDescriptions={fieldDescriptions}
                            />
                        })
                    }
                </div>

                <div className="col-md-12 testdrive_actionbox">
                    <div className="button type1 nextBtn btn-lg animated_button pull-left left_mnone">
                        <input type="button" value="Back" disabled={ui.saveLoading}
                            onClick={() => switchTab(-1, "test-drive-form" + testDrive.id, testDrive)} />
                    </div>
                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <input type="button" value="Next" disabled={ui.saveLoading}
                        onClick={() => switchTab(1, "test-drive-form" + this.props.testDrive.id, testDrive)} />
                    </div>
                    {
                        testDrive.status == ColumnsValues.DRAFT && view && view.toUpperCase() == ColumnsValues.EDIT_VIEW ? 
                            <div className="button type1 nextBtn btn-lg pull-right animated_button">
                            <input type="button" value="Save as a draft" disabled={ui.saveLoading}
                                onClick={() => { saveTestDrive(testDrive, "test-drive-form" + testDrive.id, "save") }} />
                        </div> : ''
                    }

                    {testDrive.status == ColumnsValues.SUBMIT && currentUserRole == ColumnsValues.SITE_OWNER ?
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

export default Registration;
