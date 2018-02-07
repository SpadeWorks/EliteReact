import * as React from 'react';
import { Link } from "react-router-dom";

interface OverViewProps {

};
class OverView extends React.Component<OverViewProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="row overview ">
            <div className="container ">
                <div className="col-md-10 col-md-offset-1 ">
                    <div className="col-md-3 ">
                        <div className="row ">
                            <div className="col-md-12 ">
                                <p><span className="orange "><i>1</i></span> of 8</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title ">Test case completed</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row ">
                            <div className="col-md-12 ">
                                <p><span className="orange "><i>1</i></span> of 8</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title ">Test case completed</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row ">
                            <div className="col-md-12 testcase_title ">
                                <p className="inactive ">Mar 13, 2018</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title ">Test drive end date</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row ">
                            <div className="col-md-12 ">
                                <p>Mar 13, 2018</p>
                            </div>
                            <div className="col-md-12 ">
                                <h4 className="testcase_title ">Test drive end date</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 navigation_box ">
                    <div className="row ">
                        <div className="col-md-6 ">
                            <a className="up carousel-control " href="#carousel-example-vertical" role="button" data-slide="prev ">
                                <span className="glyphicon glyphicon-chevron-up " aria-hidden="true "></span>
                                <span className="sr-only ">Previous</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <a className="down carousel-control " href="#carousel-example-vertical" role="button" data-slide="next ">
                            <span className="glyphicon glyphicon-chevron-down " aria-hidden="true "></span>
                            <span className="sr-only ">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default OverView;