import React, {Component} from 'react';
import styles from '../styles/Styles';
import '../util/pt-br';
import moment from 'moment';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Date extends Component {
  state = {
    date: moment().locale('pt-BR').format('dddd, D [de] MMMM [de] YYYY'),
    showDatePicker: false,
  };

  handlePicker = (date) => {
    this.setState({
      showDatePicker: false,
      date: moment(date).locale('pt-BR').format('dddd, D [de] MMMM [de] YYYY'),
    });
  };

  hidePicker = () => {
    this.setState({showDatePicker: false});
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
          <View style={[styles.row, styles.date]}>
            <Icon name="table" size={20} />
            <Text>{this.state.date}</Text>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.showDatePicker}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'date'}
        />
      </View>
    );
  }
}
