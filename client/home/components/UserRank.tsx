import * as React from 'react';
import { Link } from "react-router-dom";

interface UserRankProps {
    userRank: number;
    userName: string; 
};
class UserRank extends React.Component<UserRankProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {userName, userRank} = this.props;
        return (<div className="col-md-12">
            <div className="row">
<<<<<<< HEAD
                <div className="col-md-offset-4 col-md-4">
                    <div className="testd_box">
                            <div className="player_box">
                                <div className="testd_count">{userRank} </div> <div className="glyphicon glyphicon-triangle-top" aria-hidden="true"></div><div className="increase_or_decreased"> +1 </div>
=======
                <div className="col-md-12">
                    <div className="row">
                        <div className="line_box">
                        </div>
                        <div className="player_box">
                            <div className="col-md-3 testd_box">
                                <p><span className="testd_count">{userRank} </span> <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span><span className="increase_or_decreased"> +1 </span></p>
                            </div>
                            <div className="col-md-8 player_name text-left">
                                <h2>{userName}</h2>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                            </div>
                        <div className="player_name text-left">
                            <h2>{userName}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default UserRank;
