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
    render() {
        return (<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog video_box" role="document">
                <div style={{ display: 'none' }}>
                    <button type="button" className="btn btn-default close-popup" data-dismiss="modal">Close</button>
                </div>
                <div className="modal-content">
             <video width="100%" controls>
             <source src="/Style%20Library/Elite/images/movie.mp4" type="video/mp4" />
             {/* <source src={this.props.videoUrl} type="video/mp4" /> */}
  {/* <source src={this.props.videoUrl && this.props.videoUrl.replace("mp4","ogg")} type="video/ogg" /> */}
    {/* <source src="/Style%20Library/Elite/images/movie.ogg" type="video/ogg" /> */}
                        Your browser does not support HTML5 video.
                    </video>
                

                    {/* <video width="100%" height="400px;" controls>
  <source src="/Style%20Library/Elite/images/movie.mp4" type="video/mp4" />
  <source src="/Style%20Library/Elite/images/movie.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video> */}



                </div>
            </div>
        </div>);
    }
}

export default Video;
