import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
interface TestDriveIRunItemProps {
    indexKey: number;
    testDrive: TestDrive
    editTestDrive: (testDrive: TestDrive) => any;
    deleteTestDrive: (id: number) => any;
};
class TestDriveIRunItem extends React.Component<TestDriveIRunItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="row">
            <div className="col-md-12">
                <h4>Skype for Bussiness</h4>
            </div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <span className="orange">Start Date :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <h5 style={{ marginTop: "0px" }}>Mar13, 2018</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <span className="orange">End date : </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <h5> Mar18, 2018</h5>
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
                                        <div className="col-md-7">
                                            <div className="row">
                                                <span className="orange">test Drivers :</span>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="row">
                                                <div className="testd_box">
                                                    <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span><span className="up_no">+1</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row outof">
                                                <span className="big_text">500</span>
                                                <span className="small_text">/ 800</span>
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
                                                <span className="orange">Completed Tests :</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="big_text">74%</span>
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
                                                <span className="orange">passed Cases :</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="big_text">50%</span>
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
                                                <span className="orange">Failed Cases :</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row inforow">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <span className="big_text">24%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="col-md-12 social_box">
                            <div className="row">
                                <a href="#"><i className="material-icons">flag</i></a>
                                <a href="#"><i className="material-icons">email</i></a>
                                <a href="#"><i className="material-icons">share</i></a>
                                <a href="#"><i className="material-icons">remove_red_eye</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDriveIRunItem;
