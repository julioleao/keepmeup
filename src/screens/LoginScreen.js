import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import firebase from '../../Firebase';
import Styles from '../styles/Styles';

import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'julio@mail.com',
      password: '123456',
      isLoading: false,
      message: '',
    };
  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor,
    });
  }

  processLogin() {
    this.setState({isLoading: true});

    const {email, password} = this.state;

    const loginUserSuccess = (user) => {
      this.setState({message: 'Sucesso!'});
      this.props.navigation.navigate('Main');
    };

    const loginUserFailed = (error) => {
      this.setState({
        message: this.getMessageByError(error.code),
      });
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loginUserSuccess)
      .catch((error) => {
        if (error.code == 'auth/user-not-found') {
          Alert.alert(
            'Usuário não encontrado',
            'Deseja criar um novo usuário?',
            [
              {
                text: 'Não',
                onPress: () => {
                  console.log('Usuario não quis criar nova conta.');
                },
              },
              {
                text: 'Sim',
                onPress: () => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(loginUserSuccess)
                    .catch(loginUserFailed);
                },
              },
            ],
            {cancelable: true},
          );
        }
        loginUserFailed(error);
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  }

  getMessageByError(code) {
    switch (code) {
      case 'auth/user-not-found':
        return (
          <View>
            <Text style={Styles.error}>E-mail inexistente</Text>
          </View>
        );
      case 'auth/wrong-password':
        return (
          <View>
            <Text style={Styles.error}>Senha incorreta.</Text>
          </View>
        );
      case 'auth/invalid-email':
        return (
          <View>
            <Text style={Styles.error}>E-mail inválido</Text>
          </View>
        );
      case 'auth/invalid-password':
        return (
          <View>
            <Text style={Styles.error}>
              A senha precisa ter 6 ou mais caracteres
            </Text>
          </View>
        );
      default:
        return (
          <View>
            <Text style={Styles.error}>Erro desconhecido</Text>
          </View>
        );
    }
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator />;
    return (
      <View style={{marginTop: 20}}>
        <Button
          color="#6f00ff"
          title="Entrar"
          onPress={() => this.processLogin()}
        />
      </View>
    );
  }

  renderMessage() {
    const {message} = this.state;

    if (!message) return null;

    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={Styles.containerLogin}>
        <FormRow>
          <Text style={Styles.fontBold}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail: user@mail.com"
            value={this.state.email}
            onChangeText={(valor) => {
              this.onChangeHandler('email', valor);
            }}
          />
        </FormRow>
        <FormRow>
          <Text style={Styles.fontBold}>Senha</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(valor) => {
              this.onChangeHandler('password', valor);
            }}
          />
        </FormRow>

        {this.renderButton()}
        {this.renderMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#DDD',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6f00ff',
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C5',
  },
});
