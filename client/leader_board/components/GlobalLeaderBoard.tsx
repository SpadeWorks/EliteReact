import * as React from 'react';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';
import Pager from 'react-pager';
import ui from 'redux-ui';
import { Messages } from '../../common/services/constants';
import Loader from 'react-loader-advanced';
interface GlobalLeaderBoardProps {
    loadGlobalLeaderBoard: (skip: number, top: number) => any;
    loadCurrentLeaderBoardPosition: (region?: string) => any
    leaders: Leader[];
    currentUser: Leader;
    updateUI: (any) => any;
    ui: any;
    loading: boolean;
    currentUserPositionLoading: boolean;
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
        const { leaders, ui, updateUI, currentUser, loading, currentUserPositionLoading } = this.props;
        if (leaders && leaders.length && !ui.visibleItems) {
            this.getVisibleItems(ui.current);
        }
        return (

            <div className="col-md-12">
                <Loader show={loading} message={'Loading...'}>
                    {
                        ui.visibleItems && ui.visibleItems.map((leader, index) => {
                            return (<LeaderItem
                                key={index}
                                isCurrentUser={leader.id == currentUser.id}
                                leader={leader} />)
                        })
                    }

                    {
                        ui.visibleItems.length == 0 && leaders &&
                        leaders.slice(0, ui.itemsPerPage).map((leader, index) => {
                            return (<LeaderItem
                                key={index}
                                isCurrentUser={leader.id == currentUser.id}
                                leader={leader} />)
                        })
                    }

                    {
                        !loading && ui.visibleItems && ui.visibleItems.length == 0 && leaders && leaders.length == 0 ?
                            (<div className="no-data-message">{Messages.LEADERBOARD_GLOBAL_MSG}</div>) : ''
                    }

                    {
                        leaders.length > 0 ?
                            <Pager
                                total={Math.ceil(leaders.length / ui.itemsPerPage)}
                                current={ui.current}
                                visiblePages={ui.visiblePage}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={this.handlePageChanged}
                            /> : ''
                    }

                    {(currentUser.rank && currentUser.rank != -1) ? <LeaderItem
                        isCurrentUser={true}
                        leader={currentUser} /> : ''}

                </Loader>

            </div>
        )
    }
}

export default GlobalLeaderBoard;
