import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import services from '../../common/services/services';
import {TestDrive} from '../../test_drive/model';
import Footer from '../../common/components/Footer';
import {
    TestDrives,
    model,
    editTestDrive,
    deleteTestDrive,
    loadTestDrives
} from '../../test_drive';

interface AppProps {
  testDriveState: model.IState;
  dispatch: Dispatch<{}>;
}

@ui({
  // Save all state within the 'testDrives' key of the UI reducer
  key: "testDrives"
})

class TestDriveContainer extends React.Component<AppProps> {
  componentDidMount(){
    document.body.className = "black-bg";
    this.props.dispatch(loadTestDrives(services.getCurrentUserID()));
  }

  render() {
    const { testDriveState, dispatch } = this.props;
    return (
      <div className="testDrives container">
      <Loader show={testDriveState.loading} message={'loading'}>
        <TestDrives 
          testDrives={testDriveState.testDrives} 
          editTestDrive={(t: model.TestDrive) => dispatch(editTestDrive(t))}
          deleteTestDrive={(id: number) => dispatch(deleteTestDrive(id))}
        />
      </Loader>
      <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  state.testDriveState.loading = state.testDriveState.loading || 
    state.asyncInitialState.loading;
  return {
      testDriveState: state.testDriveState 
  }
};

export default connect(mapStateToProps)(TestDriveContainer);
