import * as React from 'react';
import { Link } from "react-router-dom";

interface ProfileProps {

};
class Profile extends React.Component<ProfileProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<h1>Profile</h1>)
    }
}

export default Profile;
