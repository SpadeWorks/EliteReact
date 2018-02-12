import * as React from 'react';
import { Link } from "react-router-dom";
import Service from '../../common/services/services';
import { TestDrive, TestDriveResponse } from '../../home/model';
interface MyTestDriveHoverPanelProps {
    participants: number;
    checkPortion: string;
    testDrive: TestDrive;
    testDriveResponse: TestDriveResponse;
};
class MyTestDriveHoverPanel extends React.Component<MyTestDriveHoverPanelProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { participants, checkPortion, testDrive, testDriveResponse } = this.props;
        const completedTestCases = testDriveResponse ? testDriveResponse.numberOfTestCasesCompleted : 0;
        const totalTestCases = testDrive ? testDrive.testCaseIDs.length : 1;
        const percentComplete = (completedTestCases/totalTestCases) * 100;
        var drivenoID = "";
        var canvasID1 = "";
        var canvasID2 = "";
        if (checkPortion == "upTestDrive") {
            drivenoID = "upDriveno" + testDrive.id;
            canvasID1 = "upDriveCanvasPoints" + testDrive.id;
            canvasID2 = "upDriveCanvasDrive" + testDrive.id;
        }
        else {
            drivenoID = "activeDriveno" + testDrive.id;
            canvasID1 = "activeDrivePointsCanvas" + testDrive.id;
            canvasID2 = "activeDriveDriveCanvas" + testDrive.id;
        }


        return (<div className="col-md-12">
            <h3>{testDrive.title}</h3>
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
                                <h3 className="earn_boxcount">{percentComplete} %</h3>
                                <span className="small">
                                    {completedTestCases} 
                                        of {totalTestCases}  tasks done
                                    </span>
                            </div>
                            <div className="col-md-12 drive_completionbox">
                                <span className="orange"><i>DRIVE COMPLETION</i></span>
                                <canvas id={canvasID2} width="150" height="150"></canvas>
                                <h3 className="completionboxcount">{testDriveResponse.currentPoint}</h3>
                                <span className="small">{testDriveResponse.currentPoint} of {testDrive.maxPoints} points earned</span>
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
                                        <h4>{testDrive.owner}</h4>
                                    </div>
                                    <div className="col-md-12 end_date">
                                        <span className="orange">
                                            <i>End Date</i>
                                        </span>
                                        <h4>{Service.formatDate(testDrive.endDate)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 popup_ownerbox">
                                <div className="row">
                                    <div className="col-md-12 owner">
                                        <span className="orange">
                                            <i>PARTICIPANTS</i>
                                        </span>
                                        <h4>{participants}</h4>
                                    </div>
                                    <div className="col-md-12 end_date">
                                        <span className="orange">
                                            <i>DEFICULTY LEVEL</i>
                                        </span>
                                        <h4>{testDrive.level}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 popup_buttonbox">
                    <Link className="button type1" to={"/participation/" + testDrive.id}> Drive Through </Link>
                </div>
            </div>
        </div>)
    }
}

export default MyTestDriveHoverPanel;
