import * as React from 'react';
import ui from 'redux-ui';
import { Link } from "react-router-dom";
import { Leader } from '../model';
import LeaderItem from './LeaderItem';
import Service from '../../common/services/services';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pager from 'react-pager';

interface RegionalLeaderBoardProps {
    loadRegionalLeaderBoard: (region: string, skip: number, top: number) => any;
    loadCurrentRegionalPosition: (region: string) => any;
    leaders: Leader[];
    currentUser: Leader;

    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
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
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.getVisibleItems = this.getVisibleItems.bind(this);
    }

    regionChange = (value) => {
        this.props.updateUI({
            region: value
        });
        this.props.loadRegionalLeaderBoard(this.props.ui.region.Label, 0, 100);
    }

    componentDidMount() {
        let user = Service.getUserProfileProperties();
        this.props.loadRegionalLeaderBoard(user.region, 0, 100);
        this.props.updateUI({ region: user.region });
        this.props.loadCurrentRegionalPosition(user.region);
    }

    getVisibleItems(newPage) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            current: newPage,
            visibleItems: this.props.leaders.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    getRegions(input, callback) {
        const functions = Service.getRegions().then((regions: Array<any>) => {
            input = input.toLowerCase();
            var options = regions.filter((i: any) => {
                return i.Label.toLowerCase().indexOf(input) > -1;
            });
            var data = {
                options: options.slice(0, 5),
                complete: options.length <= 6,
            };
            callback(null, data);
        })
    }

    handlePageChanged(newPage) {
        this.getVisibleItems(newPage);
    }

    render() {
        const { leaders, currentUser, ui } = this.props;
        return (
            <div className="col-md-12">
                <Select.Async multi={false}
                    value={ui.region}
                    onChange={this.regionChange}
                    valueKey="TermGuid"
                    labelKey="Label"
                    loadOptions={this.getRegions}
                    type="select-multiple"
                />
                <br></br>

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
                        titles={{ first: '<|', last: '>|' }}
                        className="pagination-sm pull-right"
                        onPageChanged={this.handlePageChanged}
                    />
                }

                <LeaderItem
                    leader={currentUser} />

            </div>)
    }
}

export default RegionalLeaderBoard;
