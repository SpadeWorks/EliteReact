import * as React from 'react';
import { Link } from "react-router-dom";

interface IntroProps {
    completeIntro: () => any;
};
class Intro extends React.Component<IntroProps> {
    constructor(props, context) {
        super(props, context);
        this.backToReferrer = this.backToReferrer.bind(this);

    }
    backToReferrer(){
        location.href = window.location.href;
    }
    render() {
        const {completeIntro} = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">CREW</p>
                <p className="next-text">WANTED</p>
                <div id="typewriteText"></div>
                <div className="btn-group">
                    <input onClick={completeIntro} type="button" value="Hell Yeah!" className="button type1" />
                    <input onClick={this.backToReferrer} type="button" value="Take me home!" className="button type1" />
                </div>
            </div>)
    }
}
export default Intro;
