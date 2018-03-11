import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance, QuestionInstance } from '../../test_drive_participation/model';
import QuestionForm from './QuestionForm';
import * as $ from 'jquery';
import Services from '../../common/services/services';
import * as Constants from '../../common/services/constants';
import Popup from '../../common/components/Popups';
interface SurveyProps {
    questions: QuestionInstance[];
    testDriveInstance: TestDriveInstance;
    saveQuestionResponse: (question: QuestionInstance) => any;
    loadQuestions: (testDriveID: number, questionIDs: number[], userID: number) => any;
    updateUI: (any) => any;
    ui: any;
};
class Survey extends React.Component<SurveyProps> {
    constructor(props, context) {
        super(props, context);
        this.isTestDriveCompleted = this.isTestDriveCompleted.bind(this);
    }

    isTestDriveCompleted() {
        let testDrive = this.props.testDriveInstance;
        return testDrive.testCases.length == testDrive.numberOfTestCasesCompleted;
    }

    componentDidMount() {
        let question = this.props.testDriveInstance.questions;
        let testDrive = this.props.testDriveInstance;
        let userID = Services.getCurrentUserID();
        this.props.loadQuestions(testDrive.testDriveID, testDrive.questionIDs, userID);
        $('#carousel-question-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('prev');
                // $('#carousel-question-vertical').carousel({
                //     interval: 3000
                // });
            }
            else {
                $(this).carousel('next');
            }
        });

        $('#carousel-question-vertical').carousel({
            wrap: false
        });

    }   

    popTheFizzButtons = [{
        name: 'Home',
        link: '/'
    },
    {
        name: 'Test Drive Center',
        link: '/testdrives'
    }
    ]

    render() {
        const { questions, saveQuestionResponse, ui, updateUI, testDriveInstance } = this.props;
        return (
            <div className="col-md-12">            
                {this.isTestDriveCompleted() && <div>
                    <div id="carousel-question-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                        <div className="testcase_no " id="questions">
                            <ul className="task_circle carousel-indicators">
                                {
                                    questions &&
                                    questions.length &&
                                    questions.map((question, index) => {
                                        return (<li key={index} data-target="#carousel-question-vertical" data-slide-to={index} className={index == 0 ? 'active' : ''}>
                                            <p> {index + 1}. {question.responseStatus == Constants.ColumnsValues.DRAFT &&
                                                <img src={Constants.Globals.IMAGE_BASE_URL + "/empty.png"} className="img-responsive" />}
                                                {question.responseStatus == Constants.ColumnsValues.COMPLETE_STATUS &&
                                                    <img src={Constants.Globals.IMAGE_BASE_URL + "/done.png"} className="img-responsive" />}
                                            </p>
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>
                        <div className="carousel-inner " role="listbox ">
                            {
                                questions &&
                                questions.length &&
                                questions.map((question, index) => {
                                    return (<QuestionForm
                                        testDriveInstance= {testDriveInstance}
                                        isLast={index == questions.length - 1}
                                        key={index}
                                        active={index == 0 ? true : false}
                                        question={question}
                                        saveQuestionResponse={(survey) => saveQuestionResponse(survey)}
                                        ui={ui}
                                        updateUI={updateUI}
                                        showSurvey={this.isTestDriveCompleted()}
                                        index={index} />)
                                })
                            }
                            <Popup popupId="PopTheFizz" title={"Pop the fizz!"}
                                        body={ui.requirmentMessage}
                                        buttons={this.popTheFizzButtons} />
                        </div>
                    </div>
                </div>
                }
                {
                    !this.isTestDriveCompleted() && <div>
                         <div className="text-center holdon_msgbox">
     
                         <img src="/Style%20Library/Elite/images/signal.png" />
     
     <h5>Hold on there, Cowboy !</h5>
     
     <p> Servay questions will be unlocked once you submit your testcase result.</p>
     
     
     
     
     
             
           </div>
                    </div>
                }                                 
            </div>
        )
    }
}

export default Survey;



