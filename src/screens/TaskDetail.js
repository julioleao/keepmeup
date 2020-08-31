import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';

export default class TaskDetail extends React.Component {
  render() {
    const {task} = this.props.navigation.state.params;
    const {name, req, date} = task;
    
    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>{capitalizeFirstLetter(name)}</Text>
          <Text style={Styles.projectDescription}>{req}</Text>
          <Text style={[Styles.projectDescription, Styles.projectDate]}>{date}</Text>
        </View>
      </View>
    );
  }
}

