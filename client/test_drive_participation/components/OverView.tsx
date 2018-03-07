import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance } from '../../test_drive_participation/model';
import Services from '../../common/services/services';
import * as $ from 'jquery';
import * as Constants from '../../common/services/constants';
interface OverViewProps {
    testDriveInstance: TestDriveInstance;
    updateUI: (any) => any;
    ui: any;
};

class OverView extends React.Component<OverViewProps> {
    constructor(props, context) {
        super(props, context);

    }

    getCompletedQuestionCount() {
        var question = this.props.testDriveInstance.questions
        var completedQuestions = question && question.length && question.filter(question => {
            return question.responseStatus == Constants.ColumnsValues.COMPLETE_STATUS;
        });
        if(completedQuestions)
            return completedQuestions.length;
        else
            return 0;
    }
    render() {
        const { testDriveInstance, ui, updateUI } = this.props;
        return (<div>{ui.activeTab != 'Description' && <div className="row overview ">
            <div className="container ">
                <div className="col-md-10 col-md-offset-1 ">
                
                    {
                        (ui.activeTab == 'test_Cases') && <div><div className="col-md-3 ">
                            <div className="row ">
                                <div className="col-md-12 ">
                                    <p><span className="orange "><i>
                                        {testDriveInstance.numberOfTestCasesCompleted}</i></span> of {testDriveInstance.testCases.length}
                                    </p>
                                </div>
                                <div className="col-md-12 ">
                                    <h4 className="testcase_title ">TEST CASE COMPLETED</h4>
                                </div>
                            </div>
                        </div>
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 ">
                                        <p><span className="orange "><i>{testDriveInstance.currentPoint}</i></span> of {testDriveInstance.maxPoints}</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">POINTS EARNED FOR TEST DRIVE</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        ui.activeTab == 'Servay_q' && <div><div className="col-md-3 ">
                            <div className="row ">
                                <div className="col-md-12 ">
                                    <p><span className="orange "><i>
                                        {this.getCompletedQuestionCount()}</i></span> of {testDriveInstance.questionIDs.length}
                                    </p>
                                </div>
                                <div className="col-md-12 ">
                                    <h4 className="testcase_title ">QUESTIONS COMPLETED</h4>
                                </div>
                            </div>
                        </div>
                            <div className="col-md-3 ">
                                <div className="row ">
                                    <div className="col-md-12 ">
                                        <p><span className="orange "><i>{testDriveInstance.currentPoint}</i></span> of {testDriveInstance.maxPoints}</p>
                                    </div>
                                    <div className="col-md-12 ">
                                        <h4 className="testcase_title ">POINTS EARNED FOR TEST DRIVE</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                    <div className="col-md-3 start_date">
                        <div className="row">
                            <div className="col-md-12 testcase_title">
                                <p className="inactive ">{Services.formatDate(testDriveInstance.startDate)}</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title">TEST DRIVE START DATE</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 end_date">
                        <div className="row ">
                            <div className="col-md-12 ">
                                <p>{Services.formatDate(testDriveInstance.endDate)}</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title ">TEST DRIVE END DATE</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 navigation_box ">
                    <div className="row ">
                        <div className="col-md-6 pull-left">
                            <a className="up carousel-control" href="javascript: void(0);"
                                onClick={() => $('#carousel-example-vertical').carousel('next')} role="button" data-slide="prev ">
                                <span className="glyphicon glyphicon-chevron-up " aria-hidden="true "></span>
                                <span className="sr-only ">Previous</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 pull-right">
                        <a className="down carousel-control" href="javascript: void(0);"
                            onClick={() => $('#carousel-example-vertical').carousel('prev')} role="button" data-slide="next ">
                            <span className="glyphicon glyphicon-chevron-down " aria-hidden="true "></span>
                            <span className="sr-only ">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>}
        </div>)
    }
}

export default OverView;