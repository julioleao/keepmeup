import firebase from 'firebase';
import {projectSavedSuccess} from './newProjectFormActions';

export const SET_ALL_FIELDS_TEAM = 'SET_ALL_FIELDS_TEAM';
export const setAllFieldsTeam = (team) => ({
  type: SET_ALL_FIELDS_TEAM,
  team: team,
});

export const saveTeam = (team) => {
  const {currentUser} = firebase.auth();

  return async (dispatch) => {
    if (team.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/team/${team.id}`)
        .set(team);
    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/team`)
        .push(team);
    }

    dispatch(projectSavedSuccess());
  };
};
