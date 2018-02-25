import * as React from 'react';
import { Link } from "react-router-dom";
import { TestDrive } from '../model';
import { ColumnsValues } from '../../common/services/constants';
import Services from '../../common/services/services';

interface ApprovalPendingItemProps {
    testDrive: TestDrive;
};
class ApprovalPendingItem extends React.Component<ApprovalPendingItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { testDrive} = this.props;
        return (<div className="col-md-12 currtestdrive_list testdrive_I_runbox">
            <div className="row">
                <div className="col-md-12">
                    <h4>{testDrive.title}</h4>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-7">
                                                <div className="row">
                                                    <span className="orange">Start Date :</span>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <h5 style={{ marginTop: "0px" }}>{Services.formatDate(testDrive.startDate)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 enddate_line">
                                        <div className="row inforow">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <span className="orange">End date : </span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <h5>{Services.formatDate(testDrive.endDate)}</h5>
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
                                                            <ul className={Services.getLevelNameClass(testDrive.levelNumber)}>
                                                                <li><span></span></li>
                                                                <li><span></span></li>
                                                                <li><span></span></li>
                                                            </ul>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="race_neme">{testDrive.level}</h5>
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
                                                        {testDrive.maxPoints}
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
                                                        {testDrive.testCaseIDs.length}
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
                                            <div className="col-md-12 ">
                                                <div className="row">
                                                    <span className="orange">Status :</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row inforow">
                                            <div className="col-md-12 enddate_line">
                                                <div className="row">
                                                    <h5>{testDrive.status}</h5>
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
                                    <Link to={"/testdrive/" + testDrive.id}>
                                        <i className="material-icons">mode_edit</i>
                                    </Link>
                                    <Link to={"/testdrive/" + testDrive.id}>
                                        <i className="material-icons">remove_red_eye</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default ApprovalPendingItem;