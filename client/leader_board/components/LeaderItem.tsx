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
        return (<div className="row test_drive leader_listbox">
            <div className="col-md-12 leader_box">
                <div className="leader_rank">
                    <span>1</span>
                </div>
                <div className="col-md-11 leader_name">
                    <div className="col-md-3 leader_namenphoto">
                        <img src="images/masc1.png" />
                        <h4>Monica Breadford </h4>
                    </div>
                    <div className="col-md-3 leader_car">
                        <img src="images/car.png" />
                    </div>
                    <div className="col-md-3">
                        <div className="col-md-12 point_box">
                            <span className="orange">
                                <i>292</i>
                            </span>
                        </div>
                        <div className="col-md-12 drive_status">
                            <span className="gray_count">Test Drive Completed</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-md-12 point_box">
                            <span className="orange">
                                <i>99,580</i>
                            </span>
                        </div>
                        <div className="col-md-12 drive_status">
                            <span className="gray_count">Total Points</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default LeaderItem;

