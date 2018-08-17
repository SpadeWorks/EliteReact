import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance, QuestionInstance } from '../../test_drive_participation/model';
import RegistrationForm from './RegistrationForm';
import * as $ from 'jquery';
import Services from '../../common/services/services';
import * as Constants from '../../common/services/constants';
import Popup from '../../common/components/Popups';
interface RegistrationProps {
    
    questions: QuestionInstance[];
    testDriveInstance: TestDriveInstance;
    saveQuestionResponse: (question: QuestionInstance) => any;
    loadQuestions: (testDriveID: number, questionIDs: number[], userID: number) => any;
    updateUI: (any) => any;
    ui: any;
    updatePoints: (testDriveInstance: TestDriveInstance) => any;
};
class Registration extends React.Component<RegistrationProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let question = this.props.testDriveInstance.questions;
        let testDrive = this.props.testDriveInstance;
        let userID = Services.getCurrentUserID();
        this.props.loadQuestions(testDrive.testDriveID, testDrive.questionIDs, userID);
        $('#carousel-question-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('prev');
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
        name: 'Test drive center',
        link: '/testdrives'
    }
    ]

    render() {
        const { questions, saveQuestionResponse, ui, updateUI, testDriveInstance, updatePoints} = this.props;
        return (
            <div className="col-md-12">
                <div>
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
                                    return (<RegistrationForm
                                        testDriveInstance={testDriveInstance}
                                        isLast={index == questions.length - 1}
                                        key={index}
                                        active={index == 0 ? true : false}
                                        question={question}
                                        saveQuestionResponse={(Registration) => saveQuestionResponse(Registration)}
                                        ui={ui}
                                        updateUI={updateUI}
                                        index={index}
                                        />)
                                })
                            }
                            <Popup popupId="PopTheFizz" title={"Congratulations!"}
                                body={ui.requirmentMessage}
                                buttons={this.popTheFizzButtons} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;



