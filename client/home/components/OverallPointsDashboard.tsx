import * as React from 'react';
import ui from 'redux-ui';
import * as $ from 'jquery';
import '../../js/jqmeter.js';
<<<<<<< HEAD
import Services from '../../common/services/services';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

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
<<<<<<< HEAD
        var self = this;
        Services.getApplicationConfigurations().then((appConfig: any) => {
            var jqmeter = $("#totalUsers");
            if (jqmeter.length) {
                $('#totalUsers').jQMeter({
                    goal: '$' + appConfig.TotalUsers,
                    raised: '$' + self.props.totalUsers,
                    meterOrientation: 'vertical',
                    width: '50px',
                    height: '200px'
                });
            }
        });


=======
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
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    render() {
        return (<div>{
            <div className="col-md-12 overall_box line_box">
                <div className="col-md-2">
                    <div className="row tuser_count">
                        <div className="col-md-12 text-center">
                            <h4>TOTAL USERS</h4>
                        </div>
                        <div className="col-md-12 text-center">
                            <h2>{this.props.totalUsers}</h2></div>
                    </div>
                </div>
                <div className="col-md-1 meter text-center">
<<<<<<< HEAD
                    <div id="totalUsers"></div>
=======
                    {/* <div id="jqmeter-vertical2"></div> */}

                    <img src="/sites/elite/Style%20Library/Elite/images/meter.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
                            <div className="col-md-12 text-right">
                                <h4>POINTS EARNED</h4>
                            </div>
                            <div className="col-md-12 text-right">
                                <h2>{this.props.pointsEarned}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 t_testdrive">
                    <div className="row">
                        <div className="col-md-7">
                            <h4>TOTAL TEST DRIVES</h4>
                            <div id="outer">
                                <div id="inner">
                                    <img src="/Style%20Library/Elite/images/dash-loader-in.png" className="img-responsive" />
                                </div>
                            </div>
                            <div className="tdrivecount">
                                <h3>{this.props.totalTestDrives}</h3>
                            </div>
                        </div>


                        <div className="col-md-4 text-center">
                            <div className="row">
                                <div className="total_tasks text-left">
                                    <h4 className="text-left">TOTAL TASKS</h4>
                                    <div className="number">
                                        <canvas id="total-task-canvas" width="100" height="100"></canvas>
                                        <img src="/Style%20Library/Elite/images/rotate.png" className="img-responsive" />
                                        <h3>{this.props.totalTasks}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        }</div>);
    }
}

export default OverallPointsDashboard;