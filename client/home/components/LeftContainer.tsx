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
    key: number;
    index: number;
};


class MyTestDrives extends React.Component<LeftContainer> {
    openMyTestDriveDialog(letest_driveboxID) {
    
        var popUpContainer = $("#" + letest_driveboxID + ' ' + " .letest_drivebox");

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
            $('#' + letest_driveboxID + ' ' + ".letest_drivebox").show();
            $('#' + letest_driveboxID + ' ' + ".white_circle").addClass("white_circleclick");
            $('#' + letest_driveboxID + ' ' + ".lc_container").addClass("lc_containerclick");
            $('#' + letest_driveboxID + ' ' + ".letest_drivebox").addClass("letest_driveboxclick");
            
            popUpContainer.addClass("box");
        } else {
            popUpContainer.removeClass("box");
            $('#' + letest_driveboxID + ' ' + ".letest_drivebox").hide();
            $('#' + letest_driveboxID + ' ' + ".letest_driveboxclick").hide();
        }
    }

    render() {
        const { checkPortion, participants, testDrive, testDriveResponse, index } = this.props
        const driveID = checkPortion + index;
        return (<div>{
            <div className="row test_drive" id={driveID}>
                <div className="modal-backdrop in hidden"></div>
                <div className="col-md-10">
                    <a className="drive_name">
                        <h4 onClick={() => this.openMyTestDriveDialog(driveID)}>
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
                        testDriveResponse && testDriveResponse.instanceID != -1 &&
                        <MyTestDriveHoverPanel
                            participants={participants}
                            checkPortion={checkPortion}
                            testDrive={testDrive}
                            testDriveResponse={testDriveResponse}
                            index={index} />
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