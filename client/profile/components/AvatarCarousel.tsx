import * as React from 'react';
import { Link } from "react-router-dom";
import { EliteProfile } from '../../home/model';
import * as $ from 'jquery';
import ui from 'redux-ui';

interface AvatarCarouselProps {
    eliteProfile: EliteProfile;
    avatars: any[];    
    updateUI: (any) => any;
    ui: any;
};

class AvatarCarousel extends React.Component<AvatarCarouselProps> {
    constructor(props, context) {
        super(props, context);
    }   

    avatarSelected(avatar,baseUrl)
    {
        this.props.updateUI({
            avatarSelectedID: avatar.ID,
            avatarSelectedImage: baseUrl + avatar.FileRef,
            avatarSelectedName: avatar.AvatarName
        })             
    }

    getAvatarImages(baseUrl) {
        var stringLI = "";
        var strImage = [];
        let avatars = this.props.avatars;        
        for (var i = 0,j=0; i < avatars.length; i = i + 8) {
            let outrdiv = <div className={'item' + (i==0 ? 'active' : '')}>
                <div className='col-md-12'>{
                    avatars.slice(i,i+8).map((avatar,index) => {
                        if(index%2==0)  
                        {                                            
                            return <div className="col-md-3"><a href='javascript:void(0)' onClick={() => this.avatarSelected(avatar,baseUrl)}><img id={avatar.ID} src={ baseUrl + avatar.FileRef} /></a></div>
                        }                        
                    })
                }
                </div>
                <div className='col-md-12'>{
                    avatars.slice(i,i+8).map((avatar,index) => {
                        if(index%2!=0) 
                        {                             
                            return <div className="col-md-3"><a href='javascript:void(0)' onClick={() => this.avatarSelected(avatar,baseUrl)}><img id={avatar.ID} src={ baseUrl + avatar.FileRef} /></a></div>
                        }
                    })
                }
                </div>
            </div>
            strImage.push(outrdiv);
        }   
        return strImage;             
    }


    render() {
        const { eliteProfile, avatars } = this.props;
        let baseUrl = location.protocol + "//" + location.hostname;
        return (<div><div className="col-md-12 avtar_selection">
            <span className="orange">Select Avatar</span>
        </div>
            <div className="modal-body">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    {/* <!-- Indicators --> */}
                    {/*let baseUrl = location.protocol + "//" + location.hostname;
                        AvatarImage: baseUrl + avatarDetails.FileRef*/}
                    <ol className="carousel-indicators">
                        {
                            avatars && avatars.length && avatars.map((avatar, index) => {
                                return (index % 8 == 0) &&
                                    <li data-target="#myCarousel" data-slide-to={index / 8}
                                        className={index == 0 ? "active" : ''}></li>
                            })
                        }
                    </ol>
                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner avatar_box">
                        {
                            this.getAvatarImages(baseUrl)
                        }
                    </div>
                    {/* <!-- Left and right controls --> */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div></div>)
    }
}

export default AvatarCarousel;