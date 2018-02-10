import * as React from 'react';
import ui from 'redux-ui';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Service from '../../common/services/services';
import { HomeTestDrive, TestDrive, TestDriveResponse } from '../../home/model';
import MyTestDriveHoverPanel from './MyTestDriveHoverPanel';
import TestDriveHoverPanel from './TestDriveHoverPanel';

interface LeftContainer {
    checkPortion: string;
    testDrive: TestDrive;
    testDriveResponse: TestDriveResponse;
    participants: number;
    key:number;
    index:number;
};


class MyTestDrives extends React.Component<LeftContainer> {
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
        const { checkPortion, participants, testDrive, testDriveResponse, index } = this.props
        var drivenoID = "";
        var canvasID1 = "";
        var canvasID2 = "";
        if (checkPortion == "myTestDrive") {
            drivenoID = "myDriveno" + index;
            canvasID1 = "myDriveCanvasPoints" + index;
            canvasID2 = "myDriveCanvasDrive" + index;
        }
        else {
            drivenoID = "testIRunDriveno" + index
            canvasID1 = "testIRunDrivePointsCanvas" + index;
            canvasID2 = "testIRunDriveDriveCanvas" + index;
        }
        return (<div>{
            <div className={"row test_drive " + drivenoID}>
                <div className="modal-backdrop in hidden"></div>
                <div className="col-md-10">
                    <a className="drive_name">
                        <h4 onClick={() => this.openMyTestDriveDialog(drivenoID)}>
                            {testDrive.title}
                            <span className={"glyphicon glyphicon-triangle-right hidden"} aria-hidden="true">
                            </span>
                        </h4>
                    </a>
                    <p><span className="end_date">END DATE :</span>{Service.formatDate(testDrive.endDate)}</p>
                    <p><span className="participants">PARTICIPANTS :</span> {participants}</p>
                </div>
                <div className="col-md-2 pull-right">
                    <div className="lc_container">
                        <div className="white_circle"></div>
                        <div className="col-md-12 top_boxline"></div>
                        <div className="col-md-12 bottom_boxline"></div>
                    </div>
                </div>
                <div className="letest_drivebox">
                    {
                        testDriveResponse &&
                        <MyTestDriveHoverPanel
                            participants={participants}
                            checkPortion={checkPortion}
                            testDrive={testDrive}
                            testDriveResponse={testDriveResponse} />
                    }
                    {
                        !testDriveResponse &&
                        <TestDriveHoverPanel
                            participants={participants}
                            checkPortion={checkPortion}
                            testDrive={testDrive} />
                    }
                </div>
            </div>
        }</div>);
    }
}

export default MyTestDrives;