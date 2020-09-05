import React, {Component} from 'react';
import ProjectList from '../components/ProjectList';
import Firebase from '../../Firebase';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';

export default class ProjectPage extends Component {
  render() {
    const {task} = this.props.navigation.state.params;
    const textElements = task.tasks.map((projeto) => {
      return projeto;
    });
    console.log(textElements);

    return (
      <View style={styles.container}>
        <ProjectList
          task={textElements}
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
