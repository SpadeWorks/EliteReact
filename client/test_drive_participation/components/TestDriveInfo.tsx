import * as React from 'react';
import { TestDriveInstance } from '../model';
import Services from '../../common/services/services';
import { Messages } from '../../common/services/constants';
interface TestDriveInfoProps {
    testDriveInstance: TestDriveInstance;
};
class TestDriveInfo extends React.Component<TestDriveInfoProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        const { testDriveInstance } = this.props;
        var testCaseCompletion = (testDriveInstance.numberOfTestCasesCompleted || 0) / (testDriveInstance.testCaseIDs.length || 1);
        var pointsEarned = testDriveInstance.currentPoint / (testDriveInstance.maxPoints || 1);
        Services.loadProgressBar("participation-time-completed-tcases", testCaseCompletion, 150);
        Services.loadProgressBar("participation-time-total-points", pointsEarned, 150);
    }

    render() {
        const { testDriveInstance } = this.props;
        var testCaseCompletion = (testDriveInstance.numberOfTestCasesCompleted || 0) / (testDriveInstance.testCaseIDs.length || 1) * 100;
        var pointsEarned = testDriveInstance.currentPoint;
        const ownerEmails = testDriveInstance.owners ? 
            testDriveInstance.owners.map(o=> o.UserEMail).join(";") : '';

        return (<div className="col-md-12 detailed_box">
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <div className="row">
                            {/* <div className="col-md-2">
                                <span className="orange">
                                    <i>DESCRIPTION :</i>
                                </span>
                            </div> */}
                            <div className="col-md-4 pull-right">
                                <div className="col-md-12 social_box">
                                    <div className="row">
                                        <a href={"#/reportbug/" + testDriveInstance.testDriveID} title={Messages.REPORT_BUG_TITLE}>
                                            <span className="report"></span>
                                        </a>
                                        <a href="javascript:;" title={Messages.SEND_EMAIL_TITLE}
                                            onClick={() => Services.emailOwner(ownerEmails, testDriveInstance.title)}>
                                            <i className="material-icons">email</i>
                                        </a>
                                        {/* <a target="_blank" href={Services.getTeamSiteUrl(testDriveInstance.teamsChannelID)}>
                                            <span className="teams"></span>
                                        </a> */}
                                        <a href="javascript:;" title={Messages.SHARE_TITLE}
                                            onClick={() => Services.shareTestDrive(ownerEmails, testDriveInstance)}>
                                            <i className="material-icons">share</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 TestDriveInfo_box pariciation_time_details">
                        <span className="orange">
                            <i>POINTS :</i>
                        </span>
                        <div className="col-md-12 earn_box">
                            <div className="row">

                                <div className="col-md-2 text-center">
                                    <div className="row">
                                        <canvas id="participation-time-completed-tcases" width="140" height="140"></canvas>
                                        <h3>{testCaseCompletion.toFixed(0)} %</h3>
                                        <span className="small">{testDriveInstance.numberOfTestCasesCompleted} of {testDriveInstance.testCaseIDs.length} tasks done</span>
                                    </div>
                                </div>



                                <div className="col-md-3 text-center  col-md-offset-2">
                                    <div className="row">
                                        <canvas id="participation-time-total-points" width="140" height="140"></canvas>
                                        <h3>{pointsEarned}</h3>
                                        <span className="small">{testDriveInstance.currentPoint} of {testDriveInstance.maxPoints} points earned</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">Test Drive Description :</span>
                        <p>{testDriveInstance.description}</p>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-11  detailed_points profileinfo_box">
                            <div className="row inforow">
                                <div className="col-md-3">
                                    <div className="row">
                                        <span className="orange">TEST DRIVE OWNER :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5>{testDriveInstance.owners.map((o, index) => {
                                            return testDriveInstance.owners.length - 1 === index ?
                                                 o.UserInfoName : o.UserInfoName + ", "
                                        })}</h5>
                                    </div>
                                </div>
                            </div>
                            {
                                testDriveInstance.hasRegistration ?
                                    <div className="row inforow">
                                        <div className="col-md-5">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="row">
                                                        <span className="orange">REGISTRATION START DATE :</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <h5>{Services.formatDate(testDriveInstance.registrationStartDate)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <span className="orange">REGISTRATION END DATE :</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <h5>{Services.formatDate(testDriveInstance.registrationEndDate)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ''
                            }
                            <div className="row inforow">
                                <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="row">
                                                <span className="orange">START DATE :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <h5>{Services.formatDate(testDriveInstance.startDate)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="row">
                                                <span className="orange">END DATE :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <h5>{Services.formatDate(testDriveInstance.endDate)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row inforow">
                                <div className="col-md-3">
                                    <div className="row">
                                        <span className="orange">DIFFICULTY LEVEL :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 style={{ "position": "relative", "right": "10px" }}>{testDriveInstance.levelName}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row inforow">
                                <div className="col-md-3">
                                    <div className="row">
                                        <span className="orange">Test Drivers :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 style={{ "position": "relative", "right": "40px" }}>{testDriveInstance.participants || "0"}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">EXPECTED BUSINESS VALUE :</span>
                        <p>{testDriveInstance.expectedBusinessValue}</p>
                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">ELIGIBLE DRIVER REGION :</span>
                        <ul className="select2-selection__rendered">
                            {
                                testDriveInstance.region && testDriveInstance.region.map((region, index) => {
                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                        {region}
                                    </li>)
                                })
                            }
                            {
                                (!testDriveInstance.region || testDriveInstance.region.length == 0) && <p>{Messages.ALL_REGION_MSG}</p>
                            }
                        </ul>
                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">ELIGIBLE DRIVER FUNCTION :</span>

                        <ul className="select2-selection__rendered">
                            {
                                testDriveInstance.department && testDriveInstance.department.map((department: any, index) => {
                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                        {department.Label}
                                    </li>)
                                })
                            }
                            {
                                (!testDriveInstance.department || testDriveInstance.department.length == 0) && <p>{Messages.ALL_DEPARTMENT_MSG}</p>
                            }
                        </ul>

                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">ELIGIBLE DRIVER LOCATION :</span>

                        <ul className="select2-selection__rendered">
                            {
                                testDriveInstance.location && testDriveInstance.location.map((location: any, index) => {
                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                        {location.Label}
                                    </li>)
                                })
                            }
                            {
                                (!testDriveInstance.location || testDriveInstance.location.length == 0) && <p>{Messages.ALL_LOCATION_MSG}</p>
                            }
                        </ul>

                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">DEVICES REQUIRED :</span>

                        <ul className="select2-selection__rendered">
                            {
                                testDriveInstance.requiredDevices && testDriveInstance.requiredDevices.map((device: any, index) => {
                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                        {device.Label}
                                    </li>)
                                })
                            }
                            {
                                (!testDriveInstance.requiredDevices || testDriveInstance.requiredDevices.length == 0) && <p>{Messages.ALL_DEVICES_MSG}</p>
                            }
                        </ul>

                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">OS REQUIRED :</span>

                        <ul className="select2-selection__rendered">
                            {
                                testDriveInstance.requiredOs && testDriveInstance.requiredOs.map((os: any, index) => {
                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                        {os.Label}
                                    </li>)
                                })
                            }
                            {
                                (!testDriveInstance.requiredOs || testDriveInstance.requiredOs.length == 0) && <p>{Messages.ALL_OS_MSG}</p>
                            }
                        </ul>

                    </div>
                </div>
            </div>

        </div>)
    }
}

export default TestDriveInfo;
