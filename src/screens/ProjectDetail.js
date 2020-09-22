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


export default class ProjectDetail extends React.Component {
  state = {
    date: new Date(),
    showDatePicker: false,
  };

  setDate = (_, date) =>{
    if(date === undefined) {
     this.setState({date: new Date(), showDatePicker: false})
    } else {
      this.setState({date, showDatePicker: false})
    }

  }

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
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Icon name="table" size={20}  />
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    const {task} = this.props.navigation.state.params;

    const {name, description } = task;
    
    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>EDITAR</Text>
        </View>
        <View style={Styles.reqContainer}>
          <Text style={Styles.fontBold}>Título</Text>

          <TextInput style={styles.input} autoFocus={true}>
            {capitalizeFirstLetter(name)}
          </TextInput>

          <Text style={Styles.fontBold}>Descrição</Text>
          <TextInput multiline style={styles.input}>
            {description}
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
