import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui'
import { Link } from "react-router-dom";

import '../../js/bootstrap.min.js';
import '../../js/animation.js';
import '../../js/motion.js';
import '../../js/counter.js';
// import '../../sound/typing.mp3';
import '../../js/typewrite.js';
import '../../js/custommAnimations.js';
import Services from '../../common/services/services';
import { User } from '../model';
import * as $ from 'jquery';

interface WelcomeProps {
    totalUsers: number;
    currentUser: User;
    createEliteUserProfile: (currentUser: User) => any;
    isUserCreated: boolean;
};
class Welcome extends React.Component<WelcomeProps> {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        setTimeout(
            function mytext() {
                $('#typewriteText').typewrite({
                    actions: [
                        { type: 'So, here is how this works...Equinix buys a ton of new software every year.But all this shiny, new stuff... it needs to fit just right into our workflow. Here is where you come in. You test drive these new applications, give your feedback and you earn points.Do this through the year and you could win some amazing prizes.That is all there is to it.' }

                        /*{type: 'Do you have it in you?'}*/
                    ]
                });
            }, 5000);
    }
    render() {
        const { totalUsers, currentUser, createEliteUserProfile } = this.props;
        return (<div className="header-title person_name">
            <h1 className="title"></h1>
            <p className="first-text">WELCOME</p>
            <p className="next-text">{currentUser.firstName || currentUser.displayName}</p>
            <div id="typewriteText" style={{ animationDelay: "10s" }}></div>
            <div className="col-md-12 intro_actionbox testdrive_actionbox">
                <div className="button type1 pull-right animated_button">
                    <input value="Let's Go" type="button" onClick={() => createEliteUserProfile(currentUser)} />
                </div>
            </div>
        </div>)
    }
}

export default Welcome;