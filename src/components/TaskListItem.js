import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TaskListItem = (props) => {
  const {task, onPressItem} = props;

  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem({task});
      }}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>{task.name}</Text>
        <Text style={styles.projectDescription}>{task.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  projectContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },

  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  projectDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
});

export default TaskListItem;
