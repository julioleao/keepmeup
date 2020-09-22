import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PeopleListItem from './PeopleListItem';
import firebase from 'firebase';


const PeopleList = (props) => {
  const {team, onPressItem} = props;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={team}
        renderItem={({item}) => (
          <PeopleListItem team={item} onPressItem={onPressItem} />
        )}
        keyExtractor={(item) => item.index.toString()}
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
