import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface RideChoiceProps {
    updateUI: (any) => any;
    ui: any;
};
class RideChoice extends React.Component<RideChoiceProps> {
    constructor(props, context) {
        super(props, context);

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
            }, 1500);
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">YOU GOA A</p>
                <p className="next-text">CHOICE, BUD_</p>
                <div id="typewriteText"></div>
                <div className="col-md-12 CarAnimation_actionbox testdrive_actionbox">
                    <div className="button type1 pull-right animated_button">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Get a better ride" />
                    </div>
                </div>
            </div>)
    }
}
export default RideChoice;
