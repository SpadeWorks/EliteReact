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
                        { type: 'For a nerve-wracking, exciting journey. Internet points as pay, bitter competition, long months of testing cool,new stuff, a changed person on return. Honour, recognition (and one amazing gift) in case of success. Do you have it in you?' }

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
<<<<<<< HEAD
            


             <div className="col-md-12 intro_actionbox testdrive_actionbox letsgo">


                    <div className="button type1 pull-right animated_button">
                      <input value="Let's Go" type="button" onClick={() => createEliteUserProfile(currentUser)} />
                    </div>

                 


=======
            <div className="col-md-12 intro_actionbox testdrive_actionbox">
                <div className="button type1 pull-right animated_button">
                    <input value="Let's Go" type="button" onClick={() => createEliteUserProfile(currentUser)} />
>>>>>>> 2c72b5e078faa4810e3c88a35fa24c01bb0f1373
                </div>
            </div>
        </div>)
    }
}

export default Welcome;
