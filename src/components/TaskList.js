import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TaskListItem from './TaskListItem';
import firebase from 'firebase';


const TaskList = (props) => {
  const {task, onPressItem, onPressEdit} = props;
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={task}
        renderItem={({item}) => (
          <TaskListItem task={item} onPressItem={onPressItem} onPressEdit={onPressEdit}/>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  list: {
    padding: 20,
  },
});

export default TaskList;
