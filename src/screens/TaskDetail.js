import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TaskDetail extends React.Component {
  render() {
    const {task} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTitle}>{task.name}</Text>
          <Text style={styles.projectDescription}>{task.description}</Text>
          <Text style={[styles.projectDescription, styles.projectDate]}>{task.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectDate: {
    paddingBottom: 20,
    paddingTop: 50,
    fontSize: 13,
    textAlign: 'right'
  },
  projectContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  projectDescription: {
    fontSize: 18,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
    paddingTop: 10
  },
});
