import firebase from 'firebase';
import {Alert} from 'react-native';
import {SET_FIELD} from './newProjectFormActions';

export const SET_PROJECTS = 'SET_PROJECTS';

const setProjects = (project) => ({
  type: SET_PROJECTS,
  project: project,
});

export const projectList = () => {
  const {currentUser} = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/project`)
      .on('value', (snapshot) => {
        const projects = snapshot.val();
        const action = setProjects(projects);
        dispatch(action);
      });
  };
};

export const deleteProject = (project) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Excluir projeto',
        'Deseja excluir esse projeto?',
        [
          {
            text: 'Não',
            onPress: () => {
              resolve(false);
              console.log('Usuario não quis excluir');
            },
          },
          {
            text: 'Sim',
            onPress: async () => {
              const {currentUser} = firebase.auth();
              try {
                await firebase
                  .database()
                  .ref(`/users/${currentUser.uid}/project/${project.id}`)
                  .remove();
                resolve(true);
                console.log(`Projeto ${project.name} foi excluido`);
              } catch (error) {
                reject(error);
              }
            },
          },
        ],
        {cancelable: true},
      );
    });
  };
};
