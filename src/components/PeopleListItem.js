import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TaskList from './TaskList';
import firebase from 'firebase';

const getRightContent = (props) => {
  return (
    <TouchableOpacity
      style={Styles.right}
      onPress={() => {
        Alert.alert(
          'Excluir tarefa',
          'Deseja excluir essa tarefa?',
          [
            {
              text: 'Não',
              onPress: () => {
                console.log('Usuario não quis excluir');
              },
            },
            {
              text: 'Sim',
              onPress: () => {
                console.log('Usuario quis excluir');
              },
            },
          ],
          {cancelable: true},
        );
      }}>
      <Icon name="trash" size={30} color="#FFF" />
    </TouchableOpacity>
  );
};

const PeopleListItem = (props) => {
  const {team, onPressItem} = props;
  const {name, email} = team;
  const {thumbnail} = name.picture;

  //const {name, req} = tasks;
  return (
    <View style={Styles.projectContainer}>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={() => {
          return (
            <TouchableOpacity
              style={Styles.left}
              onPress={() => {
                /*  <TaskList
                  task={task}
                  onPressItem={(parameters) =>
                    props.navigation.navigate('ProjectDetail', parameters)
                  }
                />; */
              }}>
              <Icon name="edit" size={30} color="#FFF" />
            </TouchableOpacity>
          );
        }}>
        <View>
          <TouchableOpacity>
            <View></View>
            <View style={Styles.titleContainer}>
              <Text style={Styles.projectTitle}>
                {capitalizeFirstLetter(name.first)} {capitalizeFirstLetter(name.last)}
              </Text>
            </View>
            <View style={[Styles.reqContainer, {flexDirection: 'row'}]}>
            <View style={{flexDirection: 'column', flex: 1}}>
                <Image source={{uri: thumbnail}} style={Styles.avatar} />
              </View>
              <View style={{flexDirection: 'column', flex: 4}}>
                <Text style={Styles.fontBold}>Email</Text>
                <Text style={Styles.projectReq}>{email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
};

export default PeopleListItem;
