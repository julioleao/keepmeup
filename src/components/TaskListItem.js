import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';

const TaskListItem = (props) => {
  const {task, onPressItem} = props;
  const {name, date, description} = task;

  //const {name, req} = tasks;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onPressItem({task});
        }}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>{capitalizeFirstLetter(name)}</Text>
        </View>
        <View style={Styles.reqContainer}>
          <Text style={Styles.fontBold}>Descrição</Text>
          <Text style={Styles.projectReq}>{description}</Text>
        </View>
        <View style={Styles.descriptionContainer}>
          <Text style={Styles.projectDate}>Data limite: {date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListItem;
