import * as React from 'react';
import { Link } from "react-router-dom";

interface NavigationProps {

};
class Navigation extends React.Component<NavigationProps> {
    constructor(props, context) {
        super(props, context);
    }

    openPopUp() {
        var options = {
            url: 'http://intranet.spdev.equinix.com/sites/elite-dev-akash/Pages/referral.aspx',
            title: 'User Referral',
            width: 500,
            height: 300,
        };
        SP.UI.ModalDialog.showModalDialog(options);
        let dialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('Operation in progress...', 'Please wait...', 350, 550);
        setTimeout(() => {
            dialog.close(SP.UI.DialogResult.OK);
        }, 4000)
    }
    render() {
        return (<div className="col-md-8 location_box">
            <div className="map_container">
                <object>
                    <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/track.svg" />
                    <Link className="maplinks" to={"/testdrives"} id="link1">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/testdrivecenter.png" />
                        <span>test drieves central</span>
                    </Link>

                    <a className="maplinks" id="link2" href="javascript:;" onClick={this.openPopUp}>
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                        <span>Refer a friend</span>
                    </a>

                    <Link className="maplinks" to={"/myprofile"} id="link3">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                        <span>My Profile</span>
                    </Link>
                    <Link className="maplinks" to={"/prizes"} id="link4">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/Prizes.png" />
                        <span>Prizes</span>
                    </Link>
                    <Link className="maplinks" to={"/leaderboard"} id="link5">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/leaderboard.png" />
                        <span>Leaderboard</span>
                    </Link>
                    <Link className="maplinks" to={"/video"} id="link6">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/video.png" />
                        <span>Video</span>
                    </Link>
                </object>
            </div>
        </div>)
    }
}

export default Navigation;