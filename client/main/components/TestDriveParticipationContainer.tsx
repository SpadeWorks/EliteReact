import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import services from '../../common/services/services';
import TestDriveDetails from '../../test_drive_participation/components/TestDriveDetails';
import TestDriveParticipation from '../../test_drive_participation/components/TestDriveParticipation';
import {
  model,
  loadTestDriveInstanceByID,
  createOrSaveTestDriveInstance
} from '../../test_drive_participation';

interface AppProps {
  instanceID: number;
  testDriveID: number;
  testDriveInstance: any;
  dispatch: Dispatch<{}>;
  loading: boolean;
}

@ui({
  // Save all state within the 'testDrives' key of the UI reducer
  key: "testDrives"
})

class TestDriveParticipationContainer extends React.Component<AppProps> {
  componentDidMount() {
    this.props.dispatch(loadTestDriveInstanceByID(this.props.testDriveID));
  }
  render() {
    const { dispatch, testDriveInstance, loading } = this.props;
    return (
      <div className="testDrives container">
        <Loader show={loading} message={'loading'}>
          {
            testDriveInstance.instanceID == -1 && 
                <TestDriveDetails 
                  testDriveInstance={testDriveInstance}
                  createTestDriveInstance={
                    (testDriveInstance: model.TestDriveInstance) => 
                      dispatch(createOrSaveTestDriveInstance(testDriveInstance))} />
          }
          {
            testDriveInstance.instanceID != -1 &&
              <TestDriveParticipation testDriveInstance={testDriveInstance} />
          }
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let testDriveID = parseInt(ownProps.match.params.id);

  return {
    testDriveID: testDriveID || -1,
    testDriveInstance: state.participationState.testDriveInstance,
    loading: state.participationState.loading
  }
};

export default connect(mapStateToProps)(TestDriveParticipationContainer);
