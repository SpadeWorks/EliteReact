import * as React from 'react';
import { Link } from "react-router-dom";

interface HomeCenterDetailsProps {

};
class HomeCenterDetails extends React.Component<HomeCenterDetailsProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 users-count-meter">
            <div className="col-md-2">
                <div className="row tuser_count">
                    <div className="col-md-12 text-center">
                        <h4>TOTAL USERS</h4>
                    </div>
                    <div className="col-md-12 text-center">
                        <h2>1547</h2>
                    </div>
                </div>
            </div>
            <div className="col-md-1">
                <div id="jqmeter-vertical2"></div>
            </div>
            <div className="col-md-6">
                <div className="c_ride">
                    <div className="col-md-3">
                        <div className="col-md-12 text-center">
                            <h4>TEST DRIEVES COMPLETED</h4>
                        </div>
                        <div className="col-md-12 text-center">
                            <h2>1547</h2>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="current_ridebox">
                            <div className="col-md-12 text-center">
                                <h4>YOUR CURRENT RIDE</h4>
                            </div>
                            <div className="col-md-12 text-center">
                                <img src={""} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-md-12 text-center">
                            <h4>TOTAL USERS</h4>
                        </div>
                        <div className="col-md-12">
                            <h2>1547</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3 t_testdrive">
                <h4>TOTAL TEST DRIVES</h4>
                <div id="outer">
                    <div id="inner">
                    </div>
                </div>
                <div className="tdrivecount">
                    <h3>540</h3>
                </div>
                <div className="total_tasks">
                    <h4>TOTAL TASKS</h4>
                    <div className="number">
                        <canvas id="canvas" width="100" height="100"></canvas>
                        <h3>1200</h3>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default HomeCenterDetails;
