import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectListItem from './ProjectListItem';
import firebase from 'firebase';


const ProjectList = (props) => {
  const {tasks, onPressItem} = props;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={tasks}
        renderItem={({item}) => (
          <ProjectListItem tasks={item} onPressItem={onPressItem} />
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

export default ProjectList;
