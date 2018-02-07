import * as React from 'react';
import { Link } from "react-router-dom";
import { TestCaseInstance, QuestionInstance } from '../../test_drive_participation/model';
import QuestionForm from './QuestionForm';
import * as $ from 'jquery';
interface SurveyProps {
    Questions: QuestionInstance[];
    saveQuestionResponse: (question: QuestionInstance) => any;
    updateUI: (any) => any;
    ui: any;
};
class Survey extends React.Component<SurveyProps> {
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
        const { Questions, saveQuestionResponse, ui, updateUI } = this.props;
        return (
            <div className="col-md-12">
                <div id="carousel-example-vertical" className="carousel vertical slide" data-ride="carousel" data-interval="false">
                    <div className="carousel-inner " role="listbox ">
                        {
                            Questions &&
                            Questions.length &&
                            Questions.map((question, index) => {
                                return (<QuestionForm
                                    key={index}
                                    active={index == 0 ? true : false}
                                    question={question}
                                    saveQuestionResponse={(survey) => saveQuestionResponse(survey)}
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

export default Survey;



