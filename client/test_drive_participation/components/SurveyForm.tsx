import * as React from 'react';
import { Link } from "react-router-dom";

interface SurveyFormProps {

};
class SurveyForm extends React.Component<SurveyFormProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 SurveyForm">
            <p className="text-right">&copy; 2018 Equinix inc. All rights reserved.</p>
        </div>)
    }
}

export default SurveyForm;
