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
import Styles from '../styles/Styles';
import firebase from '../../Firebase';

import FormRow from '../components/FormRow';
import {processLogin} from '../actions';
import {connect} from 'react-redux';

class LoginScreen extends React.Component {
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

    this.props
      .processLogin({email, password})
      .then((user) => {
        if (user) {
          this.props.navigation.navigate('Main');
        } else {
          this.setState({
            isLoading: false,
            message: '',
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          message: this.getMessageByError(error.code),
        });
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
      case 'auth/weak-password':
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
            <Text style={Styles.error}>{code}</Text>
          </View>
        );
    }
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator color="#CBCBCB" />;
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
            placeholder="user@mail.com"
            value={this.state.email}
            onChangeText={(valor) => {
              this.onChangeHandler('email', valor);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
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

export default connect(null, {processLogin})(LoginScreen);
