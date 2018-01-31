import * as React from 'react';
import ui from 'redux-ui';
import HomeTabs from './HomeTabs';
import {Leaders } from '../../home/model';

interface LeaderBoardProps {
    updateUI: (any) => any;
    ui: any;
    leaders: Leaders[];
    regionLeaders: Leaders[];
};

interface LeaderBoardState {

}

class LeaderBoard extends React.Component<LeaderBoardProps> {
    render() {
        const {updateUI, ui, leaders, regionLeaders} = this.props;
        return (<div className="col-md-4 location_box">
            <div className="col-md-12">
                <div className="row">
                    <div className="well">
                        <HomeTabs ui={ui} updateUI={updateUI} leaders={leaders} regionLeaders={regionLeaders} />
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default LeaderBoard;