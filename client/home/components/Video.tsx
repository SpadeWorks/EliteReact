import * as React from 'react';
import { Link } from "react-router-dom";
import * as $ from 'jquery';

interface VideoProps {
    videoInfo: any;
};
class Video extends React.Component<VideoProps> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        var self = this;
        var video: any = document.getElementById('introVideo');

        $("#link6").click(function (e) {
            var videoContainer = $(".modal-content");
            video.setAttribute('poster', self.props.videoInfo.videoPoster);
            video.pause();
            video.currentTime = 0;
            $(".playpause").fadeOut();
            video.play();
        });

        if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
            video.onpause = function () {
                $(".modal-content").children(".playpause").fadeIn();

            };

            video.onplay = function () {
                $(".modal-content").children(".playpause").fadeOut();
            };

            $('.video').parent().click(function () {
                if ($(this).children(".video").get(0).paused) {
                    $(this).children(".video").get(0).play();
                    $(this).children(".playpause").fadeOut();
                } else {
                    $(this).children(".video").get(0).pause();
                    $(this).children(".playpause").fadeIn();
                }
            });
        }

        $('#introVideo').hover(function toggleControls() {
            if (video.hasAttribute("controls")) {
                video.removeAttribute("controls")
            } else {
                video.setAttribute("controls", "controls")
            }
        })
    }
    render() {
        return (
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog video_box" role="document">
                    <div className="modal-header" style={{ display: 'none' }}>
                        <button type="button" className="close close-popup" data-dismiss="modal"><i className="material-icons">close</i></button>
                    </div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><i className="material-icons">close</i></button>
                        </div>
                        <video id="introVideo" className="video"
                            width="100%"
                            height="400px"
                            data-autoplay
                            src={this.props.videoInfo.video}
                            poster={this.props.videoInfo.videoPoster}>
                        </video>
                        <div className="playpause"><i className="material-icons">play_circle_outline</i></div>
                    </div>
                </div>
            </div>);

    }
}


export default Video;
