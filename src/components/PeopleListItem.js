import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TaskList from './TaskList';
import firebase from 'firebase';


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

const PeopleListItem = (props) => {
  const {task, onPressItem} = props;
  const {name, date, description} = task;

  //const {name, req} = tasks;
  return (
    <View>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={() => {
          return (
            <TouchableOpacity
              style={Styles.left}
              onPress={() => {
                <TaskList
                task={task}
                onPressItem={(parameters) =>
                  props.navigation.navigate('ProjectDetail', parameters)
                }
              />
              }}>
              <Icon name="edit" size={30} color="#FFF" />
            </TouchableOpacity>
          );
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              onPressItem({task});
              }}>
            <View style={Styles.titleContainer}>
              <Text style={Styles.projectTitle}>
                {capitalizeFirstLetter(name)}
              </Text>
            </View>
            <View style={Styles.reqContainer}>
              <Text style={Styles.fontBold}>Descrição</Text>
              <Text style={Styles.projectReq}>{description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
      <View style={Styles.descriptionContainer}>
        <Text style={Styles.projectDate}>Data limite: {date}</Text>
      </View>
    </View>
  );
};

export default PeopleListItem;
