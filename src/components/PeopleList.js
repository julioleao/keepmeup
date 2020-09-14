import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PeopleListItem from './PeopleListItem';
import firebase from 'firebase';


const PeopleList = (props) => {
  const {task, onPressItem} = props;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={task}
        renderItem={({item}) => (
          <PeopleListItem task={item} onPressItem={onPressItem} />
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

export default PeopleList;
