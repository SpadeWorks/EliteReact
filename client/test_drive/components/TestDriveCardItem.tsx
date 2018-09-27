import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import Services from '../../common/services/services';
import { Messages } from '../../common/services/constants';
import * as $ from 'jquery';
import HeaderBox from './HeaderBox';
import { ColumnsValues } from '../../common/services/constants';

interface TestDriveCardItemProps {
    testDrive: TestDrive;
    participants: number;
    isActive: boolean;
};
class TestDriveCardItem extends React.Component<TestDriveCardItemProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('[data-toggle="popover"]').popover();
    }

    getTabLinks(items: any[]) {
        var moreLink = '', maxItems = 2, maxLength = 13;
        return (<div>
            {
                items && items.slice(0, maxItems).map((item: any, index) => {
                    return (<li key={index} className="select2-selection__choice" title={item.Label}>
                        {(item.Label && item.Label.length > maxLength) ? item.Label.slice(0, maxLength) + "..." : item.Label}
                    </li>)
                })
            }
            {
                items && items.length > maxItems && items.slice(0, maxItems).map((item: any, index) => {
                    moreLink += index < items.slice(0, maxItems).length - 1 ? (item.Label + ", ") : item.Label;
                })
            }
            {
                items && items.length > maxItems ?
                    <li className="more">
                        <a href="javascript:;" title="" data-toggle="popover" data-trigger="focus hover" data-placement="right" data-content={moreLink}><span className="orange">More</span></a>
                    </li> : ''
            }
        </div>)
    }

    render() {
        const { testDrive, participants, isActive } = this.props;
        return (<div className="col-md-4">
            <div className="col-md-12 progress_drivebox">
                {
                    testDrive.status === ColumnsValues.REGISTRATION_STARTED && <HeaderBox type="registernow" />
                }
                {
                    testDrive.status === ColumnsValues.ACTIVE && <HeaderBox type="livenow" />
                }
                <Link to={'/participation/' + testDrive.id}><h4>{testDrive.title}</h4></Link>
                <div className="col-md-12 pull-right">
                    <div className="row">
                        <div className="col-md-12 social_box">
                            <div className="row">
                                {/* <a href={"#/reportbug/" + testDrive.id} title={Messages.REPORT_BUG_TITLE}>
                                    <span className="report"></span>
                                </a> */}
                                <a href="javascript:;" title={Messages.SEND_EMAIL_TITLE}
                                    onClick={() => Services.emailOwner(testDrive.ownerEmail, testDrive.title)}>
                                    <i className="material-icons">email</i>
                                </a>
                                {/* {
                                    <a target="_blank" href={"https://teams.microsoft.com/_?threadId=19:" + testDrive.teamsChannelID + "@thread.skype&ctx=channel"}>
                                        <span className="teams"></span>
                                    </a>
                                } */}
                                <a href="javascript:;" title={Messages.SHARE_TITLE}
                                    onClick={() => Services.shareTestDrive(testDrive.ownerEmail, testDrive)}>
                                    <i className="material-icons">share</i>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange"><i>START DATE</i></span>
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
                                                <span className="orange"><i>END DATE</i>
                                                    <img src="/Style%20Library/Elite/images/flag.png" /></span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>{Services.formatDate(testDrive.endDate)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section para">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <span className="orange">
                                                <div className="row">
                                                    <i>PARTICIPANTS</i>

                                                    <img src="/Style%20Library/Elite/images/helmet.png" />
                                                </div>
                                            </span>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <h5>{participants ? participants.toString() : '0'}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <span className="orange">Difficulty Level</span>
                                    </div>
                                    <div className="row race_type">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <ul className="dragrace_indicator" dangerouslySetInnerHTML={{ __html: Services.getLevelHtml(testDrive.levelNumber) }}>
                                                </ul>
                                            </div>
                                            <div className="row">
                                                <h5 className="race_neme">{testDrive.levelName}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section">
                                    <div className="row">

                                        <div className="para">
                                            <span className="orange">

                                                DEVICE REQUIRED

                                                    </span>

                                            <div className="row">
                                                <ul className="select2-selection__rendered">
                                                    {testDrive && testDrive.requiredDevices ? this.getTabLinks(testDrive.requiredDevices) : ''}
                                                    {
                                                        (!testDrive.requiredDevices || testDrive.requiredDevices.length == 0) && <p>{Messages.ALL_DEVICES_MSG}</p>
                                                    }
                                                </ul>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="para">
                                        <div className="row">
                                            <div className="para">
                                                <span className="orange">
                                                    OS REQUIRED
                                                </span>
                                                <div className="row">
                                                    <ul className="select2-selection__rendered">
                                                        {testDrive && testDrive.requiredOs ? this.getTabLinks(testDrive.requiredOs) : ''}
                                                        {
                                                            (!testDrive.requiredOs || testDrive.requiredOs.length == 0) && <p>{Messages.ALL_OS_MSG}</p>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section para">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange">POSSIBLE POINTS</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="big_text">{testDrive.maxPoints}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 partcipant_Section">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange">No. OF TEST CASES</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="big_text">{testDrive.testCaseIDs.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <Link className="button type1" to={"/participation/" + testDrive.id}> {isActive ? 'Drive Through' : 'View Details'} </Link>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default TestDriveCardItem;