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

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => {
  return {
    type: RESET_FORM,
  };
};

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = (project) => ({
  type: SET_ALL_FIELDS,
  project: project,
});

export const saveProject = (project) => {
  const {currentUser} = firebase.auth();

  return async (dispatch) => {
    if (project.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/project/${project.id}`)
        .set(project);
    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/project`)
        .push(project);
    }

    dispatch(projectSavedSuccess());
  };
};
