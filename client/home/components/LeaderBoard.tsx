import * as React from 'react';
import ui from 'redux-ui';
import { Leaders } from '../../home/model';
import LeaderBoardUser from './LeaderBoardUser'
import { Link } from "react-router-dom";

interface LeaderBoardProps {
    updateUI: (any) => any;
    ui: any;
    leaders: Leaders[];
    regionLeaders: Leaders[];
};

class LeaderBoard extends React.Component<LeaderBoardProps> {
    render() {
        const { updateUI, ui, leaders, regionLeaders } = this.props;
        return (<div className="col-md-4 location_box">
            <div className="col-md-12">
                <div className="row">
                    <div className="well">
                        <div>
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#regional" data-toggle="tab">REGIONAL LEADERBOARD</a></li>
                                <li className="pull-right"><a href="#global" data-toggle="tab">GLOBAL LEADERBOARD</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane active in" id="regional">
                                    <div className="col-md-12">
                                        <div className="row test_drive">
                                            {
                                                regionLeaders && regionLeaders.map((leaderBoard, index) => {
                                                    return (<LeaderBoardUser
                                                        rank={index + 1}
                                                        key={index}
                                                        avatar={leaderBoard.avatar}
                                                        userName={leaderBoard.name}
                                                        points={leaderBoard.totalPoints} userId={leaderBoard.id}></LeaderBoardUser>)
                                                })
                                            }
                                            <Link className="pull-right" to={"/leaderboard"}>
                                                MORE >>                                                                                              
                                            </Link>                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="global">
                                    <div className="col-md-12">
                                        <div className="row test_drive">
                                            {
                                                leaders && leaders.map((leaderBoard, index) => {
                                                    return (<LeaderBoardUser
                                                        rank={index + 1}
                                                        key={index}
                                                        avatar={leaderBoard.avatar}
                                                        userName={leaderBoard.name}
                                                        points={leaderBoard.totalPoints} userId={leaderBoard.id}></LeaderBoardUser>)
                                                })
                                            }
                                            <Link className="pull-right" to={"/leaderboard"}>
                                                MORE >>                                                                                              
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default LeaderBoard;