import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';
import Pager from 'react-pager';
import ui from 'redux-ui';

interface GlobalLeaderBoardProps {
    loadGlobalLeaderBoard: () => any;
    leaders: Leader[];
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        total: 11,
        current: 1,
        visiblePage: 4,
    }
})
class GlobalLeaderBoard extends React.Component<GlobalLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
        this.props.loadGlobalLeaderBoard();
    }

    handlePageChanged(){
        console.log(this.props.ui);
    }
    render() {
        const { leaders, ui, updateUI } = this.props;
        return (
            <div className="col-md-12">{
                leaders && leaders.map(leader => {
                    return <LeaderItem leader={leader} />
                })
            }
                <Pager
                    total={ui.total}
                    current={ui.current}
                    visiblePages={ui.visiblePage}
                    titles={{ first: '<|', last: '>|' }}
                    className="pagination-sm pull-right"
                    onPageChanged={this.handlePageChanged}
                />
            </div>)
    }
}

export default GlobalLeaderBoard;
