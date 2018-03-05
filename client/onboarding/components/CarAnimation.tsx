import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface CarAnimationProps {
    updateUI: (any) => any;
    ui: any;
};
class CarAnimation extends React.Component<CarAnimationProps> {
    constructor(props, context) {
        super(props, context);

    }
    backToReferrer() {
        location.href = window.location.href;
    }

    componentDidMount() {
        $(document).ready(function(){


$(".ride_track img").css({ "position": "relative", "left": "690px", "transition": "all 6s", "opacity": "1" });

        });

        
        setTimeout(() => {
            this.props.updateUI({ nextScreen: this.props.ui.nextScreen + 1 })
        },6000);

        


    }

 render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">GET SET</p>
                <p className="next-text go_text">GO</p>
 <div className="red_box red-box-container">
                <div className="ride_track">
                                        <img src="/sites/elite/Style%20Library/Elite/images/stroller-1.png" />
                                    </div>
                                    </div>
            </div>)
    }
}
export default CarAnimation;