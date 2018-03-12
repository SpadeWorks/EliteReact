import * as React from 'react';
import { Link } from "react-router-dom";

interface NavigationProps {
    currentUserImage: string;
};
class Navigation extends React.Component<NavigationProps> {
    constructor(props, context) {
        super(props, context);
    }

    openPopUp() {
        var options = {
            url: '/pages/referral.aspx',
            title: 'Refer friends, earn points',
            width: 600,
            height: 600,
        };         
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
            SP.UI.ModalDialog.showModalDialog(options);
            let dialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('','Loading...', 650, 600);
                setTimeout(() => {
                    dialog.close(SP.UI.DialogResult.OK);
                }, 6000)
        });   
             
    }
    render() {
        return (<div className="col-md-8 location_box">
            <div className="map_container">
                <object>
                    <img src="/Style%20Library/Elite/images/track.svg" className="map_image" />
                    <Link className="maplinks" to={"/testdrives"} id="link1">
                        <img src="/Style%20Library/Elite/images/testdrivecenter.png" />
                        <span>Test Drive Center</span>
                    </Link>

                    <a className="maplinks" id="link2" href="javascript:;" onClick={this.openPopUp}>
                        <img src="/Style%20Library/Elite/images/refer.png" />
                        <span>Refer a friend</span>
                    </a>

                    <Link className="maplinks" to={"/profile/"} id="link3">
                        <img src={this.props.currentUserImage} />
                        <span>My Profile</span>
                    </Link>
                    <Link className="maplinks" to={"/prizes"} id="link4">
                        <img src="/Style%20Library/Elite/images/Prizes.png" />
                        <span>Prizes</span>
                    </Link>
                    <Link className="maplinks" to={"/leaderboard"} id="link5">
                        <img src="/Style%20Library/Elite/images/leaderboard.png" />
                        <span>Leaderboard</span>
                    </Link>
                    <a data-toggle="modal" data-target="#exampleModal" id="link6" className="maplinks">
                        <img src="/Style%20Library/Elite/images/video.png" />
                        <span>Video</span></a>
                </object>
            </div>
        </div>)
    }
}

export default Navigation;