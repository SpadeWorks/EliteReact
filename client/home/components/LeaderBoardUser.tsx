import * as React from 'react';
import ui from 'redux-ui';

interface LeaderBoardUserProps {
  userName: string;
  points: number;
  userId: number;
  avatar: string;
};

interface LeaderBoardUserState {

}

class LeaderBoardUser extends React.Component<LeaderBoardUserProps> {
  render() {
    return (<div>{
          <a href="#">
          <div className="col-md-12 leader_box">
              <div className="leader_rank"><span>{this.props.userId}</span></div>
              <div className="col-md-12 leader_name">
                  <div className="avatar">
                      <img src={this.props.avatar} className="img-responsive" />
                  </div>
                  <div className="col-md-9 l_count_box">
                      <div className="col-md-12 name">
                      {this.props.userName}                          
                      </div>
                      <div className="col-md-8 count pull-right">
                          <div className="row">
                              <p className="orange">POINTS:</p>
                              <p className="digits"> {this.props.points}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </a> 
      }</div>);
  }
}

export default LeaderBoardUser;