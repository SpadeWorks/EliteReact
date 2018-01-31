import * as React from 'react';
import { Link } from "react-router-dom";

interface VideoProps {

};
class Video extends React.Component<VideoProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<h1>Video</h1>);
    }
}

export default Video;
