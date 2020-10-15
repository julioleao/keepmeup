import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_TEAM = 'SET_TEAM';

const setTeam = (team) => ({
  type: SET_TEAM,
  team: team,
});

export const teamList = () => {
  const {currentUser} = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/team`)
      .on('value', (snapshot) => {
        const team = snapshot.val();
        const action = setTeam(team);
        dispatch(action);
      });
  };
};

export const deleteTeam = (team) => {
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
                  .ref(`/users/${currentUser.uid}/team/${team.id}`)
                  .remove();
                resolve(true);
                console.log(`tarefa ${team.name} foi excluido`);
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
