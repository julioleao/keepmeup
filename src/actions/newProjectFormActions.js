import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field: field,
    value: value,
  };
};

export const PROJECT_SAVED_SUCCESS = 'PROJECT_SAVED_SUCCESS';
export const projectSavedSuccess = () => {
  return {
    type: PROJECT_SAVED_SUCCESS,
  };
};

export const saveProject = (project) => {
  const {currentUser} = firebase.auth();

  return async (dispatch) => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/projects`)
      .push(project);

    dispatch(projectSavedSuccess());
  };
};
