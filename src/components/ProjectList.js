import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectListItem from './ProjectListItem';

const ProjectList = (props) => {
  const {task, onPressItem} = props;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={task}
        renderItem={({item}) => (
          <ProjectListItem task={item} onPressItem={onPressItem} />
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
