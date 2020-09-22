import React from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import firebase from 'firebase';
import LongText from './LongText';

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
  const {task, onPressItem, onPressEdit} = props;
  const {name, date, description} = task;

  return (
    <View>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={() => {
          return (
            <TouchableOpacity
              style={Styles.left}
              onPress={() => {
                onPressEdit({task});
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
          </TouchableOpacity>
          <LongText label="Descrição" content={description} />
        </View>
      </Swipeable>
      <View style={Styles.descriptionContainer}>
        <Text style={Styles.projectDate}>Data limite: {date}</Text>
      </View>
    </View>
  );
};

export default ProjectListItem;
