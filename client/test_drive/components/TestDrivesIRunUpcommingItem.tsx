import * as React from 'react';
import { Link } from "react-router-dom";

interface TestDrivesIRunUpcommingItemsProps {

};
class TestDrivesIRunUpcommingItems extends React.Component<TestDrivesIRunUpcommingItemsProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="row">
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
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="orange">Dificulty Level:</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
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
                                                    <span className="orange">Possibe Points:</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        2000
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
                                                    <span className="orange">No of test Cases :</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <span className="big_text">
                                                        30
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="col-md-12 social_box">
                                <div className="row">
                                    <a href="#"><i className="material-icons">mode_edit</i></a>
                                    <a href="#"><i className="material-icons">remove_red_eye</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestDrivesIRunUpcommingItems;
