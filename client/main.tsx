import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, Store, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import testDriveApi from './test_drive/api/mockApi';
import Promise from "ts-promise";
import ManageTestDrive from './test_drive/components/ManageTestDrive';
import Home from './home/components/Home';
import rootReducer from './main/reducer';
import logger from 'redux-logger';
import TestDriveContainer from './main/components/TestDriveContainer';

const initialState = {};

const loadStore = (currentState) => {
  return new Promise(resolve => {
    testDriveApi.getTestDrives().then((data) => {
      resolve({
        ...currentState,
        testDriveState: {
          ...currentState.testDriveState,
          testDrives: data,
          loading: false
        }
      });
    });
  });
}

const store: Store<any> = createStore(rootReducer,
  compose(applyMiddleware(asyncInitialState.middleware(loadStore),
    thunkMiddleware,
    promiseMiddleware(),
    logger
  )));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/testdrive"}>Create Test Drive</Link>
          </li>
          <li>
            <Link to={"/testdrives"}>TestDrives</Link>
          </li>

        </ul>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/testdrive" component={ManageTestDrive} />
          <Route exact path="/testdrives" component={TestDriveContainer} />
          <Route path="/testdrive/:id" component={ManageTestDrive} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);