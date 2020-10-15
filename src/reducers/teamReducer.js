//import project from '../../project.json';

import {SET_TEAM} from '../actions';

//const INITIAL_STATE = project;

export default function (state = null, action) {
  switch (action.type) {
    case SET_TEAM:
      return action.team;
    default:
      return state;
  }
}
