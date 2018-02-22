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
        setTimeout(() => {
            this.props.updateUI({ nextScreen: this.props.ui.nextScreen + 1 })
        }, 1500);
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">GET SET</p>
                <p className="next-text">GO_</p>
            </div>)
    }
}
export default CarAnimation;