import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';

interface VideoProps {
    videoUrl: string;
};
class Video extends React.Component<VideoProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
    }
    render() {
        return (<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog video_box" role="document">
                <div style={{ display: 'none' }}>
                    <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
                </div>
                <div className="modal-content">
                    <video width="100%" controls height="400px" data-autoplay src={this.props.videoUrl}>
                    </video>
                </div>
            </div>
        </div>);
    }
}

export default Video;
