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
<<<<<<< HEAD
            var actions = [];
            var lines = appConfig.RideChoiceText.split("\n");
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
                    { type: appConfig.RideChoiceText }
                ]
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
            });
        });
    }


    

    getBetterRide() {
       
<<<<<<< HEAD
        this.props.updateUI({ nextScreen: this.props.ui.nextScreen + 2 })
=======
        this.props.updateUI({ nextScreen: this.props.ui.nextScreen + 1 })
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
    }

    goToDashboard() {
        window.location.reload();
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">YOU GOT A</p>
                <p className="next-text">CHOICE, BUD</p>
                <div id="typewriteText"></div>

                <div className="stroller_ridebox">
<<<<<<< HEAD
                     <img src="/Style%20Library/Elite/images/stroller.png" />
                </div>
                <div className="col-md-12 intro_actionbox testdrive_actionbox betterride_box" style={{marginLeft:"280px"}}>
                   <div className="button type1 pull-left">
                        <input onClick={() => this.getBetterRide()} type="button" value="Go to dashboard" className="better_ride" />
                    </div>

                    {/* <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Go to dashboard" className="better_ride" />
                    </div> */}
                   
                     {/* <div className="button type1 pull-right">
                        <input onClick={() => this.getBetterRide()} type="button" value="Get a better ride" className="better_ride" />
                    </div> */}
=======
                     <img src="/sites/elite/Style%20Library/Elite/images/stroller.png" />
                </div>
                <div className="col-md-12 intro_actionbox testdrive_actionbox betterride_box">
                   <div className="button type1 pull-right">
                        <input onClick={() => this.goToDashboard()} type="button" value="Go to dashboard" className="better_ride" />
                    </div>
                   
                     <div className="button type1 pull-right">
                        <input onClick={() => this.getBetterRide()} type="button" value="Get a better ride" className="better_ride" />
                    </div>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                </div>
            </div>)
    }
}
export default RideChoice;
