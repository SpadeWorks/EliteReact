import * as React from 'react';
import { TestDrive, IState, TestCase } from '../model';
import TestCaseForm from './TestCaseForm';

import {
    model,
    saveTestCase,
    editTestCase,
    deleteTestCase,
    updateTestCase
} from '../../test_drive';

interface TestCasesProps {
    testCases: TestCase[];
    newTestCase: TestCase;
    addTestCase: () => any;
    deleteTestCase: (id: number) => any;
    saveTestCase: (testCase: TestCase) => any;
    editTestCase: (TestCase: TestCase) => any;
    onChange: (event: any, TestCase: TestCase) => any;
    saveTestDrive: (testDrive: TestDrive) => any;
    testDrive: TestDrive;
    updateUI: (any) => any;
    ui: any;
};

class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);
        //  this.handleEdit = this.handleEdit.bind(this);
    }

    render() {
        const { 
            testDrive,
            testCases,
            saveTestCase,
            editTestCase,
            onChange,
            newTestCase,
            deleteTestCase,
            addTestCase,
            saveTestDrive,
            ui,
            updateUI
        } = this.props;
        return (
            <div className="test-case-container col-xs-12">
                <div className="add-button col-md-2 add_test pull-right text-right">
                    <a href="#" onClick={addTestCase}> + add test case </a>
                </div>
                <div className="col-md-12">
                    {
                        testCases && testCases.map(testCase => {
                            return <TestCaseForm
                                testCase={(testCase && testCase.isInEditMode) ? { ...newTestCase, isInEditMode: true } : testCase}
                                saveTestCase={saveTestCase}
                                editTestCase={editTestCase}
                                deleteTestCase={deleteTestCase}
                                onChange={onChange}
                                key={testCase.id}
                                ui={ui}
                                updateUI={updateUI}
                            />
                        })
                    }
                </div>
                
                <div className="col-md-12">

                    <input type="button" value="Next" className="button type1 nextBtn btn-lg pull-right" />
                    <input type="button" value="Save" className="button type1 nextBtn btn-lg pull-right"
                        onClick={() => { saveTestDrive(testDrive) }} />
                </div>
            </div>
        );
    }
}

export default TestCases;
