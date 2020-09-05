import React from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';
import AddTask from '../screens/AddTask';

const getRightContent = (props) => {
  return (
    <TouchableOpacity
      style={Styles.right}
      onPress={() => {
        Alert.alert(
          'Excluir tarefa',
          'Deseja excluir essa tarefa?',
          [
            {
              text: 'Não',
              onPress: () => {
                console.log('Usuario não quis excluir');
              },
            },
            {
              text: 'Sim',
              onPress: () => {
                console.log('Usuario quis excluir');
              },
            },
          ],
          {cancelable: true},
        );
      }}>
      <Icon name="trash" size={30} color="#FFF" />
    </TouchableOpacity>
  );
};

const ProjectListItem = (props) => {
  const {task, onPressItem} = props;
  const {name, date, req} = task;
  //const {name, req} = tasks;
  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={() => {
        return (
          <TouchableOpacity
            style={Styles.left}
            onPress={() => {
              onPressItem({task});
            }}>
            <Icon name="edit" size={30} color="#FFF" />
          </TouchableOpacity>
        );
      }}>
      <View style={styles.projectContainer}>
          <View style={Styles.titleContainer}>
            <Text style={Styles.projectTitle}>
              {capitalizeFirstLetter(name)}
            </Text>
          </View>
          <View style={Styles.reqContainer}>
            <Text style={Styles.fontBold}>Requisitos</Text>
            <Text style={Styles.projectReq}>{req}</Text>
          </View>
          <View style={Styles.descriptionContainer}>
            <Text style={Styles.projectDate}>Data limite: {date}</Text>
          </View>
      </View>
    </Swipeable>
  );
};

export default ProjectListItem;
