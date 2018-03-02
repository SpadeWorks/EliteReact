import * as React from 'react';
import ui from 'redux-ui';
import { Link } from "react-router-dom";

interface LeaderBoardUserProps {
  userName: string;
  points: number;
  userId: number;
  avatar: string;
  rank: number;
};

interface LeaderBoardUserState {

}

class LeaderBoardUser extends React.Component<LeaderBoardUserProps> {
  render() {
      const {points, avatar, userId, userName, rank} = this.props;
    return (<div>{
        <Link to={"/profile/"+userId}>
          <div className="col-md-12 leader_box">
              <div className="leader_rank"><span>{rank}</span></div>
              <div className="col-md-12 leader_name">
                  <div className="avatar">
                      <img src={avatar} className="img-responsive" />
                  </div>
                  <div className="col-md-9 l_count_box">
                      <div className="col-md-12 name">
                      {userName}                          
                      </div>
                      <div className="col-md-8 count pull-right">
                          <div className="row">
                              <p className="orange">POINTS:</p>
                              <p className="digits"> {points}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Link>
      }</div>);
  }
}

export default LeaderBoardUser;