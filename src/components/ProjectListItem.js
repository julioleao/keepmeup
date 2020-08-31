import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';

const ProjectListItem = (props) => {
  const {task, onPressItem} = props;
  const {name, date, req} = task;

  //const {name, req} = tasks;
  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem({task});
      }}>
      <View style={Styles.titleContainer}>
        <Text style={Styles.projectTitle}>{capitalizeFirstLetter(name)}</Text>
      </View>
      <View style={Styles.reqContainer}>
        <Text style={Styles.fontBold}>Requisitos</Text>
        <Text style={Styles.projectReq}>{req}</Text>
      </View>
      <View style={Styles.descriptionContainer}>
        <Text style={Styles.projectDate}>Data limite: {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectListItem;
