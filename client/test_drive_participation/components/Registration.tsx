import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance, QuestionInstance, RegistrationQuestionInstance } from '../../test_drive_participation/model';
import RegistrationForm from './RegistrationForm';
import * as $ from 'jquery';
import Services from '../../common/services/services';
import * as Constants from '../../common/services/constants';
import Popup from '../../common/components/Popups';
interface RegistrationProps {

    questions: RegistrationQuestionInstance[];
    testDriveInstance: TestDriveInstance;
    saveQuestionResponse: (question: RegistrationQuestionInstance) => any;
    updateUI: (any) => any;
    ui: any;
};
class Registration extends React.Component<RegistrationProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let question = this.props.testDriveInstance.registrationQuestions;
        let testDrive = this.props.testDriveInstance;
        let userID = Services.getCurrentUserID();

        $('#carousel-registration-question-vertical').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                $(this).carousel('prev');
            }
            else {
                $(this).carousel('next');
            }
        });

        $('#carousel-registration-question-vertical').carousel({
            wrap: false
        });

    }
    
    render() {
        const { questions, saveQuestionResponse, ui, updateUI, testDriveInstance } = this.props;
        return (
            <div className="col-md-12">
                {
                    testDriveInstance.testDriveStatus === Constants.ColumnsValues.REGISTRATION_STARTED ?

                        <div>
                            <div id="carousel-registration-question-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                                <div className="testcase_no " id="registration-questions">
                                    <ul className="task_circle carousel-indicators">
                                        {
                                            questions &&
                                            questions.length &&
                                            questions.map((question, index) => {
                                                return (<li key={index} data-target="#carousel-registration-question-vertical" data-slide-to={index} className={index == 0 ? 'active' : ''}>
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
                                </div>
                            </div>
                        </div>
                        : <div className="col-md-12">
                            <div className="text-center holdon_msgbox">

                                <img src="/Style%20Library/Elite/images/signal.png" />

                                <h5>Hold on there, Cowboy !</h5>

                                <p>{Constants.Messages.REGISTRATION_ENDED}</p>

                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Registration;



