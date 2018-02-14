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
        this.loadProgressBar("", 0.75, 60, "canvas");
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
        }
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