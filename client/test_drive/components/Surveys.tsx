import * as React from 'react';
import { TestDrive, IState, Question } from '../model';
import SurveyForm from './SurveyForm';
import {ColumnsValues} from '../../common/services/constants';
import {
    model,
    saveQuestion,
    editQuestion,
    deleteQuestion,
    updateQuestion
} from '../../test_drive';

interface SurveysProps {
    questions: Question[];
    newQuestion: Question;
    addQuestion: () => any;
    deleteQuestion: (id: number) => any;
    saveQuestion: (question: Question, formID: string) => any;
    editQuestion: (question: Question) => any;
    onChange: (event: any, question: Question) => any;
    saveTestDrive: (testDrive: TestDrive, formID: string) => any;
    testDrive: TestDrive;
    updateUI: (any) => any;
    ui: any;
    loadQuestions: (questionIds: number[]) => any
    questionIds: number[];   
    fieldDescriptions: any;
};

class Surveys extends React.Component<SurveysProps> {
    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        //  this.handleEdit = this.handleEdit.bind(this);
    }

    onSubmit(){
        var testDrive = this.props.testDrive;
        testDrive.status = ColumnsValues.SUBMIT;
        this.props.saveTestDrive(testDrive, "test-drive-form" + testDrive.id)
    }

    componentDidMount(){
        const questions = this.props.questions;
        if(!questions || questions.length == 0){
            this.props.loadQuestions(this.props.questionIds);
        }   
    }

    render() {
        const { 
            testDrive,
            questions,
            saveQuestion,
            editQuestion,
            onChange,
            newQuestion,
            deleteQuestion,
            addQuestion,
            saveTestDrive,
            ui,
            updateUI,
            fieldDescriptions
        } = this.props;
        return (
            <div className="test-case-container col-xs-12">
                <div className="add-button col-md-2 add_test pull-right text-right">
                    <a href="javascript:void(0);" onClick={addQuestion}> + add Question </a>
                </div>
                <div className="col-md-12">
                    {
                        questions && questions.map(question => {
                            return <SurveyForm
                                question={(question && question.isInEditMode) ? 
                                    { ...newQuestion, isInEditMode: true } : question}
                                saveQuestion={saveQuestion}
                                editQuestion={editQuestion}
                                deleteQuestion={deleteQuestion}
                                onChange={onChange}
                                updateUI={updateUI}
                                ui={ui}
                                key={question.id}
                                fieldDescriptions={fieldDescriptions}
                            />
                        })
                    }
                </div>
                
                <div className="col-md-12">
                    <input type="button" value="Save as a draft" className="button type1 nextBtn btn-lg pull-right"
                        onClick={() => { saveTestDrive(testDrive, "test-drive-form" + testDrive.id)}} />
                        <input type="button" value="Done" className="button type1 nextBtn btn-lg pull-right"
                        onClick={this.onSubmit} />
                </div>
            </div>
        );
    }
}

export default Surveys;
