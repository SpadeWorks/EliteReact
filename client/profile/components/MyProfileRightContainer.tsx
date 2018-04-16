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
<<<<<<< HEAD
            <div className="col-md-5 col-md-offset-1 device_box">                
=======
            <div className="col-md-5 col-md-offset-1 device_box">

>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                <div className="row devicelist">
                    <div className="col-md-4">
                        <span className="orange">Devices :</span>
                    </div>
                    <div className="col-md-8">
<<<<<<< HEAD
                    <div className="row">
=======
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                        <ul className="select2-selection__rendered">
                            {
                                eliteProfile.availableDevices && eliteProfile.availableDevices.map((devices:any, index) => {
                                   return(<li key={index} className="select2-selection__choice" title="iwatch">
                                       {devices.Label}
                                    </li>)
                                })}
                        </ul>
<<<<<<< HEAD
                        </div>
                    </div>
                </div>                
                <div className="row devicelist">
                    <div className="col-md-4">
                        <span className="orange">os :</span>
                    </div>
                    <div className="col-md-8">
                    <div className="row">

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
                </div>                
=======
                    </div>
                </div>

                
                <div className="row devicelist">
                    <div className="col-md-4">
                        <span className="orange">os :</span>
                    </div>
                    <div className="col-md-8">
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
                
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
            </div>
        )
    }
}

export default MyProfileRightContainer;