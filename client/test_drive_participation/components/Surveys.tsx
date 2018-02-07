import * as React from 'react';
import { Link } from "react-router-dom";

interface SurveysProps {

};
class Surveys extends React.Component<SurveysProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 Surveys">
            <p className="text-right">&copy; 2018 Equinix inc. All rights reserved.</p>
        </div>)
    }
}

export default Surveys;
