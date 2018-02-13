import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';

interface LeaderItemProps {
    leader: Leader;
};
class LeaderItem extends React.Component<LeaderItemProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { leader } = this.props;
        return (
            <Link to={"/profile/" + leader.id}>
                <div className="row test_drive leader_listbox">
                    <div className="col-md-12 leader_box">
                        <div className="leader_rank">
                            <span>{leader.rank}</span>
                        </div>
                        <div className="col-md-11 leader_name">
                            <div className="col-md-3 leader_namenphoto">
                                <img src={leader.avatar} className="leader-image" />
                                <h4>{leader.name}</h4>
                            </div>
                            <div className="col-md-3 leader_car">
                                <img src={leader.car} className="leader-car-mage" />
                            </div>
                            <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                    <span className="orange">
                                        <i>{leader.completedTestDrives}</i>
                                    </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                    <span className="gray_count">Test Drive Completed</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                    <span className="orange">
                                        <i>{leader.totalPoints}</i>
                                    </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                    <span className="gray_count">Total Points</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></Link>)
    }
}

export default LeaderItem;

