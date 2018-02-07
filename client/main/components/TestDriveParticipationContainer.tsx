import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import services from '../../common/services/services';
import TestDriveDetails from '../../test_drive_participation/components/TestDriveDetails';
import TestDriveParticipation from '../../test_drive_participation/components/TestDriveParticipation';
import Services from '../../common/services/services';
import Footer from '../../common/components/Footer';
import {
  model,
  loadTestDriveInstanceByID,
  createOrSaveTestDriveInstance,
  createOrSaveTestCaseInstance
} from '../../test_drive_participation';


interface AppProps {
  instanceID: number;
  testDriveID: number;
  testDriveInstance: any;
  dispatch: Dispatch<{}>;
  loading: boolean;
  updateUI: (any) => any;
  ui: any;
}

@ui({
  // Save all state within the 'testDrives' key of the UI reducer
  key: "testDrives"
})

class TestDriveParticipationContainer extends React.Component<AppProps> {
  componentDidMount() {
    document.body.className = "black-bg";
    let userID = Services.getCurrentUserID();
    this.props.dispatch(loadTestDriveInstanceByID(this.props.testDriveID, userID));
  }

  render() {
    const { dispatch, testDriveInstance, loading, ui, updateUI } = this.props;
    return (
      <div className="test-drive-participation">
        <Loader show={loading} message={'loading'}>
          {
            !loading && testDriveInstance.instanceID == -1 &&
            <TestDriveDetails
              testDriveInstance={testDriveInstance}
              createTestDriveInstance={
                (testDriveInstance: model.TestDriveInstance) =>
                  dispatch(createOrSaveTestDriveInstance(testDriveInstance))} />
          }
          {
            !loading && testDriveInstance.instanceID != -1 &&
            <TestDriveParticipation testDriveInstance={testDriveInstance}
              saveTestCaseResponse={(testDriveInstance) =>
                dispatch(createOrSaveTestCaseInstance(testDriveInstance))}
              updateUI={updateUI}
              ui={ui}
            />
          }
        </Loader>
        <Footer />
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
