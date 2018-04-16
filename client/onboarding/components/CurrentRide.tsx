import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Services from '../../common/services/services';
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
<<<<<<< HEAD
            var actions = [];
            var lines = appConfig.CurrentRideText.split("\n");
            lines.forEach((line, index) => {
                actions.push({
                    type: line + ' '
                });
                if(index < lines.length -1 && line && line.length > 0){
                    actions.push({
                        type: "<br>"
                    });
                }
            });
            $('#typewriteText').typewrite({
                actions: actions
=======
            $('#typewriteText').typewrite({
                actions: [
                    { type: appConfig.CurrentRideText }
                ]
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
            });
        });

    }
    goToDashboard() {
        window.location.reload();
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text red_text">SHINY!</p>

                <div id="typewriteText" className="currentride_text" style={{ animationDelay: "10s" }}></div>
                <div className="shoping_cartbox">
<<<<<<< HEAD
                    <img src="/Style%20Library/Elite/images/shoppingcart.png" />
                </div>
                <div className="col-md-12 intro_actionbox testdrive_actionbox new_ride">
                    {/* <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Also Yes!" />
                    </div> */}
                    <div className="button type1 pull-right" style={{ position: "absolute",right:"311px",bottom:"0px" }}>
                        <input onClick={() => this.goToDashboard()} type="button" value="Yes!" />
=======
                    <img src="/sites/elite/Style%20Library/Elite/images/shoppingcart.png" />
                </div>
                <div className="col-md-12 intro_actionbox testdrive_actionbox new_ride">
                    <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Also Yes" />
                    </div>
                    <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Yes" />
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                    </div>
                </div>
            </div>)
    }
}
export default CurrentRide;
