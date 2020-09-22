import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ProjectListItem from './ProjectListItem';
import firebase from 'firebase';
import {connect} from 'react-redux';

const ProjectList = (props) => {
  const {task, onPressItem, onPressEdit} = props;
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={task}
        renderItem={({item}) => (
          <ProjectListItem
            task={item}
            onPressItem={onPressItem}
            onPressEdit={onPressEdit}
          />
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

const mapStateToProps = (state) => {
  return {
    project: state.projectList,
  };
};

export default /* connect(mapStateToProps) */(ProjectList);
