import React from 'react';
import Routes from './Routes';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

const TaskApp = (props) => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default TaskApp;
