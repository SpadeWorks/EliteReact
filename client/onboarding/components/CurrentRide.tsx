import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Services from '../../common/services/services';
import Loader from 'react-loader-advanced';
interface CurrentRideProps {
    updateUI: (any) => any;
    ui: any;
};
class CurrentRide extends React.Component<CurrentRideProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            var actions = [];
            var lines = appConfig.CurrentRideText.split("\n");
            lines.forEach((line, index) => {
                actions.push({
                    type: line + ' '
                });
                if (index < lines.length - 1 && line && line.length > 0) {
                    actions.push({
                        type: "<br>"
                    });
                }
            });
            $('#typewriteText').typewrite({
                actions: actions
            });
        });

    }
    goToDashboard() {
        var interval, self = this;
        Services.getCurrentUserProfileProperty("EliteProfileID").then((data: any)=>{
            if (data) {
                this.props.updateUI({loading: false, loadingMessage: 'Loading...'});
                window.location.reload();
            } else {
                this.props.updateUI({loading: true, loadingMessage: 'Creating you profile...'});
                interval = setInterval(self.goToDashboard(), 1000);
            }
        });
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <Loader show={ui.loading} message={ui.loadingMessage || 'Loading...'}>
                    <h1 className="title"></h1>
                    <p className="first-text red_text">SHINY!</p>

                    <div id="typewriteText" className="currentride_text" style={{ animationDelay: "10s" }}></div>
                    <div className="shoping_cartbox">
                        <img src="/Style%20Library/Elite/images/shoppingcart.png" />
                    </div>
                    <div className="col-md-12 intro_actionbox testdrive_actionbox new_ride">
                        {/* <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Also Yes!" />
                    </div> */}
                        <div className="button type1 pull-right" style={{ position: "absolute", right: "311px", bottom: "0px" }}>
                            <input onClick={() => this.goToDashboard()} type="button" value="Yes!" />
                        </div>
                    </div>
                </Loader>
            </div>)
    }
}
export default CurrentRide;
