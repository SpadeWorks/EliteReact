import Promise from "ts-promise";
import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDriveInstance } from '../model';
import Services from '../../common/services/services';
import { EliteProfile } from '../../home/model';
import { Messages } from '../../common/services/constants';
import ui from 'redux-ui';
interface TestDriveDetailsProps {
    testDriveInstance: TestDriveInstance;
    createTestDriveInstance: (testDriveInstance: TestDriveInstance) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        showPopUp: false,
        message: ''
    }
})
class TestDriveDetails extends React.Component<TestDriveDetailsProps> {
    constructor(props, context) {
        super(props, context);
        this.participate = this.participate.bind(this);
        this.isUserEligible = this.isUserEligible.bind(this);
    }

    checkForElements(array1: string[], array2: string[]) {
        var matchedElements = [];
        var matchedElement;
        array1.filter((item1: any) => {
            matchedElement = array2.filter((item2: any) => {
                return item1.Label == item2.Label;
            })
            matchedElement && matchedElements.push(matchedElement);
        });
        return matchedElement.length == array1.length;
    }

    isUserEligible() {
        return new Promise((resolve, reject) => {
            var ctx = this;
            Services.getEliteProfileByID().then((user: EliteProfile) => {
                var message = '';
                var isUserEligible: boolean;
                var matchedLocation = ctx.props.testDriveInstance.location.filter(location => {
                    return location == user.location;
                });

                if (!matchedLocation || !matchedLocation.length) {
                    message += Messages.TEST_DRIVE_LOCATION_ERROR + '\n';
                    isUserEligible = false;
                }
                var matchedDevices = [];
                var matchedDevice;

                if (!ctx.checkForElements(ctx.props.testDriveInstance.requiredDevices, user.availableDevices)) {
                    message += Messages.TEST_DRIVE_DEVICE_ERROR + '\n';
                    isUserEligible = false;
                }

                if (!ctx.checkForElements(ctx.props.testDriveInstance.requiredOs, user.availableOS)) {
                    message += Messages.TEST_DRIVE_DEVICE_ERROR + '\n';
                    isUserEligible = false;
                }

                resolve({ isUserEligible, message });
            })
        });
    }

    participate() {
        var ctx = this;
        this.isUserEligible().then((data: any) => {
            if (data.isUserEligible) {
                ctx.props.createTestDriveInstance(this.props.testDriveInstance)
            } else {
                ctx.props.updateUI({
                    showPopUp: true,
                    message: data.message
                });
            }
        })

    }

    render() {
        const { testDriveInstance, createTestDriveInstance, ui, updateUI } = this.props;
        return (<div className="col-md-12 detailed_box">
            <div className="row">
                <div className="container">

                    <Link to={"/"}>
                        <h2><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>{testDriveInstance.title}</h2>
                    </Link>
                </div>
                <div className="col-md-12" style={{ overflow: "auto" }}>
                    <div className="wrapper">
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <div className="row">
                                    <span className="orange">
                                        <i>DESCRIPTION</i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-3 pull-right">
                                <div className="col-md-12 social_box">
                                    <div className="row">
                                        <a href="#">
                                            <i className="material-icons">info</i>
                                        </a>
                                        <a href="#">
                                            <i className="material-icons">email</i>
                                        </a>
                                        <a href="#">
                                            <span className="teams"></span>
                                        </a>
                                        <a href="#">
                                            <i className="material-icons">share</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 testdrivedetails_box">
                            <span className="orange">
                                <i>POINTS :</i>
                            </span>
                            <div className="col-md-12 earn_box">

                                <div className="col-md-4">
                                    <div className="row">
                                        <canvas id="canvas5" width="140" height="140"></canvas>
                                        {/* <h3>{((testDriveInstance.numberOfTestCasesCompleted || 0) / (testDriveInstance.testCaseIDs.length || 0)) * 100}</h3> */}
                                        <span className="small">{testDriveInstance.numberOfTestCasesCompleted} of {testDriveInstance.testCaseIDs.length} tasks done</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="row">
                                        <canvas id="canvas4" width="140" height="140"></canvas>
                                        <h3>{testDriveInstance.currentPoint}.</h3>
                                        <span className="small">{testDriveInstance.currentPoint} of {testDriveInstance.maxPoints} points earned</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 para">
                            <span className="orange">TEST DRIVE PITCH</span>
                            <p>{testDriveInstance.description}</p>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-7  detailed_points profileinfo_box">
                                <div className="row inforow">
                                    <div className="col-md-4">
                                        <div className="row">
                                            <span className="orange">TEST DRIVE OWNER:</span>
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
                                                    <span className="orange">START DATE:</span>
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
                                                    <span className="orange">END DATE:</span>
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
                                            <span className="orange">DIFICULTY LEVEL:</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>{testDriveInstance.level}</h5>
                                    </div>
                                </div>
                                <div className="row inforow">
                                    <div className="col-md-4">
                                        <div className="row">
                                            <span className="orange">PARTICIPAINTS:</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>800</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 para">
                            <span className="orange">EXPERIANCE BUSINESS VALUE: </span>
                            <p>{testDriveInstance.expectedBusinessValue}</p>
                        </div>
                        <div className="col-md-12 para">
                            <span className="orange">ELIGIBLE DRIVER REGION: </span>
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
                            <span className="orange">ELIGIBLE DRIVER LOCATION</span>
                            <div className="row">
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
                        </div>
                        <div className="col-md-12 para">
                            <span className="orange">DEVICES REQUIRED</span>
                            <div className="row">
                                <ul className="select2-selection__rendered">
                                    {
                                        testDriveInstance.requiredDevices && testDriveInstance.requiredDevices.map((device: any, index) => {
                                            return (<li key={index} className="select2-selection__choice" title="iwatch">
                                                {device.Label}
                                            </li>)
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 para">
                            <span className="orange">OS REQUIRED</span>
                            <div className="row">
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

                        <div className="col-md-12 popup_buttonbox">
                            <input onClick={this.participate} className="button type1" type="button" value="Go For Drive" />
                            <button id="participationButton" style={{display: 'none'}} type="participationError" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="participationError" className={"modal fade " + (ui.showPopUp ? 'in' : '')}
                role="dialog" style={{ display: ui.showPopUp ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input 
                                onClick={() => {updateUI({showPopUp: false})}}
                            type="button" className="close" data-dismiss="modal" value="X"/>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body error">
                            <p>{ui.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDriveDetails;