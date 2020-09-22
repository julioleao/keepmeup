import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const TaskListItem = (props) => {
  const {tasks, onPressItem} = props;
  const {task, date, req, name} = tasks;
  const {thumbnail} = name.picture;
  return (
    <View>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={() => {
          return (
            <TouchableOpacity
              style={Styles.left}
              onPress={() => {
                onPressItem({tasks});
              }}>
              <Icon name="edit" size={30} color="#FFF" />
            </TouchableOpacity>
          );
        }}>
        <View>
          <View style={Styles.titleContainer}>
            <Text style={Styles.projectTitle}>
              {capitalizeFirstLetter(task)}
            </Text>
          </View>
          <View style={[Styles.reqContainer, {flexDirection: 'row'}]}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Image source={{uri: thumbnail}} style={Styles.avatar} />
            </View>
            <View style={{flexDirection: 'column', flex: 3}}>
              <Text style={Styles.fontBold}>Requisitos</Text>
              <Text style={Styles.projectReq}>{req}</Text>
              <Text style={Styles.fontBold}>Responsável</Text>
              <Text style={Styles.projectReq}>
                {name.first} {name.last}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
      <View style={Styles.descriptionContainer}>
        <Text style={Styles.projectDate}>Data limite: {date}</Text>
      </View>
    </View>
  );
};

export default TaskListItem;
