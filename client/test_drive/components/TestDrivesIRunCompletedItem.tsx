import * as React from 'react';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { TestDrive } from '../model';
import { ColumnsValues } from '../../common/services/constants';
import Services from '../../common/services/services';

interface TestDrivesIRunCompletedItemProps {
    testDrive: TestDrive;
};
class TestDrivesIRunCompletedItem extends React.Component<TestDrivesIRunCompletedItemProps> {
=======

interface TestDrivesIRunCompletedItemsProps {

};
class TestDrivesIRunCompletedItems extends React.Component<TestDrivesIRunCompletedItemsProps> {
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    constructor(props, context) {
        super(props, context);
    }
    render() {
<<<<<<< HEAD
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
=======
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>Skype for Bussiness</h4>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-2">
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
<<<<<<< HEAD
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <span className="orange">Start Date : </span>
=======
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <span className="orange">Start Date :</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
<<<<<<< HEAD
                                                    <h5 style={{ marginTop: "0px" }}>
                                                        {Services.formatDate(testDrive.startDate)}
                                                    </h5>
=======
                                                    <h5 style={{ marginTop: "0px" }}>Mar13, 2018</h5>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
<<<<<<< HEAD
                                    <div className="col-md-12 enddate_line">
                                        <div className="row inforow">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <span className="orange">End date : </span>
=======
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <span className="orange">End date :</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
<<<<<<< HEAD
                                                    <h5> {Services.formatDate(testDrive.endDate)}</h5>
=======
                                                    <h5> Mar18, 2018</h5>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD

=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
<<<<<<< HEAD
                                                    <span className="orange">TEST DRIVERS</span>
=======
                                                    <span className="orange">Difficulty Level:</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
<<<<<<< HEAD
                                                    <span className="big_text">
                                                        {testDrive.participants}
                                                    </span>
                                                    <span className="small_text">
                                                        / {testDrive.maxTestDrivers ? testDrive.maxTestDrivers.toFixed(0) : 'NO LIMIT'}
                                                    </span>
=======
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <ul className="dragrace_indicator">
                                                                <li><span></span></li>
                                                                <li><span></span></li>
                                                                <li><span></span></li>
                                                            </ul>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="race_neme">Drag Race</h5>
                                                        </div>
                                                    </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                                    <span className="orange">COMPLETED CASES</span>
=======
                                                    <span className="orange">Possible Points:</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
<<<<<<< HEAD
                                                        {completedPercent.toFixed(0)} %
                                                    </span>
=======
                                                        2000
                     </span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                                    <span className="orange">PASSED CASES</span>
=======
                                                    <span className="orange">No of test Cases :</span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
<<<<<<< HEAD
                                                        {passPercent.toFixed(0)} %
                                                    </span>
=======
                                                        30
                     </span>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div className="col-md-1">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="orange">% TO DEPLOY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="big_text">
                                                    {testDrive.passPercentageToDeploy.toFixed(0)} %
                                                    </span>
=======
                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">Status :</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <h5>Aprooval Pending</h5>
                                                </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD

                        </div>
                        <div className="col-md-2">

                            <div className="row social_box">
                                <a href="javascript:;"><i className={"material-icons" + (completedPercent >= 75 ?
                                    ' green-flag' : ' red-flag')} >flag</i></a>
                                <a href="javascript:;" onClick={() => Services.emailTestDrivers(testDrive)}><i className="material-icons">email</i></a>
                                {/* <Link to={"/testdrive/" + testDrive.id}>
                                    <i className="material-icons">edit</i>
                                </Link> */}
                                <a target="_blank" href={Services.getTeamSiteUrl(testDrive.teamsChannelID)}>
                                    <span className="teams"></span>
                                </a>
                                <a target='_blank' href={"/Pages/TestCaseReport.aspx?FilterField1=TestDriveID&FilterValue1=" + testDrive.id} >
                                    <i className="material-icons">remove_red_eye</i>
                                </a>
=======
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-12 social_box">
                                <div className="row">
                                    <a href="#"><i className="material-icons">mode_edit</i></a>
                                    <a href="#"><i className="material-icons">remove_red_eye</i></a>
                                </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
        </div>)
    }
}

export default TestDrivesIRunCompletedItem;
=======
        )
    }
}

export default TestDrivesIRunCompletedItems;
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
