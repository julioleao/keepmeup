import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase';


export default class PersonDetail extends React.Component {

  render() {
    const {tasks} = this.props.navigation.state.params;
    const {task, req} = tasks;

    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>EDITAR</Text>
        </View>
        <View style={Styles.reqContainer}>
          <Text style={Styles.fontBold}>Nome</Text>

          <TextInput style={styles.input} autoFocus={true}>
            {capitalizeFirstLetter(task)}
          </TextInput>

          <Text style={Styles.fontBold}>Requisitos</Text>
          <TextInput multiline style={styles.input}>
            {req}
          </TextInput>
          <Text style={Styles.fontBold}>Data</Text>
          {this.getDatetimePicker()}
          {/* <TextInput style={styles.input}>{date}</TextInput> */}
          <Button title="Salvar" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#DDD',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    padding: 10,
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
