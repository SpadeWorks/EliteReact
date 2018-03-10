import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import Services from '../../common/services/services';
import { Messages } from '../../common/services/constants';
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
        const { testDrive, participants } = this.props;
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
                                                <span className="orange"><i>participants</i>
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
                                                <ul className="dragrace_indicator">
                                                    <li><span></span></li>
                                                    <li><span></span></li>
                                                    <li><span></span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>{testDrive.levelName}</h5>
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