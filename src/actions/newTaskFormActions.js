import firebase from 'firebase';
import {projectSavedSuccess} from './newProjectFormActions';

export const SET_ALL_FIELDS_TASKS = 'SET_ALL_FIELDS_TASKS';
export const setAllFieldsTasks = (task) => ({
  type: SET_ALL_FIELDS_TASKS,
  task: task,
});

export const saveTask = (task) => {
  const {currentUser} = firebase.auth();

  return async (dispatch) => {
    if (task.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/task/${task.id}`)
        .set(task);
    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/task`)
        .push(task);
    }

    dispatch(projectSavedSuccess());
  };
};
