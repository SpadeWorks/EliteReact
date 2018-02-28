import * as React from 'react';
import ui from 'redux-ui';
import * as $ from 'jquery';
import '../../js/jqmeter.js';

interface OverallPointsDashboardProps {
    totalUsers: number;
    testDrivesCompleted: number;
    currentRideImage: string;
    pointsEarned: number;
    totalTestDrives: number;
    totalTasks: number;
};

interface OverallPointsDashboardState {
}

class OverallPointsDashboard extends React.Component<OverallPointsDashboardProps> {

    componentDidUpdate() {
        /*var jqmeter = $("#jqmeter-vertical2");
            if (jqmeter.length) {
        $('#jqmeter-vertical2').jQMeter({
            goal: '$1,000',
            raised: '$200',
            meterOrientation: 'vertical',
            width: '50px',
            height: '200px'
        });    
    }*/
    }

    render() {
        return (<div>{
            <div className="col-md-12 overall_box">
                <div className="col-md-2">
                    <div className="row tuser_count">
                        <div className="col-md-12 text-center">
                            <h4>TOTAL USERS</h4>
                        </div>
                        <div className="col-md-12 text-center">
                            <h2>{this.props.totalUsers}</h2></div>
                    </div>
                </div>
                <div className="col-md-1 text-center">
                    {/* <div id="jqmeter-vertical2"></div> */}

                    <img src="/sites/elite/Style%20Library/Elite/images/meter.png" />
                </div>
                <div className="col-md-6">
                    <div className="c_ride">
                        <div className="col-md-3">
                            <div className="col-md-12 text-center">
                                <h4>TEST DRIVES COMPLETED</h4>
                            </div>
                            <div className="col-md-12 text-center">
                                <h2>{this.props.testDrivesCompleted}</h2>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="current_ridebox">
                                <div className="col-md-12 text-center">
                                    <h4>YOUR CURRENT RIDE</h4>
                                </div>
                                <div className="col-md-12 text-center">
                                    <img src={this.props.currentRideImage} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="col-md-12 text-center">
                                <h4>POINTS EARNED</h4>
                            </div>
                            <div className="col-md-12">
                                <h2>{this.props.pointsEarned}</h2>
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
                        <h3>{this.props.totalTestDrives}</h3>
                    </div>
                    <div className="total_tasks">
                        <h4>TOTAL TASKS</h4>
                        <div className="number">
                            <canvas id="total-task-canvas" width="100" height="100"></canvas>
                            <h3>{this.props.totalTasks}</h3>
                        </div>
                    </div>
                </div>
            </div>
        }</div>);
    }
}

export default OverallPointsDashboard;