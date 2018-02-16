import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance, QuestionInstance } from '../../test_drive_participation/model';
import QuestionForm from './QuestionForm';
import * as $ from 'jquery';
import Services from '../../common/services/services';
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
        if (this.isTestDriveCompleted() && !testDrive.questionLoaded) {
            this.props.loadQuestions(testDrive.testDriveID, testDrive.questionIDs, userID);
        }

        $('#carousel-question-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('prev');
                $('#carousel-question-vertical').carousel({
                    interval: 3000
                });
            }
            else {
                $(this).carousel('next');
            }
        });
    }
    render() {
        const { questions, saveQuestionResponse, ui, updateUI } = this.props;
        return (
            <div className="col-md-12">
                {this.isTestDriveCompleted() &&
                    <div id="carousel-question-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                        <div className="carousel-inner " role="listbox ">
                            {
                                questions &&
                                questions.length &&
                                questions.map((question, index) => {
                                    return (<QuestionForm
                                        key={index}
                                        active={index == 0 ? true : false}
                                        question={question}
                                        saveQuestionResponse={(survey) => saveQuestionResponse(survey)}
                                        ui={ui}
                                        updateUI={updateUI}
                                        showSurvey={this.isTestDriveCompleted()} />)
                                })
                            }
                        </div>
                    </div>
                }
                {
                    !this.isTestDriveCompleted() && <div>
                        <h3>Survey will open once you complete all the test cases.</h3>    
                    </div>
                }
            </div>
        )
    }
}

export default Survey;



