import * as React from 'react';
import { TestDriveInstance } from '../model';
import Services from '../../common/services/services';
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

        return (<div className="col-md-12 detailed_box">
            <div className="row">
                <div className="col-md-12" style={{ overflow: "auto" }}>

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
                                        <a href="javascript:void(0);"
                                            onClick={() => Services.reportAbug(testDriveInstance.ownerEmail, testDriveInstance.title)}>
                                            <span className="report"></span>
                                        </a>
                                        <a href="javascript:void(0);"
                                            onClick={() => Services.emailOwner(testDriveInstance.ownerEmail, testDriveInstance.title)}>
                                            <i className="material-icons">email</i>
                                        </a>
                                        {/* <a href="#">
                                            <span className="teams"></span>
                                        </a> */}
                                        <a href="javascript:void(0);"
                                            onClick={() => Services.shareTestDrive(testDriveInstance.ownerEmail, testDriveInstance.title)}>
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
                                <div className="col-md-3">
                                    <div className="row">
                                        <canvas id="participation-time-total-points" width="140" height="140"></canvas>
                                        <h3>{pointsEarned}</h3>
                                        <span className="small">{testDriveInstance.currentPoint} of {testDriveInstance.maxPoints} points earned</span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <canvas id="participation-time-completed-tcases" width="140" height="140"></canvas>
                                        <h3>{testCaseCompletion.toFixed(0)} %</h3>
                                        <span className="small">{testDriveInstance.numberOfTestCasesCompleted} of {testDriveInstance.testCaseIDs.length} tasks done</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-12 para">
                        <span className="orange">TEST DRIVE PITCH :</span>
                        <p>{testDriveInstance.description}</p>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-7  detailed_points profileinfo_box">
                            <div className="row inforow">
                                <div className="col-md-4">
                                    <div className="row">
                                        <span className="orange">TEST DRIVE OWNER :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>{testDriveInstance.owner}</h5>
                                </div>
                            </div>
                            <div className="row inforow">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="row">
                                                <span className="orange">START DATE :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>{Services.formatDate(testDriveInstance.startDate)}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="row">
                                                <span className="orange">END DATE :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <h5>{Services.formatDate(testDriveInstance.endDate)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row inforow">
                                <div className="col-md-4">
                                    <div className="row">
                                        <span className="orange">DIFFICULTY LEVEL :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>{testDriveInstance.levelName}</h5>
                                </div>
                            </div>
                            <div className="row inforow">
                                <div className="col-md-4">
                                    <div className="row">
                                        <span className="orange">PARTICIPAINTS :</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>{testDriveInstance.participants || "0"}</h5>
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
                        <div className="row">
                            <ul className="select2-selection__rendered">
                                {
                                    testDriveInstance.region && testDriveInstance.region.map((region, index) => {
                                        return (<li key={index} className="select2-selection__choice" title="iwatch">
                                            {region}
                                        </li>)
                                    })
                                }

                            </ul>
                        </div>
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
                                })}
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
                        </ul>

                    </div>
                </div>
            </div>

        </div>)
    }
}

export default TestDriveInfo;
