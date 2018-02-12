import * as React from 'react';
import { Link } from "react-router-dom";
import { EliteProfile } from '../../home/model';

interface MyProfileRightContainerProps {
    eliteProfile: EliteProfile;
};
class MyProfileRightContainer extends React.Component<MyProfileRightContainerProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { eliteProfile } = this.props;
        return (
            <div className="col-md-6 col-md-offset-1 device_box">
                <div className="row devicelist">
                    <div className="col-md-3">
                        <span className="orange">os :</span>
                    </div>
                    <div className="col-md-9">
                        <ul className="select2-selection__rendered">
                        {
                            eliteProfile.availableOS && eliteProfile.availableOS.map((OS:any, index) => {
                               return(<li key={index} className="select2-selection__choice" title="iwatch">
                                   {OS.Label}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
                <div className="row devicelist">
                    <div className="col-md-3">
                        <span className="orange">Devices :</span>
                    </div>
                    <div className="col-md-9">
                        <ul className="select2-selection__rendered">
                            {
                                eliteProfile.availableDevices && eliteProfile.availableDevices.map((devices:any, index) => {
                                   return(<li key={index} className="select2-selection__choice" title="iwatch">
                                       {devices.Label}
                                    </li>)
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfileRightContainer;