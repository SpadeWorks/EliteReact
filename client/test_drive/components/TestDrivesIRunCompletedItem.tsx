import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import { ColumnsValues } from '../../common/services/constants';
import Services from '../../common/services/services';

interface TestDrivesIRunCompletedItemProps {
    testDrive: TestDrive;
};
class TestDrivesIRunCompletedItem extends React.Component<TestDrivesIRunCompletedItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { testDrive } = this.props;

        var completedPercent = testDrive.report.total == 0 ?
            0 : ((testDrive.report.total - testDrive.report.inProgress) / testDrive.report.total) * 100;

        var passPercent = testDrive.report.total == 0 ?
            0 : (testDrive.report.pass / testDrive.report.total) * 100;

        var failPercent = testDrive.report.total == 0 ?
            0 : (testDrive.report.fail / testDrive.report.total) * 100;

        return (<div className="col-md-12 currtestdrive_list testdrive_I_runbox">
            <div className="row">
                <div className="col-md-12">
                    <Link to={'/testdrive/' + testDrive.id + '/display'}><h4>{testDrive.title}</h4></Link>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <span className="orange">Start Date : </span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <h5 style={{ marginTop: "0px" }}>
                                                        {Services.formatDate(testDrive.startDate)}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 enddate_line">
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <span className="orange">End date : </span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <h5> {Services.formatDate(testDrive.endDate)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">TEST DRIVERS</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        {testDrive.participants}
                                                    </span>
                                                    <span className="small_text">
                                                        / {testDrive.maxTestDrivers ? testDrive.maxTestDrivers.toFixed(0) : 'NO LIMIT'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">COMPLETED CASES</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        {completedPercent.toFixed(0)} %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">PASSED CASES</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        {passPercent.toFixed(0)} %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                            
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">FAILED CASES</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        {failPercent.toFixed(0)} %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          
                        </div>
                        <div className="col-md-2">

                            <div className="row social_box">
                                <a href="javascript:;"><i className={"material-icons" + (completedPercent >= 75 ?
                                    ' green-flag' : ' red-flag')} >flag</i></a>
                                <a href="javascript:;" onClick={() => Services.emailTestDrivers(testDrive)}><i className="material-icons">email</i></a>
                                {/* <Link to={"/testdrive/" + testDrive.id}>
                                    <i className="material-icons">edit</i>
                                </Link> */}
                                <a target="_blank" href={"https://teams.microsoft.com/_?threadId=19:" + testDrive.teamsChannelID + "@thread.skype&ctx=channel"}>
                                    <span className="teams"></span>
                                </a>
                                <a target='_blank' href={"/Pages/TestCaseReport.aspx?FilterField1=TestDriveID&FilterValue1=" + testDrive.id} >
                                    <i className="material-icons">remove_red_eye</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDrivesIRunCompletedItem;