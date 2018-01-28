import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, Store, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import {Switch, Route, Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import testDriveApi from './test_drive/api/mockApi';
import Promise from "ts-promise";
import ManageTestDrive from './test_drive/components/ManageTestDrive';
import Home from './home/components/Home';
import rootReducer from './main/reducer';
import TestDriveContainer from './main/components/TestDriveContainer';
import logger from 'redux-logger';
const initialState = {};

// const loadStore = (currentState) => {
//   return new Promise(resolve => {
//     testDriveApi.getTestDrives().then((data) => {
//       resolve({
//         ...currentState,
//         testDriveState: {
//           ...currentState.testDriveState,
//           testDrives: data,
//           loading: false
//         }
//       });
//     });
//   });
// }

const store: Store<any> = createStore(rootReducer,
  compose(applyMiddleware(
    // asyncInitialState.middleware(loadStore),
    thunkMiddleware,
    promiseMiddleware(),
    logger
  )));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/" >
      <div>
        <Switch>
          <Route exact path="/testdrive" component={ManageTestDrive} />
          <Route exact path="/testdrives" component={TestDriveContainer} />
          <Route path="/testdrive/:id" component={ManageTestDrive} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);