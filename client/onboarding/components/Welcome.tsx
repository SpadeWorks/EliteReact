import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui'
import { Link } from "react-router-dom";
import '../../js/jquery.min.js';
import '../../js/bootstrap.min.js';
import '../../js/animation.js';
import '../../js/motion.js';
import '../../js/counter.js';
// import '../../sound/typing.mp3';
import '../../js/typewrite.js';
import '../../js/custommAnimations.js';
import Services from '../../common/services/services';
import { User } from '../model';

interface WelcomeProps {
    totalUsers: number;
    currentUser: User;
    createEliteUserProfile: (currentUser: User) => any;
};
class Welcome extends React.Component<WelcomeProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { totalUsers, currentUser, createEliteUserProfile } = this.props;
        return (<div className="header-title person_name">
            <h1 className="title"></h1>
            <p className="first-text">WELCOME</p>
            <p className="next-text">{currentUser.firstName}</p>
            <div id="typewriteText" style={{ animationDelay: "10s" }}></div>
            <div className="btn-group">
                <input value="Let's Go"
                    type="button"
                    onClick={() => createEliteUserProfile(currentUser)}
                    className="button type1" style={{ opacity: 0.3 }} />
            </div>
        </div>)
    }
}

export default Welcome;
