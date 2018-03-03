import * as React from 'react';
import ui from 'redux-ui';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Service from '../../common/services/services';
import TestDriveHoverPanel from './TestDriveHoverPanel';
import { TestDrive } from '../../home/model';
interface UpcomingTestDrivesProps {
    participants: number;
    checkPortion: string;
    testDrive: TestDrive;
    index:number;
};

interface LeaderBoardUserState {

}

class UpcomingTestDrives extends React.Component<UpcomingTestDrivesProps> {
    openMyTestDriveDialog(letest_driveboxID) {

        var popUpContainer = $("#" + letest_driveboxID + ' ' + " .letest_drivebox2");
        
        // $(".modal-backdrop").toggleClass("overlay");

        // var isOpen = $(".modal-backdrop").hasClass("overlay");
        // if (isOpen) {
        //     $(".modal-backdrop").css("display", "block");
        // } else {
        //     $(".modal-backdrop").css("display", "none");
        // }
        var isOpen = popUpContainer.hasClass('box');
        $(".lc_container").removeClass("lc_containerclick");
        $(".letest_drivebox").removeClass("letest_driveboxclick");
        $(".lc_container2").removeClass("lc_containerclick2");
        $(".letest_drivebox2").removeClass("letest_driveboxclick_right");
        $(".letest_drivebox").removeClass('box').hide();
        $(".letest_drivebox2").removeClass('box').hide();


        if (!isOpen) {
            $('#' + letest_driveboxID + ' ' + ".letest_drivebox2").show();
            $('#' + letest_driveboxID + ' ' + ".white_circle2").addClass("white_circleclick");
            $('#' + letest_driveboxID + ' ' + ".lc_container2").addClass("lc_containerclick2");
            $('#' + letest_driveboxID + ' ' + ".letest_drivebox2").addClass("letest_driveboxclick_right");
            popUpContainer.addClass("box");
        } else{
            popUpContainer.removeClass("box");
        }
    }

    render() {
        const { testDrive, checkPortion, children, participants, index } = this.props;
        var drivenoID = checkPortion + index;
        return (<div>{
            <div className="row test_drive " id={drivenoID}>
                <div className="col-md-2">
                    <div className="lc_container2">
                        <div className="white_circle2"></div>
                        <div className="col-md-12 top_boxline"></div>
                        <div className="col-md-12 bottom_boxline"></div>
                    </div>
                </div>
                <div className="col-md-10 text-right">
                    <a className="drive_name"><h4 onClick={() => this.openMyTestDriveDialog(drivenoID)}>
                        {testDrive.title}
                        <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true">
                        </span>
                    </h4>
                    </a>
                    <p><span className="end_date">START DATE : </span> {Service.formatDate(testDrive.startDate)}</p>
                    <p><span className="participants">POSSIBLE POINTS : </span> {testDrive.maxPoints}</p>
                </div>
                <div className="letest_drivebox2">
                    <TestDriveHoverPanel
                        participants={participants}
                        checkPortion={checkPortion}
                        testDrive={testDrive} />
                </div>
            </div>
        }</div>);
    }
}

export default UpcomingTestDrives;