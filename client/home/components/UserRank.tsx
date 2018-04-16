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
                <div className="col-md-offset-4 col-md-4">
                    <div className="testd_box">
                            <div className="player_box">
                                <div className="testd_count">{userRank} </div> <div className="glyphicon glyphicon-triangle-top" aria-hidden="true"></div><div className="increase_or_decreased"> +1 </div>
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
