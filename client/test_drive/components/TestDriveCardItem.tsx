import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import Services from '../../common/services/services';
<<<<<<< HEAD
import { Messages } from '../../common/services/constants';
import * as $ from 'jquery';
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc

interface TestDriveCardItemProps {
    testDrive: TestDrive;
    participants: number;
    isActive: boolean;
};
class TestDriveCardItem extends React.Component<TestDriveCardItemProps> {
    constructor(props, context) {
        super(props, context);
    }
<<<<<<< HEAD

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

=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    render() {
        const { testDrive, participants, isActive } = this.props;
        return (<div className="col-md-4">
            <div className="col-md-12 progress_drivebox">
<<<<<<< HEAD
                <Link to={'/participation/' + testDrive.id}><h4>{testDrive.title}</h4></Link>
=======
                <h4>{testDrive.title}</h4>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                <div className="col-md-12 pull-right">
                    <div className="row">
                        <div className="col-md-12 social_box">
                            <div className="row">
<<<<<<< HEAD
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
=======
                                <a href="javascript:void(0);"
                                    onClick={() => Services.reportAbug(testDrive.ownerEmail, testDrive.title)}>
                                    <span className="report"></span>
                                </a>
                                <a href="javascript:void(0);"
                                    onClick={() => Services.emailOwner(testDrive.ownerEmail, testDrive.title)}>
                                    <i className="material-icons">email</i>
                                </a>
                                {/* <a href="#">
                                    <span className="teams"></span>
                                </a> */}
                                <a href="javascript:void(0);"
                                    onClick={() => Services.shareTestDrive(testDrive.ownerEmail, testDrive.title)}>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                                    <img src="/Style%20Library/Elite/images/flag.png" /></span>
=======
                                                    <img src="/sites/elite/Style%20Library/Elite/images/flag.png" /></span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                <div className="col-md-6 enddate_Section para">
=======
                                <div className="col-md-6 partcipant_Section">
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    <div className="row">
                                        <div className="col-md-12">

                                            <span className="orange">
                                                <div className="row">
                                                    <i>PARTICIPANTS</i>

<<<<<<< HEAD
                                                    <img src="/Style%20Library/Elite/images/helmet.png" />
=======
                                                    <img src="/sites/elite/Style%20Library/Elite/images/helmet.png" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                        <span className="orange">Difficulty Level</span>
=======
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange">Difficulty Level</span>
                                            </div>
                                        </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    </div>
                                    <div className="row race_type">
                                        <div className="col-md-12">
                                            <div className="row">
<<<<<<< HEAD
                                                <ul className="dragrace_indicator" dangerouslySetInnerHTML={{ __html: Services.getLevelHtml(testDrive.levelNumber) }}>
                                                </ul>
                                            </div>
                                            <div className="row">
                                                <h5 className="race_neme">{testDrive.levelName}</h5>
                                            </div>
=======
                                                <ul className={Services.getLevelNameClass(testDrive.levelNumber)}>
                                                    <li><span></span></li>
                                                    <li><span></span></li>
                                                    <li><span></span></li>
                                                </ul>
                                            </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 partcipant_enddate">
                            <div className="row">
                                <div className="col-md-6 enddate_Section">
                                    <div className="row">
<<<<<<< HEAD

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
=======
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12 para">
                                                    <span className="orange">
                                                        <div className="row">
                                                            DEVICE REQUIRED
                                                        </div>
                                                    </span>

                                                    <div className="row">
                                                        <ul className="select2-selection__rendered">
                                                            {(testDrive.requiredDevices && testDrive.requiredDevices.length) ?
                                                                testDrive.requiredDevices.map((device: any, index) => {
                                                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                                                        {device.Label || ''}
                                                                    </li>)
                                                                }) : ''
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12 para">
                                                    <span className="orange">
                                                        <div className="row">OS REQUIRED
                                                            </div>
                                                    </span>
                                                    <div className="row">
                                                        <ul className="select2-selection__rendered">
                                                            {(testDrive.requiredOs && testDrive.requiredOs.length) ?
                                                                testDrive.requiredOs.map((os: any, index) => {
                                                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                                                        {os.Label || ''}
                                                                    </li>)
                                                                }) : ''
                                                            }
                                                        </ul>
                                                    </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
<<<<<<< HEAD
                                <div className="col-md-6 partcipant_Section para">
=======
                                <div className="col-md-6 partcipant_Section">
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                    <div className="col-md-12 text-center">
                        <Link className="button type1" to={"/participation/" + testDrive.id}> {isActive ? 'Drive Through' : 'View Details'} </Link>
                    </div>
=======
                    <Link className="button type1" to={"/participation/" + testDrive.id}> {isActive ? 'Drive Through' : 'View Details'} </Link>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                </div>
            </div>

        </div>)
    }
}

export default TestDriveCardItem;