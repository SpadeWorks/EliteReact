import * as React from 'react';
import ui from 'redux-ui';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';
import Service from '../../common/services/services';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pager from 'react-pager';
import { Messages } from '../../common/services/constants';
import Loader from 'react-loader-advanced';
interface RegionalLeaderBoardProps {
    loadRegionalLeaderBoard: (region: string, skip: number, top: number) => any;
    loadCurrentRegionalPosition: (region: string) => any;
    leaders: Leader[];
    currentUser: Leader;
    loading: boolean;
    updateUI: (any) => any;
    ui: any;
    currentUserPositionLoading: boolean;
};

@ui({
    state: {
        userRegion: '',
        region: '',
        itemsPerPage: 5,
        total: 20,
        current: 0,
        visiblePage: 4,
        visibleItems: []
    }
})

class RegionalLeaderBoard extends React.Component<RegionalLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
        this.getRegions = this.getRegions.bind(this);
        this.regionChange = this.regionChange.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.getVisibleItems = this.getVisibleItems.bind(this);

    }

    regionChange = (value) => {
        this.props.updateUI({
            region: value
        });
        this.props.loadRegionalLeaderBoard(value.Label, 0, 100);
        this.props.updateUI({
            current: 0,
            visibleItems: []
        });
    }

    componentDidMount() {
        let user = Service.getUserProfileProperties();
        this.props.loadRegionalLeaderBoard(user.region, 0, 100);
        this.props.loadCurrentRegionalPosition(user.region);
        this.props.updateUI({ userRegion: user.region });
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
            visibleItems: this.props.leaders.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    getRegions(input, callback) {
        const ctx = this;
        const functions = Service.getRegions().then((regions: Array<any>) => {
            input = input.toLowerCase();
            var options = regions.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            if (ctx.props.ui.region == '') {
                let defaultRegion = regions.filter(region => {
                    return region.Label == ctx.props.ui.userRegion;
                })
                ctx.props.updateUI({ region: defaultRegion[0] });
                this.props.loadRegionalLeaderBoard(this.props.ui.region.Label, 0, 100);
            }
            callback(null, data);
        })
    }

    handlePageChanged(newPage) {
        this.getVisibleItems(newPage);
    }

    render() {
        const { leaders, currentUser, ui, loading, currentUserPositionLoading } = this.props;
        return (
            <div className="col-md-12">
                <Loader show={loading} message={'Loading...'}>
                    <Select.Async multi={false}
                        value={ui.region}
                        onChange={this.regionChange}
                        valueKey="TermGuid"
                        labelKey="Label"
                        loadOptions={this.getRegions}
                        type="select-multiple"
                        clearable={false}
                    />
                    <br></br>

                    {
                        (ui.visibleItems && ui.visibleItems.length > 0) ? ui.visibleItems.map((leader, index) => {
                            return (<LeaderItem
                                key={index}
                                isCurrentUser={leader.id == currentUser.id}
                                leader={leader} />)
                        }) : ''
                    }


                    {
                        (ui.visibleItems && ui.visibleItems.length == 0 && leaders && leaders.length) ? leaders.slice(0, ui.itemsPerPage).map((leader, index) => {
                            return (<LeaderItem
                                key={index}
                                isCurrentUser={leader.id == currentUser.id}
                                leader={leader} />)
                        }) : ''
                    }

                    {
                        !loading && ui.visibleItems && ui.visibleItems.length == 0 && leaders && leaders.length == 0 ?
                            (<div className="no-data-message">{Messages.LEADERBOARD_REGIONAL_MSG}</div>) : ''
                    }

                    {
                        leaders.length > 0 &&
                        <Pager
                            total={Math.ceil(leaders.length / ui.itemsPerPage)}
                            current={ui.current}
                            visiblePages={ui.visiblePage}
                            titles={{
                                first:   '<<',
                                prev:    '<',
                                next:    '>',
                                last:    '>>'
                            }}
                            className="pagination-sm pull-right"
                            onPageChanged={this.handlePageChanged}
                        />
                    }
                    {
                        (currentUser.rank && currentUser.rank != -1 && currentUser.region == ui.region.Label) ? <LeaderItem
                            isCurrentUser={true}
                            leader={currentUser} /> : ''
                    }
                </Loader>
            </div >)
    }
}

export default RegionalLeaderBoard;
