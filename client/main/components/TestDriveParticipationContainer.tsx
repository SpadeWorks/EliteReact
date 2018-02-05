import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import services from '../../common/services/services';
import TestDriveDetails from '../../test_drive_participation/components/TestDriveDetails';
import {
    model,
    loadTestDriveInstanceByID
} from '../../test_drive_participation';

interface AppProps {
  instanceID: number;
  testDriveID: number;
  testDriveInstance:any;
  dispatch: Dispatch<{}>;
  loading: boolean;
}

@ui({
  // Save all state within the 'testDrives' key of the UI reducer
  key: "testDrives"
})

class TestDriveParticipationContainer extends React.Component<AppProps> {
  componentDidMount(){
    this.props.dispatch(loadTestDriveInstanceByID(this.props.testDriveID, this.props.instanceID));
  }
  render() {
    const {dispatch, testDriveInstance, loading} = this.props;
    return (
      <div className="testDrives container">
      <Loader show={loading} message={'loading'}>
      {
            <TestDriveDetails testDriveInstance={testDriveInstance}/>
      }
      </Loader>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps)  => {
    let testDriveID = ownProps.match.params.id;
    let instanceID = ownProps.match.params.instanceID;
  return {
      testDriveID: testDriveID || -1,
      instanceID: instanceID || -1,
      testDriveInstance: state.participationState.testDriveInstance,
      loading: state.participationState.loading
  }
};

export default connect(mapStateToProps)(TestDriveParticipationContainer);
