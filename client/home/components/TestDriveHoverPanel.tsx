import * as React from 'react';
import { Link } from "react-router-dom";
import Service from '../../common/services/services';
import { TestDrive } from '../../home/model';
import { Globals } from '../../common/services/constants';
import * as $ from 'jquery';
import Services from '../../common/services/services';
interface TestDriveHoverPanelProps {
    participants: number;
    checkPortion: string;
    testDrive: TestDrive;
};
class TestDriveHoverPanel extends React.Component<TestDriveHoverPanelProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $(".letest_drivebox").hide();
        $(".letest_drivebox2").hide();
    }
    render() {
        const { testDrive, checkPortion, participants } = this.props;
        return (<div className="col-md-12">
            <h3>{testDrive.title}</h3>
            <div className="col-md-12 social_box">
                <div className="row">
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
                        <i className="material-icons">share</i>
                    </a>
                </div>
            </div>
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
                                            {
                                                testDrive && testDrive.requiredDevices.map((device: any, index) => {
                                                    return (<li key={index} className="select2-selection__choice" title="iwatch">
                                                        {device.Label}
                                                    </li>)
                                                })}
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
                                                    {
                                                        testDrive && testDrive.requiredOs.map((os: any, index) => {
                                                            return (<li key={index} className="select2-selection__choice" title="iwatch">
                                                                {os.Label}
                                                            </li>)
                                                        })}
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
                                        <h4>{testDrive.owner}</h4>
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
                                    <div className="col-md-12 end_date">
                                        <span className="orange">
                                            <i>DIFFICULTY LEVEL :</i>
                                        </span>
                                        <h4>{testDrive.level}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 popup_buttonbox">
                    {
                        checkPortion != Globals.UPCOMMING_Test_Drive ? <Link className="button type1"
                            to={(checkPortion == Globals.TEST_DRIVE_THAT_I_RUN ? "/testdrive/" : "/participation/")
                                + testDrive.id}> Drive Through </Link> : ''
                    }
                </div>
            </div>
        </div>)
    }
}

export default TestDriveHoverPanel;
