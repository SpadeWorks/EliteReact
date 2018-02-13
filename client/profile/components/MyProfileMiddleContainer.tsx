import * as React from 'react';
import { Link } from "react-router-dom";
import { EliteProfile } from '../../home/model';

interface MyProfileMiddleContainerProps {
    eliteProfile: EliteProfile;
    currentTestDrives: number;
};
class MyProfileMiddleContainer extends React.Component<MyProfileMiddleContainerProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { eliteProfile, currentTestDrives } = this.props;
        return (
            <div className="row profile_overviewbox">
                <div className="col-md-12 overview">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <p>
                                    <span className="orange">
                                        <i>{currentTestDrives}</i>
                                    </span>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <h4 className="testcase_title">Current test drives</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12">
                                <img src={eliteProfile.carImage} />
                            </div>
                            <div className="col-md-12">
                                <h4 className="testcase_title">Current ride</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12">
                                <p>
                                    <span className="orange">
                                        <i>{eliteProfile.carName}</i>
                                    </span>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <h4 className="testcase_title">Current level name</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <p>
                                    <span className="orange">
                                        <i>{eliteProfile.completedTestDrives}</i>
                                    </span>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <h4 className="testcase_title">Completed test drives</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12">
                                <p>
                                    <span className="orange">
                                        <i>{eliteProfile.completedTestCases}</i>
                                    </span>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <h4 className="testcase_title">Completed test cases</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfileMiddleContainer;