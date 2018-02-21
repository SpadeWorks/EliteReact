import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
interface IntroProps {
    updateUI: (any) => any;
    ui: any;
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
                        { type: 'For a nerve-wracking, exciting journey. Internet points as pay,bitter competition,long months of testing cool, new stuff, a changed person on return.Honour, recognition (and one amazing gift) in case of success.Do you have it in you?' }

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
                <p className="first-text">CREW</p>
                <p className="next-text">WANTED</p>
                <div id="typewriteText"></div>
            
                <div className="col-md-12 intro_actionbox testdrive_actionbox">
                    <div className="button type1 pull-right animated_button">
                        <input onClick={this.backToReferrer} type="button" value="Take me home!" />
                    </div>
                    <div className="button type1 pull-right animated_button">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Hell Yeah!" />
                    </div>
                </div>


            </div>)
    }
}
export default Intro;
