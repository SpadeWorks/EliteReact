import * as React from 'react';
import ui from 'redux-ui';
import * as $ from 'jquery';
import Service from '../../common/services/services';


interface MyTestDrivesProps {
    testDriveName: string;
    endDate: string;
    participants: number;
    testDriveId: number;
    checkPortion: string;
};

interface LeaderBoardUserState {
}

class MyTestDrives extends React.Component<MyTestDrivesProps> {
    openMyTestDriveDialog(letest_driveboxID) {
        Service.loadProgressBar("1", 0.75, 140, "myDriveCanvasPoints1");
        Service.loadProgressBar("2", 0.75, 140, "myDriveCanvasPoints2");
        Service.loadProgressBar("3", 0.75, 140, "myDriveCanvasPoints3");
        Service.loadProgressBar("4", 0.75, 140, "myDriveCanvasDrive1");
        Service.loadProgressBar("5", 0.75, 140, "myDriveCanvasDrive2");
        Service.loadProgressBar("6", 0.75, 140, "myDriveCanvasDrive3");
        Service.loadProgressBar("7", 0.75, 140, "testIRunDrivePointsCanvas1");
        Service.loadProgressBar("8", 0.75, 140, "testIRunDrivePointsCanvas2");
        Service.loadProgressBar("9", 0.75, 140, "testIRunDrivePointsCanvas3");
        Service.loadProgressBar("10", 0.75, 140, "testIRunDriveDriveCanvas1");
        Service.loadProgressBar("11", 0.75, 140, "testIRunDriveDriveCanvas2");
        Service.loadProgressBar("12", 0.75, 140, "testIRunDriveDriveCanvas3");
        var currentID = letest_driveboxID.slice(0, -1);
        $("." + letest_driveboxID + " .letest_drivebox").addClass("box");
        $(".modal-backdrop").toggleClass("overlay");
        var isOpen = $(".modal-backdrop").hasClass("overlay");
        if (isOpen) {
            $(".modal-backdrop").css("display", "block");
        } else {
            $(".modal-backdrop").css("display", "none");
        }
        var isBox = $("." + letest_driveboxID + " .letest_drivebox").hasClass("box");
        if (isBox) {
            $(".white_circle1").toggleClass("white_circleclick");
            $(".lc_container").toggleClass("lc_containerclick");
            $(".letest_drivebox").toggleClass("letest_driveboxclick");
            if (letest_driveboxID == currentID + "3") {
                $("." + currentID + "1 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "1 .letest_drivebox").removeClass("letest_driveboxclick");
                $("." + currentID + "2 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "2 .letest_drivebox").removeClass("letest_driveboxclick");
            }
            else if (letest_driveboxID == currentID + "2") {
                $("." + currentID + "1 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "1 .letest_drivebox").removeClass("letest_driveboxclick");
                $("." + currentID + "3 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "3 .letest_drivebox").removeClass("letest_driveboxclick");
            }
            else if (letest_driveboxID == currentID + "1") {
                $("." + currentID + "2 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "2 .letest_drivebox").removeClass("letest_driveboxclick");
                $("." + currentID + "3 .lc_container").removeClass("lc_containerclick");
                $("." + currentID + "3 .letest_drivebox").removeClass("letest_driveboxclick");
            }
        }
    }      

    render() {
        var drivenoID = "";
        var canvasID1 = "";
        var canvasID2 = "";
        if (this.props.checkPortion == "myTestDrive") {
            drivenoID = "myDriveno" + this.props.testDriveId;
            canvasID1 = "myDriveCanvasPoints" + this.props.testDriveId;
            canvasID2 = "myDriveCanvasDrive" + this.props.testDriveId;
        }
        else {
            drivenoID = "testIRunDriveno" + this.props.testDriveId
            canvasID1 = "testIRunDrivePointsCanvas" + this.props.testDriveId;
            canvasID2 = "testIRunDriveDriveCanvas" + this.props.testDriveId;
        }
        return (<div>{
            <div className={"row test_drive " + drivenoID}>
                <div className="modal-backdrop in hidden"></div>
                <div className="col-md-10">
                    <a className="drive_name"><h4 onClick={() => this.openMyTestDriveDialog(drivenoID)}>{this.props.testDriveName}<span className={"glyphicon glyphicon-triangle-right hidden"} aria-hidden="true"></span></h4></a>
                    <p><span className="end_date">END DATE :</span>{Service.formatDate(this.props.endDate)}</p>
                    <p><span className="participants">PARTICIPANTS :</span> {this.props.participants}</p>
                </div>
                <div className="col-md-2 pull-right">
                    <div className="lc_container">
                        <div className="white_circle"></div>
                        <div className="col-md-12 top_boxline"></div>
                        <div className="col-md-12 bottom_boxline"></div>
                    </div>
                </div>
                <div className="letest_drivebox">
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

export default MyTestDrives;