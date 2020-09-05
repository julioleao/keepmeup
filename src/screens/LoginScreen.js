import React from 'react';
import {View, TextInput, StyleSheet, Button, ActivityIndicator, Text, Alert} from 'react-native';
import firebase from 'firebase';
import Styles from '../styles/Styles';

import FormRow from '../components/FormRow'

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            email: "julio@mail.com",
            password: "123456",
            isLoading: false,
            message: "",
        }
    }
    
    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    processLogin() {
        this.setState({ isLoading: true });

        const {email, password} = this.state;

        const loginUserSuccess = user => {
            this.setState({ message: "Sucesso!"});
            this.props.navigation.navigate('Main');
        }

        const loginUserFailed = (error)  => {
            this.setState({ 
                message: this.getMessageByError(error.code)
            });
        }

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(loginUserSuccess)
        .catch(error => {
            if(error.code == "auth/user-not-found") {
                Alert.alert(
                    "Usuário não encontrado",
                    "Deseja criar um novo usuário?",
                    [{
                        text: 'Não',
                        onPress: () => {
                            console.log('Usuario não quis criar nova conta.');
                        }
                    }, {
                        text: 'Sim',
                        onPress: () => {
                            firebase
                                .auth()
                                .createUserWithEmailAndPassword(email, password)
                                .then(loginUserSuccess)
                                .catch(loginUserFailed(error))
                        }
                    }],
                    { cancelable: true }
                );
            }
            loginUserFailed(error)
        })
        .then( () => {
            this.setState({ isLoading: false });
        })
    }

    getMessageByError(code) {
        switch (code) {
            case "auth/user-not-found":
                return "E-mail inexistente.";
            case "auth/wrong-password":
                return "Senha incorreta.";
            case "auth/invalid-email":
                return "E-mail inexistente.";
            default:
                return "Erro desconhecido";
        }
    }

    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />
        return (
            <Button 
                title='Entrar'
                onPress={() => 
                    this.processLogin()
                }
            />
        );   
    }

    renderMessage() {
        const { message } = this.state;

        if(!message)
            return null;

        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    render() {
        return(
            <View style={Styles.container}>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="E-mail: user@mail.com"
                        value={this.state.email}
                        onChangeText={valor => {
                            this.onChangeHandler('email', valor)
                        }}
                    />
                    
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={valor => {
                            this.onChangeHandler('password', valor)
                        }}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingLeft: 10,
        paddingRight: 10
    },
})