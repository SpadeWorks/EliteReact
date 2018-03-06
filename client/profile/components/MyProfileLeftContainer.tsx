import * as React from 'react';
import { Link } from "react-router-dom";
import { EliteProfile } from '../../home/model';

interface MyProfileLeftContainerProps {
    eliteProfile: EliteProfile;
};
class MyProfileLeftContainer extends React.Component<MyProfileLeftContainerProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { eliteProfile } = this.props;
        return (
            <div className="col-md-6  profileinfo_box" style={{ borderRight: "solid 1px #3c3c3c" }}>
                <div className="row inforow">
                    <div className="col-md-5">
                        <span className="orange">Role :</span>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <h5>{eliteProfile.role}</h5>
                        </div>
                    </div>
                </div>
                <div className="row inforow">
                    <div className="col-md-5">
                        <span className="orange">Region :</span>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <h5>{eliteProfile.region}</h5>
                        </div>
                    </div>
                </div>
                <div className="row inforow">
                    <div className="col-md-5">
                        <span className="orange">Location :</span>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <h5>{eliteProfile.location}</h5>
                        </div>
                    </div>
                </div>
                <div className="row inforow">
                    <div className="col-md-5">
                        <span className="orange">Joined Date :</span>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <h5>{eliteProfile.dateJoined}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfileLeftContainer;