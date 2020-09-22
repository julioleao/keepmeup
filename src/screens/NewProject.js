import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setField, saveProject} from '../actions';

class NewProject extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
    isLoading: false,
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
    const {projectForm, setField, saveProject, navigation} = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.projectTitle}>Criar novo Projeto</Text>
        </View>

        <View style={Styles.reqContainer}>
          <Text style={Styles.fontBold}>Título</Text>
          <TextInput
            value={projectForm.name}
            onChangeText={(value) => setField('name', value)}
            style={styles.input}
            autoFocus={true}
            placeholder="Dê um nome"></TextInput>

          <Text style={Styles.fontBold}>Descrição</Text>
          <TextInput
            value={projectForm.description}
            onChangeText={(value) => setField('description', value)}
            multiline
            style={styles.input}
            placeholder="Ex. Qual o objetivo?"></TextInput>

          <Text style={Styles.fontBold}>Data da entrega</Text>
          {this.getDatetimePicker()}

          {this.state.isLoading ? (
            <ActivityIndicator color="#CBCBCB" />
          ) : (
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({isLoading: true});

                try {
                  await saveProject(projectForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro!', error.message);
                } finally {
                  this.setState({isLoading: false});
                }
              }}
            />
          )}
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
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => {
  return {
    projectForm: state.projectForm,
  };
};

const mapDispatchToProps = {
  setField,
  saveProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
