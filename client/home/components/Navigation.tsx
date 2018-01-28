import * as React from 'react';
import { Link } from "react-router-dom";

interface NavigationProps {

};
class Navigation extends React.Component<NavigationProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-8 component-container">
            <div className="map_container">
                <div>
                    <ul>
                        <li>
                            <Link to={"/testdrive"}>Create Test Drive</Link>
                        </li>
                        <li>
                            <Link to={"/testdrives"}>Test Drive Central</Link>
                        </li>
                    </ul>
                </div>
                <object>
                    {/* <embed src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/track.svg" /> */}
                    <a href="#" id="link1" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/testdrivecenter.png" />
                        <span>test drieves central</span>
                    </a>
                    <a href="#" id="link2" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                        <span>Refer a friend</span>
                    </a>
                    <a href="#" id="link3" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                        <span>My Profile</span>
                    </a>
                    <a href="#" id="link4" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/Prizes.png" />
                        <span>Prizes</span>
                    </a>
                    <a href="#" id="link5" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/leaderboard.png" />
                        <span>Leaderboard</span>
                    </a>
                    <a href="#" id="link6" className="maplinks">
                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/video.png" />
                        <span>Video</span>
                    </a>
                    {/* </embed> */}
                </object>
            </div>
        </div>)
    }
}

export default Navigation;