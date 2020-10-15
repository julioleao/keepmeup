//import project from '../../project.json';

import {SET_TASKS} from '../actions';

//const INITIAL_STATE = project;

export default function (state = null, action) {
  switch (action.type) {
    case SET_TASKS:
      return action.task;
    default:
      return state;
  }
}
