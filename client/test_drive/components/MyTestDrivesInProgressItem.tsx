import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import Services from '../../common/services/services';
<<<<<<< HEAD
import { Messages } from '../../common/services/constants';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
interface MyTestDrivesInProgressItemProps {
    testDrive: TestDrive;
    participants: number;
    index: number;
    loadeMore: (skip: number, top: number) => any;
};
class MyTestDrivesInProgressItem extends React.Component<MyTestDrivesInProgressItemProps> {
    canvasID = 'my-test-drive-in-progress' + this.props.index;
    constructor(props, context) {
        super(props, context);
    }
    render() {
<<<<<<< HEAD
        const { testDrive, participants } = this.props;
        return (<div className="col-md-4">
            <div className="col-md-12 progress_drivebox">
                <Link to={'/participation/' + testDrive.id}><h4>{testDrive.title}</h4></Link>
=======
        const { testDrive, participants} = this.props;
        return (<div className="col-md-4">
            <div className="col-md-12 progress_drivebox">
                <h4>{testDrive.title}</h4>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                <div className="col-md-12 pull-right">
                    <div className="row">
                        <div className="col-md-12 social_box">
                            <div className="row">
<<<<<<< HEAD
                                <a href={"#/reportbug/" + testDrive.id} title={Messages.REPORT_BUG_TITLE}>
                                    <span className="report"></span>
                                </a>
                                <a href="javascript:;" title={Messages.SEND_EMAIL_TITLE}
                                    onClick={() => Services.emailOwner(testDrive.ownerEmail, testDrive.title)}>
                                    <i className="material-icons">email</i>
                                </a>
                                <a target="_blank" href={Services.getTeamSiteUrl(testDrive.teamsChannelID)}>
                                    <span className="teams"></span>
                                </a>
                                <a href="javascript:;" title={Messages.SHARE_TITLE}
                                    onClick={() => Services.shareTestDrive(testDrive.ownerEmail, testDrive)}>
                                    <i className="material-icons">share</i>
                                </a>
=======
                                <a href="#"><i className="material-icons">bug_report</i></a>
                                <a href="#"><i className="material-icons">email</i></a>
                                <a href="#"><span className="teams"></span></a>
                                <a href="#"><i className="material-icons">share</i></a>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange"><i>End Date</i>
<<<<<<< HEAD
                                                    <img src="/Style%20Library/Elite/images/flag.png" /></span>
=======
                                                    <img src="/sites/elite/Style%20Library/Elite/images/flag.png" /></span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
<<<<<<< HEAD
                                                <h5>{Services.formatDate(testDrive.endDate)}</h5>
=======
                                                <h5>{Services.formatDate(testDrive.startDate)}</h5>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange"><i>participants</i>
<<<<<<< HEAD
                                                    <img src="/Style%20Library/Elite/images/helmet.png" /></span>
=======
                                                    <img src="/sites/elite/Style%20Library/Elite/images/helmet.png" /></span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
                                    <div id="jqmeter-horizontal"></div>
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
                                                    <canvas id={this.canvasID} width="140" height="140"></canvas>
                                                </div>
                                                <div className="col-md-12 text-center point_board">
                                                    <h3 className="text-center">80 %</h3>
                                                    <span className="small">7 of 500</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange">Difficulty Level</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>2457</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row race_type">
                                        <div className="col-md-12">
                                            <div className="row">
<<<<<<< HEAD
                                                <ul className="dragrace_indicator" dangerouslySetInnerHTML={{ __html: Services.getLevelHtml(testDrive.levelNumber) }}>
=======
                                                <ul className="dragrace_indicator">
                                                    <li><span></span></li>
                                                    <li><span></span></li>
                                                    <li><span></span></li>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
<<<<<<< HEAD
                                                <h5>{testDrive.levelName}</h5>
=======
                                                <h5>{testDrive.level}</h5>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link className="button type1" to={"/participation/" + testDrive.id}> Drive Through </Link>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default MyTestDrivesInProgressItem;