import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TaskListItem from './TaskListItem';
import firebase from 'firebase';


const TaskList = (props) => {
  const {tasks, onPressItem} = props;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={tasks}
        renderItem={({item}) => (
          <TaskListItem tasks={item} onPressItem={onPressItem} />
        )}
        keyExtractor={(item) => item.req}
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
