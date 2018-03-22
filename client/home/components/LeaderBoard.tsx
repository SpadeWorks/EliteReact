import * as React from 'react';
import ui from 'redux-ui';
import { Leaders } from '../../home/model';
import LeaderBoardUser from './LeaderBoardUser'
import { Link } from "react-router-dom";
import { Messages } from '../../common/services/constants';

interface LeaderBoardProps {
    updateUI: (any) => any;
    ui: any;
    leaders: Leaders[];
    regionLeaders: Leaders[];
};

class LeaderBoard extends React.Component<LeaderBoardProps> {
    render() {
        const { updateUI, ui, leaders, regionLeaders } = this.props;
        return (<div className="col-md-3 pull-right location_box small_leaderbox">
         
                <div className="row">
                    <div className="well">
                        <div>
                            <ul className="nav nav-tabs">
                                <li className=""><a href="#regional" data-toggle="tab">YOUR REGION</a></li>
                                <li className="active pull-right"><a href="#global" data-toggle="tab">GLOBAL LEADERBOARD</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane fade" id="regional">
                                    <div className="col-md-12">
                                        <div className="row test_drive">
                                            {
                                                regionLeaders && regionLeaders.length ?
                                                    regionLeaders.slice(0, 3).map((leaderBoard, index) => {
                                                        return (<LeaderBoardUser
                                                            rank={index + 1}
                                                            key={index}
                                                            avatar={leaderBoard.avatar}
                                                            userName={leaderBoard.name}
                                                            points={leaderBoard.totalPoints} userId={leaderBoard.id}></LeaderBoardUser>)
                                                    }) : ''
                                            }
                                            {(!regionLeaders && !regionLeaders.length) ? <div>
                                            <p>{Messages.LEADERBOARD_REGIONAL_MSG}</p>                                            
                                            </div> : ''}
                                            {
                                                (regionLeaders && regionLeaders.length >= 3) && <Link className="pull-right more" to={"/leaderboard/regional"}>
                                                    MORE >>
                                            </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane active in" id="global">
                                    <div className="col-md-12">
                                        <div className="row test_drive">
                                            {
                                                (leaders && leaders.length) ? leaders.map((leaderBoard, index) => {
                                                    return (<LeaderBoardUser
                                                        rank={index + 1}
                                                        key={index}
                                                        avatar={leaderBoard.avatar}
                                                        userName={leaderBoard.name}
                                                        points={leaderBoard.totalPoints} userId={leaderBoard.id}></LeaderBoardUser>)
                                                }) : ''
                                            }
                                            {(!leaders && !leaders.length) ? <div>
                                            <p>{Messages.LEADERBOARD_GLOBAL_MSG}</p>                                            
                                            </div> : ''}
                                            {
                                                (leaders && leaders.length >= 3) && <Link className="pull-right more" to={"/leaderboard/global"}>
                                                    MORE >>
                                            </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>);
    }
}

export default LeaderBoard;