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
  ScrollView,
} from 'react-native';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setField, saveProject, setAllFields, resetForm} from '../actions';
import '../util/pt-br';

class NewProject extends Component {
  state = {
    date: moment().locale('pt-BR').format('dddd, D [de] MMMM [de] YYYY'),
    showDatePicker: false,
    isLoading: false,
    title: '',
  };

  handlePicker = (date) => {
    const {setField} = this.props;
    this.setState({
      showDatePicker: false,
      date: moment(date).locale('pt-BR').format('dddd, D [de] MMMM [de] YYYY'),
    });
    const value = moment(date)
      .locale('pt-BR')
      .format('dddd, D [de] MMMM [de] YYYY');
    setField('date', value);
  };

  hidePicker = () => {
    this.setState({showDatePicker: false});
  };

  componentDidMount() {
    const {navigation, setAllFields, resetForm} = this.props;
    const {params} = navigation.state;
    if (params.projectToEdit && params) {
      setAllFields(params.projectToEdit);
      this.setState({title: 'Editar'});
    } else {
      this.setState({title: 'Criar Novo'});
      resetForm();
    }
  }

  render() {
    const {projectForm, setField, saveProject, navigation} = this.props;

    return (
      <View style={Styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={Styles.titleContainer}>
            <Text style={Styles.projectTitle}>{this.state.title} Projeto</Text>
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
            <View>
              <TouchableOpacity
                onPress={() => this.setState({showDatePicker: true})}>
                <View style={[styles.row, styles.date]}>
                  <Icon name="table" size={20} />
                  <Text>{projectForm.date || this.state.date}</Text>
                </View>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.showDatePicker}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode={'date'}
              />
            </View>
            {this.state.isLoading ? (
              <ActivityIndicator color="#6f00ff" />
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
        </ScrollView>
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
  setAllFields,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
