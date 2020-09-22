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
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase';

export default class NewTask extends React.Component {
  state = {
    date: new Date(),
    showDatePicker: false,
  };

  setDate = (_, date) => {
    if (date === undefined) {
      this.setState({date: new Date(), showDatePicker: false});
    } else {
      this.setState({date, showDatePicker: false});
    }
  };

  getDatetimePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={this.setDate}
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format(
      'ddd, D [de] MMMM [de] YYYY',
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <View style={[styles.row, styles.date]}>
              <Icon name="table" size={20} />
              <Text>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>Criar nova Tarefa</Text>
        </View>
        <View style={Styles.reqContainer}>
          <Text style={Styles.fontBold}>Título</Text>

          <TextInput
            style={styles.input}
            autoFocus={true}
            placeholder="Dê um nome"></TextInput>

          <Text style={Styles.fontBold}>Requisitos</Text>
          <TextInput
            multiline
            style={styles.input}
            placeholder="Quais os requisitos?"></TextInput>
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
    marginTop: 10,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
