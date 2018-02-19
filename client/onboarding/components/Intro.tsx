import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface IntroProps {
    completeIntro: () => any;
};
class Intro extends React.Component<IntroProps> {
    constructor(props, context) {
        super(props, context);
        this.backToReferrer = this.backToReferrer.bind(this);

    }
    backToReferrer() {
        location.href = window.location.href;
    }

    componentDidMount() {
        setTimeout(
            function mytext() {
                $('#typewriteText').typewrite({
                    actions: [
                        { type: 'So, here is how this works... Equinix buys a ton of new software every year. But all this shiny, new stuff.. it needs to fit just right into our workflow. Here is where you come in.You test drive these new applications, give your feedback and you earn points.Do this through the year and you could win some amazing prizes. That is all there is to it.' }

                        /*{type: 'Do you have it in you?'}*/
                    ]
                });
            },1500);
    }

    render() {
        const { completeIntro } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">CREW</p>
                <p className="next-text">WANTED</p>
                <div id="typewriteText"></div>

                <div className="col-md-12 intro_actionbox testdrive_actionbox">


                    <div className="button type1 pull-right animated_button">
                        <input onClick={this.backToReferrer} type="button" value="Take me home!" />
                    </div>

                    <div className="button type1 pull-right animated_button">
                        <input onClick={completeIntro} type="button" value="Hell Yeah!" />
                    </div>


                </div>


            </div>)
    }
}
export default Intro;
