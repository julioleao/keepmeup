//import project from '../../project.json';

import {SET_PROJECTS} from '../actions';

//const INITIAL_STATE = project;

export default function (state = null, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.project;
    default:
      return state;
  }
}
