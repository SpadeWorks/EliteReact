import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import  LeaderItem from './LeaderItem';

interface GlobalLeaderBoardProps {
    loadGlobalLeaderBoard: () => any;
    leaders: Leader[];
};
class GlobalLeaderBoard extends React.Component<GlobalLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadGlobalLeaderBoard();
    }
    render() {
        const { leaders } = this.props;
        return (
            <div className="col-md-12">{
                leaders && leaders.map(leader =>{
                   return <LeaderItem leader={leader} /> 
                })
                }
        </div>)
    }
}

export default GlobalLeaderBoard;
