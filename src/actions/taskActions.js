import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_TASKS = 'SET_TASKS';

const setTasks = (task) => ({
  type: SET_TASKS,
  task: task,
});

export const taskList = () => {
  const {currentUser} = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/task`)
      .on('value', (snapshot) => {
        const task = snapshot.val();
        const action = setTasks(task);
        dispatch(action);
      });
  };
};

export const deleteTask = (task) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Excluir tarefa',
        'Deseja excluir essa tarefa?',
        [
          {
            text: 'Não',
            onPress: () => {
              resolve(false);
            },
          },
          {
            text: 'Sim',
            onPress: async () => {
              const {currentUser} = firebase.auth();
              try {
                await firebase
                  .database()
                  .ref(`/users/${currentUser.uid}/task/${task.id}`)
                  .remove();
                resolve(true);
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
