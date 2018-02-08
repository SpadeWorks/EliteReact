import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, TestDriveInstance} from '../../test_drive_participation/model';
import TestCaseForm from './TestCaseForm';
import * as $ from 'jquery';
interface TestCasesProps {
    testDriveInstance: TestDriveInstance;
    testCases: TestCaseInstance[];
    saveTestCaseResponse: (testCase: TestCaseInstance, testDrive: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
};
class TestCases extends React.Component<TestCasesProps> {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        $('#carousel-example-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('next');
                $('#carousel-example-vertical').carousel({
                    interval: 3000
                });
            }
            else {
                $(this).carousel('prev');
            }
        });
    }
    render() {
        const { testCases, saveTestCaseResponse, ui, updateUI, testDriveInstance } = this.props;
        return (
            <div className="col-md-12">
                <div id="carousel-example-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                    <div className="carousel-inner " role="listbox ">
                        {
                            testCases &&
                            testCases.length &&
                            testCases.map((testCase, index) => {
                                return (<TestCaseForm
                                    testDriveInstance = {testDriveInstance}
                                    key={index}
                                    active={index == 0 ? true : false}
                                    testCase={testCase}
                                    saveTestCaseResponse={(testCase, testDrive) => 
                                        saveTestCaseResponse(testCase, testDrive)}
                                    ui={ui}
                                    updateUI={updateUI} />)
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TestCases;



