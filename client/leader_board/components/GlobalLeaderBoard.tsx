import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';
import Pager from 'react-pager';
import ui from 'redux-ui';

interface GlobalLeaderBoardProps {
    loadGlobalLeaderBoard: (skip: number, top: number) => any;
    loadCurrentLeaderBoardPosition: (region?: string) => any
    leaders: Leader[];
    currentUser: Leader;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        itemsPerPage: 5,
        total: 11,
        current: 0,
        visiblePage: 4,
        visibleItems: []
    }
})
class GlobalLeaderBoard extends React.Component<GlobalLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.getVisibleItems = this.getVisibleItems.bind(this);
    }

    componentDidMount() {
        this.props.loadGlobalLeaderBoard(0, 100);
        this.props.loadCurrentLeaderBoardPosition();
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
            visibleItems: this.props.leaders.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    handlePageChanged(newPage) {
        this.getVisibleItems(newPage);
    }

    render() {
        const { leaders, ui, updateUI, currentUser } = this.props;
        if (leaders && leaders.length && !ui.visibleItems) {
            this.getVisibleItems(ui.current);
        }
        return (
            <div className="col-md-12">
                {
                    ui.visibleItems && ui.visibleItems.map((leader, index) => {
                        return (<LeaderItem
                            key={index}
                            leader={leader} />)
                    })
                }

                {
                    ui.visibleItems.length == 0 && leaders && leaders.slice(0, ui.itemsPerPage).map((leader, index) => {
                        return (<LeaderItem
                            key={index}
                            leader={leader} />)
                    })
                }
                {
                    leaders.length > 0 &&
                    <Pager
                        total={Math.ceil(leaders.length / ui.itemsPerPage)}
                        current={ui.current}
                        visiblePages={ui.visiblePage}
                        titles={{ first: '<', last: '>' }}
                        className="pagination-sm pull-right"
                        onPageChanged={this.handlePageChanged}
                    />
                }


                <LeaderItem
                    leader={currentUser} />
            </div>)
    }
}

export default GlobalLeaderBoard;
