import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive, } from '../model';
import Services from '../../common/services/services';
import '../../js/jqmeter';
import { Messages } from '../../common/services/constants';
interface MyTestDrivesCompletedItemProps {
    testDrive: TestDrive;
    testDriveResponse: any;
    participants: number;
    index: number;
    checkPortion: string;
    isCompleted: boolean;
};
class MyTestDrivesCompletedItem extends React.Component<MyTestDrivesCompletedItemProps> {
    canvasID = 'my-test-drive-in-progress' + this.props.index;
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { participants, checkPortion, testDrive, testDriveResponse, index } = this.props;
        const completedTestCases = testDriveResponse ? testDriveResponse.numberOfTestCasesCompleted : 0;
        const totalTestCases = (testDrive && testDrive.testCaseIDs) ? testDrive.testCaseIDs.length : 1;
        const percentComplete = (completedTestCases / totalTestCases);
        const pointEarned = (testDriveResponse.currentPoint / testDrive.maxPoints);
        var pointsProgressID = 'point-canvas' + checkPortion + index;
        var driveProgressID = 'jqmeter-horizontal' + checkPortion + index;
        Services.loadProgressBar(pointsProgressID, pointEarned, 140);
        Services.loadHorizontalProgressBar(driveProgressID, completedTestCases, totalTestCases);

        // Service.loadProgressBar(driveProgressID, percentComplete, 140);

    }
    render() {
        const { participants, checkPortion, testDrive, testDriveResponse, index, isCompleted } = this.props;
        const completedTestCases = testDriveResponse ? testDriveResponse.numberOfTestCasesCompleted : 0;
        const totalTestCases = (testDrive && testDrive.testCaseIDs) ? testDrive.testCaseIDs.length : 1;
        const percentComplete = (completedTestCases / totalTestCases);
        const pointEarned = (testDriveResponse.currentPoint / testDrive.maxPoints);
        var pointsProgressID = 'point-canvas' + checkPortion + index;
        var driveProgressID = 'jqmeter-horizontal' + checkPortion + index;


        return (<div className="col-md-4">
            <div className="col-md-12 progress_drivebox">
                <h4>{testDrive.title}</h4>
                <div className="col-md-12 pull-right">
                    <div className="row">
                        <div className="col-md-12 social_box">
                            <div className="row">
                                <a href="javascript:;" title={Messages.REPORT_BUG_TITLE}
                                    onClick={() => Services.reportAbug(testDrive.ownerEmail, testDrive.title)}>
                                    <span className="report"></span>
                                </a>
                                <a href="javascript:;" title={Messages.SEND_EMAIL_TITLE}
                                    onClick={() => Services.emailOwner(testDrive.ownerEmail, testDrive.title)}>
                                    <i className="material-icons">email</i>
                                </a>
                                {/* <a href="#">
                                    <span className="teams"></span>
                                </a> */}
                                <a href="javascript:;" title={Messages.SHARE_TITLE}
                                    onClick={() => Services.shareTestDrive(testDrive.ownerEmail, testDrive.title)}>
                                    <i className="material-icons">share</i>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange"><i>End Date</i>
                                                    <img src="/Style%20Library/Elite/images/flag.png" /></span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>{Services.formatDate(testDrive.startDate)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange"><i>Participants</i>
                                                    <img src="/Style%20Library/Elite/images/helmet.png" /></span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>{participants}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 enddate_Section testcase_completionbox">
                            <div className="row">
                                <span className="orange"><i>Test Case Completion</i></span>
                                <div className="col-md-12">
                                    <div id={driveProgressID} className="before_fill"></div>
                                    <p className="my_allpoints text-center"><span className="orange big"><i>{completedTestCases}</i></span> of {totalTestCases}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="orange">Points Earned</span>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row text-center">
                                                        <canvas id={pointsProgressID} width="140" height="140"></canvas>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 text-center point_board">
                                                    <h3 className="text-center">{testDriveResponse.currentPoint}</h3>
                                                    <span className="small">of {testDrive.maxPoints}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="orange">Difficulty Level</span>
                                        </div>
                                    </div>
                                    <div className="row race_type">
                                        <div className="col-md-12">
                                            <ul className={Services.getLevelNameClass(testDrive.levelNumber)}>
                                                <li><span></span></li>
                                                <li><span></span></li>
                                                <li><span></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-12">
                                            <h5>{testDrive.levelName}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            {isCompleted ?
                                <Link className="button type1" to={"/participation/" + testDrive.id}> View Details </Link> :
                                <Link className="button type1" to={"/participation/" + testDrive.id}> Complete the drive </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default MyTestDrivesCompletedItem;