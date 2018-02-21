import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface CurrentRideProps {
    updateUI: (any) => any;
    ui: any;
};
class CurrentRide extends React.Component<CurrentRideProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        setTimeout(
            function mytext() {
                $('#typewriteText').typewrite({
                    actions: [
                        { type: 'you just got yourself a shopping cart car.  Ready for some thrilling heroics ?' }

                        /*{type: 'Do you have it in you?'}*/
                    ]
                });
            }, 1500);
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
            <p className="next-text">SHINY !</p>
                <div id="typewriteText" style={{ animationDelay: "10s" }}></div>
                <div className="shoping_cartbox">
                    <img src="/sites/elite/Style%20Library/Elite/images/shoppingcart.png" />
                </div>
            <div className="col-md-12 intro_actionbox testdrive_actionbox">
            <div className="button type1 pull-right">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Also Yes" />
                    </div>

                    <div className="button type1 pull-right">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Yes" />
                    </div>
                </div>

            </div>)
    }
}
export default CurrentRide;
