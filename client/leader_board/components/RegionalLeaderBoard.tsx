import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';

interface RegionalLeaderBoardProps {
    loadRegionalLeaderBoard: (region: string) => any;
    leaders: Leader[];
    region: string;
};
class RegionalLeaderBoard extends React.Component<RegionalLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadRegionalLeaderBoard(this.props.region);
    }

    render() {
        const { leaders } = this.props;
        return (
            <div className="col-md-12">{
                leaders && leaders.map(leader => {
                    return <LeaderItem leader={leader} />
                })
            }
            </div>)
    }
}

export default RegionalLeaderBoard;
