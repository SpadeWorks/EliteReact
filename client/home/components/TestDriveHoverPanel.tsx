import * as React from 'react';
import { Link } from "react-router-dom";
import Service from '../../common/services/services';
import { TestDrive } from '../../home/model';
import { Globals, Messages } from '../../common/services/constants';
import * as $ from 'jquery';
import Services from '../../common/services/services';
interface TestDriveHoverPanelProps {
    participants: number;
    checkPortion: string;
    testDrive: TestDrive;
    isActive: boolean;
};
class TestDriveHoverPanel extends React.Component<TestDriveHoverPanelProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $(".letest_drivebox").hide();
        $(".letest_drivebox2").hide();
        $('[data-toggle="popover"]').popover();
    }

    getTabLinks(items: any[]) {
        var moreLink = '', maxItems = 2, maxLength = 23;
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
        const { testDrive, checkPortion, participants, isActive } = this.props;
        var moreDevices = '', moreOs = '';

        const ownerEmails = testDrive.owners ? 
            testDrive.owners.map(o=> o.UserEMail).join(";") : '';

        return (<div className="col-md-12">
            <h3>{testDrive.title}</h3>
            <div className="col-md-12 social_box">
                <div className="row">
                    {/* <a href={"#/reportbug/"+testDrive.id}
                        title={Messages.REPORT_BUG_TITLE}>
                        <span className="report"></span>
                    </a> */}
                    <a href="javascript:;"
                        onClick={() => Services.emailOwner(ownerEmails, testDrive.title)} title={Messages.SEND_EMAIL_TITLE}>
                        <i className="material-icons">email</i>
                    </a>
                    {
                        checkPortion == Globals.TEST_DRIVE_THAT_I_RUN &&
                        <a target="_blank" href={"https://teams.microsoft.com/_?threadId=19:" + testDrive.teamsChannelID + "@thread.skype&ctx=channel"}>
                            <span className="teams"></span>
                        </a>
                    }
                    <a href="javascript:;" title={Messages.SHARE_TITLE}
                        onClick={() => Services.shareTestDrive(ownerEmails, testDrive)}>
                        <i className="material-icons">share</i>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 popup_infocontainer">
                    <div className="row">
                        <div className="col-md-6 drive_info">
                            <div className="row">
                                <div className="col-md-12 owner">
                                    <span className="orange">
                                        <i>POSSIBLE POINTS :</i>
                                    </span>
                                    <h4>{testDrive.maxPoints}</h4>
                                </div>
                                <div className="col-md-12 end_date">
                                    <span className="orange">
                                        <i>NO. OF TEST CASES :</i>
                                    </span>
                                    <h4>{testDrive && testDrive.testCaseIDs && testDrive.testCaseIDs.length}</h4>
                                </div>
                                <div className="col-md-12 end_date">
                                    <span className="orange">
                                        <i>DEVICES REQUIRED :</i>
                                    </span>
                                    <div className="col-md-12 para">
                                        <div className="row">
                                            <ul className="select2-selection__rendered">
                                                {testDrive && testDrive.requiredDevices ? this.getTabLinks(testDrive.requiredDevices) : ''}
                                                {
                                                    (!testDrive.requiredDevices || testDrive.requiredDevices.length == 0) && <p>{Messages.ALL_DEVICES_MSG}</p>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12 end_date">
                                        <div className="row">
                                            <span className="orange">
                                                <i>OS REQUIRED :</i>
                                            </span>
                                            <div className="col-md-12 para">
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
                            </div>
                        </div>
                        <div className="col-md-6 drive_info">
                            <div className="row">
                                <div className="col-md-12 popup_dificultybox">
                                    <div className="row">
                                        <div className="col-md-12 owner">
                                            <span className="orange">
                                                <i>DRIVE OWNER :</i>
                                            </span>
                                            <h4>{testDrive.owners && testDrive.owners.map((o, index) => {
                                                return testDrive.owners.length - 1 === index ?
                                                    o.UserInfoName : o.UserInfoName + ", "
                                            })}</h4>
                                        </div>
                                        <div className="col-md-12 end_date">
                                            <span className="orange">
                                                <i>START DATE :</i>
                                            </span>
                                            <h4>{Service.formatDate(testDrive.startDate)}</h4>
                                        </div>
                                        <div className="col-md-12 end_date">
                                            <span className="orange">
                                                <i>END DATE :</i>
                                            </span>
                                            <h4>{Service.formatDate(testDrive.endDate)}</h4>
                                        </div>
                                        <div className="col-md-12 end_date">
                                            <span className="orange">
                                                <i>PARTICIPANTS :</i>
                                            </span>
                                            <h4>{participants}</h4>
                                        </div>
                                        <div className="col-md-12 end_date race_type">
                                            <span className="orange">
                                                <i>DIFFICULTY LEVEL :</i>
                                            </span>
                                            <h4>{testDrive.levelName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 popup_buttonbox">
                        {
                            checkPortion == Globals.TEST_DRIVE_THAT_I_RUN ?
                                <div dangerouslySetInnerHTML={{ __html: "<a href='../Pages/TestCaseReport.aspx?FilterField1=TestDriveID&FilterValue1=" + testDrive.id + "' target='_blank' class='button type1'>View Details</a>" }}></div> : <Link className="button type1"
                                    to={(checkPortion == Globals.TEST_DRIVE_THAT_I_RUN ? "/testdrive/" : "/participation/")
                                        + testDrive.id}> {isActive ? 'Drive Through' : 'View Details'} </Link>
                        }
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDriveHoverPanel;
