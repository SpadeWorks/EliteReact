import * as React from 'react';
import ui from 'redux-ui';
import TabbedArea from './TabbedArea';
import TabPane from './TabPane';
import LeaderBoardUser from './LeaderBoardUser'
import { Leaders } from '../../home/model';

interface HomeTabsProps {
    leaders: Leaders[];
    regionLeaders: Leaders[];
  updateUI: (any) => any;
  ui: any;
};
interface HomeTabsState {

};

class HomeTabs extends React.Component<HomeTabsProps, HomeTabsState> {
    constructor(props, context) {
        super(props, context);
    }
      
    render() {
        const {updateUI, ui, leaders, regionLeaders} = this.props;
        return ( <div>                       
            <TabbedArea ui={ui} updateUI={updateUI}>
            <TabPane display="REGIONAL LEADERBOARD" href="#regional">            
            </TabPane>
            <TabPane display="GLOBAL LEADERBOARD" href="#global">              
            </TabPane>            
          </TabbedArea>
          <div id="myTabContent" className="tab-content">
                    <div className="tab-pane active in" id="regional">
                        <div className="col-md-12">
                            <div className="row test_drive">
                            {
                                                        regionLeaders && regionLeaders.map(leaderBoard => {
                                                            return (<LeaderBoardUser
                                                                avatar= {leaderBoard.avatar} 
                                                                userName={leaderBoard.name} 
                                                                points={leaderBoard.points} userId={leaderBoard.id}></LeaderBoardUser>)
                                                        })
                                                }                                                                                                         
                                <a href="#" className="pull-right"> MORE >></a>
                            </div>
                        </div>
                    </div>
            <div className="tab-pane fade" id="global">
            <div className="col-md-12">
                            <div className="row test_drive">
                            {
                                                        leaders && leaders.map(leaderBoard => {
                                                            return (<LeaderBoardUser 
                                                                avatar= {leaderBoard.avatar} 
                                                                userName={leaderBoard.name} 
                                                                points={leaderBoard.points} userId={leaderBoard.id}></LeaderBoardUser>)
                                                        })
                                                }                                                                                                         
                                <a href="#" className="pull-right"> MORE >></a>
                            </div>
                        </div>
            </div>
            </div></div>
        );
    }
    
}

export default HomeTabs;
