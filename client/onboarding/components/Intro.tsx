import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';
import Services from '../../common/services/services';
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
        location.href = document.referrer;
    }

    componentDidMount() {

        Services.getApplicationConfigurations().then((appConfig: any) => {
            $('#typewriteText').typewrite({
                actions: [
                    { type: appConfig.IntroductionText }
                ]
            });
        });
    }

    render() {
        const { ui, updateUI } = this.props;
        return (
            <div className="header-title">
                <h1 className="title"></h1>
                <p className="first-text">DRIVERS</p>
                <p className="next-text">WANTED</p>
                <div id="typewriteText"></div>
                <div className="col-md-12 intro_actionbox testdrive_actionbox">
                    <div className="button type1 pull-right animated_button">
                        <input onClick={this.backToReferrer} type="button" value="Take me home!" />
                    </div>
                    <div className="button type1 pull-right animated_button">
                        <input onClick={() => updateUI({ nextScreen: ui.nextScreen + 1 })} type="button" value="Heck yeah!" />
                    </div>
                </div>
            </div>)
    }
}
export default Intro;
