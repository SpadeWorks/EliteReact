import * as React from 'react';
import ui from 'redux-ui';
import * as $ from 'jquery';
import Service from '../../common/services/services';

interface UpcomingTestDrivesProps {
    testDriveName: string;
    endDate: string;
    participants: number;
    testDriveId: number;
    checkPortion:string;
};

interface LeaderBoardUserState {

}

class UpcomingTestDrives extends React.Component<UpcomingTestDrivesProps> {
    openUpcomingTestDriveDialog(drivenoID) {
        Service.loadProgressBar("13", 0.75, 140, "upDriveCanvasPoints1");
        Service.loadProgressBar("14", 0.75, 140, "upDriveCanvasPoints2");
        Service.loadProgressBar("15", 0.75, 140, "upDriveCanvasPoints3");
        Service.loadProgressBar("16", 0.75, 140, "upDriveCanvasDrive1");
        Service.loadProgressBar("17", 0.75, 140, "upDriveCanvasDrive2");
        Service.loadProgressBar("18", 0.75, 140, "upDriveCanvasDrive3");
        Service.loadProgressBar("19", 0.75, 140, "activeDrivePointsCanvas1");
        Service.loadProgressBar("20", 0.75, 140, "activeDrivePointsCanvas2");
        Service.loadProgressBar("21", 0.75, 140, "activeDrivePointsCanvas3");
        Service.loadProgressBar("22", 0.75, 140, "activeDriveDriveCanvas1");
        Service.loadProgressBar("23", 0.75, 140, "activeDriveDriveCanvas2");
        Service.loadProgressBar("24", 0.75, 140, "activeDriveDriveCanvas3");
        var currentID = drivenoID.slice(0, -1);
        $("." + drivenoID + " .letest_drivebox2").addClass("box");
        $(".modal-backdrop").toggleClass("overlay");
        var isOpen = $(".modal-backdrop").hasClass("overlay");
        if (isOpen) {
            $(".modal-backdrop").css("display", "block");
        } else {
            $(".modal-backdrop").css("display", "none");
        }
        var isBox = $("." + drivenoID + " .letest_drivebox2").hasClass("box");
        if (isBox) {
            $(".white_circle1").toggleClass("white_circleclick");
            $(".lc_container2").toggleClass("lc_containerclick2");
            $(".letest_drivebox2").toggleClass("letest_driveboxclick_right");
            if (drivenoID == currentID+"3") {
                $("."+currentID+"1 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"1 .letest_drivebox2").removeClass("letest_driveboxclick_right");
                $("."+currentID+"2 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"2 .letest_drivebox2").removeClass("letest_driveboxclick_right");
            }
            else if (drivenoID == currentID+"2") {
                $("."+currentID+"1 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"1 .letest_drivebox2").removeClass("letest_driveboxclick_right");
                $("."+currentID+"3 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"3 .letest_drivebox2").removeClass("letest_driveboxclick_right");
            }
            else if (drivenoID == currentID+"1") {

                $("."+currentID+"2 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"2 .letest_drivebox2").removeClass("letest_driveboxclick_right");
                $("."+currentID+"3 .lc_container2").removeClass("lc_containerclick2");
                $("."+currentID+"3 .letest_drivebox2").removeClass("letest_driveboxclick_right");
            }
        }
    }

    componentDidMount() {
        this.loadProgressBar("", 0.75, 60, "canvas");             
        // Prepare canvas
    }

    loadProgressBar(val, optionsVal, optionsSize, canvasID) {

        if ($('#' + canvasID)[0] != undefined) {
            window["options" + val] = {
                value: optionsVal,
                size: optionsSize,
                startAngle: -Math.PI,
                startColor: 'red',
                endColor: 'red',
                animation: {
                    duration: 1200,
                    easing: 'circleProgressEase'
                }
            };

            $.easing.circleProgressEase = function (x, t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            };

            window["s" + val] = window["options" + val].size, // square size
                window["v" + val] = window["options" + val].value, // current value: from 0.0 to 1.0
                window["r" + val] = window["s" + val] / 2, // radius
                window["t" + val] = window["s" + val] / 14; // thickness

            window["canvas" + val] = $('#' + canvasID)[0];
            window["canvas" + val].width = window["s" + val];
            window["canvas" + val].height = window["s" + val];
            window["ctx" + val] = window["canvas" + val].getContext('2d');
            window["lg" + val] = window["ctx" + val].createLinearGradient(0, 0, window["s" + val], 0);
            window["lg" + val].addColorStop(0, window["options" + val].startColor);
            window["lg" + val].addColorStop(1, window["options" + val].endColor);
            window["ctx" + val].fillStyle = "rgba(0, 0, 0, .1)";

            // Draw circle
            if (window["options" + val].animation)
                _drawAnimated(window["v" + val]);
            else
                _draw(window["v" + val]);            

            // now let's animate numbers
            window["valE" + val] = $('.value');
            window["valE" + val].data('origVal', window["valE" + val].text());
            $(window["canvas" + val]).on('circle-animation-progress', function (e, progress) {
                window["valE" + val].text(parseInt(window["valE" + val].data('origVal')) * progress)
            });
        }

        function _draw(p) {
            // Clear frame
            window["ctx" + val].clearRect(0, 0, window["s" + val], window["s" + val]);

            // Draw background circle
            window["ctx" + val].beginPath();
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val], -Math.PI, Math.PI);
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val] - window["t" + val], Math.PI, -Math.PI, true);
            window["ctx" + val].closePath();
            window["ctx" + val].fill(); // gray fill

            // Draw progress arc
            window["ctx" + val].beginPath();
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val], -Math.PI, -Math.PI + Math.PI * 2 * p);
            window["ctx" + val].arc(window["r" + val], window["r" + val], window["r" + val] - window["t" + val], -Math.PI + Math.PI * 2 * p, -Math.PI, true);
            window["ctx" + val].closePath();
            window["ctx" + val].save();
            window["ctx" + val].clip();
            window["ctx" + val].fillStyle = window["lg" + val];
            window["ctx" + val].fillRect(0, 0, window["s" + val], window["s" + val]); // gradient fill
            window["ctx" + val].restore();
        }

        function _drawAnimated(v) {
            $(window["canvas" + val]).stop(true, true).css({ value: 0 }).animate({ value: window["v" + val] }, $.extend({}, window["options" + val].animation, {
                step: function (p) {
                    _draw(p);
                    $(window["canvas" + val]).trigger('circle-animation-progress', [p / window["v" + val], p]);
                },

                complete: function () {
                    $(window["canvas" + val]).trigger('circle-animation-end');
                }
            }));
        }
    }

    render() {                
        var drivenoID = "";
        var canvasID1 = "";
        var canvasID2 = "";
        if (this.props.checkPortion == "upTestDrive") {
            drivenoID = "upDriveno" + this.props.testDriveId;
            canvasID1 = "upDriveCanvasPoints" + this.props.testDriveId;
            canvasID2 = "upDriveCanvasDrive" + this.props.testDriveId;
        }
        else {
            drivenoID = "activeDriveno" + this.props.testDriveId
            canvasID1 = "activeDrivePointsCanvas" + this.props.testDriveId;
            canvasID2 = "activeDriveDriveCanvas" + this.props.testDriveId;
        }
        return (<div>{
            <div className={"row test_drive "+ drivenoID}>  
                <div className="col-md-2">
                    <div className="lc_container2">
                        <div className="white_circle2"></div>
                        <div className="col-md-12 top_boxline"></div>
                        <div className="col-md-12 bottom_boxline"></div>
                    </div>
                </div>              
                <div className="col-md-10 text-right">
                    <a className="drive_name"><h4 onClick={() => this.openUpcomingTestDriveDialog(drivenoID)}>{this.props.testDriveName} <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span></h4></a>
                    <p><span className="end_date">END DATE :</span> {Service.formatDate(this.props.endDate)}</p>
                    <p><span className="participants">PARTICIPANTS :</span> {this.props.participants}</p>
                </div>
                <div className="letest_drivebox2">
                <div className="col-md-12">
                        <h3>{this.props.testDriveName}</h3>
                        <div className="col-md-12 social_box">
                            <div className="row">
                                <a href="#"><i className="material-icons">info</i></a>
                                <a href="#"><i className="material-icons">email</i></a>
                                <a href="#"><span className="teams"></span></a>
                                <a href="#"><i className="material-icons">share</i></a>
                            </div>
                        </div>
                        <div className="col-md-12 popup_infocontainer">
                            <div className="row">
                                <div className="col-md-6 earned_pointbox">
                                    <div className="row">
                                        <div className="col-md-12 earn_box">
                                            <span className="orange"><i>POINTS :</i></span>
                                            <canvas id={canvasID1} width="150" height="150"></canvas>
                                            <h3>80 %</h3>
                                            <span className="small">7 of 8 tasks done</span>
                                        </div>
                                        <div className="col-md-12 drive_completionbox">
                                            <span className="orange"><i>DRIVE COMPLETION</i></span>
                                            <canvas id={canvasID2} width="150" height="150"></canvas>
                                            <h3>400</h3>
                                            <span className="small">400 of 500 points earned</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 drive_info">
                                    <div className="row">
                                        <div className="col-md-12 popup_dificultybox">
                                            <div className="row">
                                                <div className="col-md-12 owner">
                                                    <span className="orange">
                                                        <i>DRIVE OWNER</i>
                                                    </span>
                                                    <h4>Kenny Morphase</h4>
                                                </div>
                                                <div className="col-md-12 end_date">
                                                    <span className="orange">
                                                        <i>End Date</i>
                                                    </span>
                                                    <h4>{Service.formatDate(this.props.endDate)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 popup_ownerbox">
                                            <div className="row">
                                                <div className="col-md-12 owner">
                                                    <span className="orange">
                                                        <i>PARTICIPANTS</i>
                                                    </span>
                                                    <h4>{this.props.participants}</h4>
                                                </div>
                                                <div className="col-md-12 end_date">
                                                    <span className="orange">
                                                        <i>DEFICULTY LEVEL</i>
                                                    </span>
                                                    <h4>Street Race</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 popup_buttonbox">
                                <button className="button type1">
                                    Drive Through
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }</div>);
    }
}

export default UpcomingTestDrives;