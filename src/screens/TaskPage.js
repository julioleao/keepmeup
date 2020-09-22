import React, {Component} from 'react';
import TaskList from '../components/TaskList';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';
import firebase from 'firebase';


export default class TaskPage extends Component {
  
  render() {
    const {task} = this.props.navigation.state.params;
    const textElements = task.tasks.map((projeto) => {
      return projeto;
    });

    return (
      <View style={[styles.container, {paddingHorizontal:0}]}>
        <TaskList
          tasks={textElements}
          onPressItem={(parameters) =>
            this.props.navigation.navigate('TaskDetail', parameters)
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('NewTask')}>
          <Icon name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}
