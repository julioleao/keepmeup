import moment from 'moment';

import {SET_FIELD, PROJECT_SAVED_SUCCESS} from '../actions';

const INITIAL_STATE = {
  name: '',
  description: '',
  date: moment().utcOffset('-03:00').format('ddd, D [de] MMMM [de] YYYY HH:mm:ss'),
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD:
      const clonedState = {...state};
      clonedState[action.field] = action.value;
      return clonedState;
    case PROJECT_SAVED_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
