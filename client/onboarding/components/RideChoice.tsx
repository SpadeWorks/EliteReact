import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Services from '../../common/services/services';
interface RideChoiceProps {
    updateUI: (any) => any;
    ui: any;
};
class RideChoice extends React.Component<RideChoiceProps> {
    constructor(props, context) {
        super(props, context);
        this.getBetterRide = this.getBetterRide.bind(this);

    }
    componentDidMount() {
        Services.getApplicationConfigurations().then((appConfig: any) => {
            $('#typewriteText').typewrite({
                actions: [
                    { type: appConfig.RideChoiceText }
                ]
            });
        });
    }

    getBetterRide() {
        $(".ride_track img").css({ "position": "relative", "left": "690px", "transition": "all 3s", "opacity": "0.1" });
        this.props.updateUI({ nextScreen: this.props.ui.nextScreen + 1 })
    }

    goToDashboard() {
        window.location.reload();
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">YOU GOA A</p>
                <p className="next-text">CHOICE, BUD_</p>
                <div id="typewriteText"></div>


                <div className="col-md-12 intro_actionbox testdrive_actionbox">
                    <div className="button type1 pull-right">
                        <input onClick={() => this.getBetterRide()} type="button" value="Get a better ride" className="better_ride" />
                    </div>

                    <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Goto Dashboard" className="better_ride" />
                    </div>
                </div>
            </div>)
    }
}
export default RideChoice;
