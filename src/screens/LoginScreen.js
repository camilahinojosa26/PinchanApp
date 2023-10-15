import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

function LoginScreen(props) {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
    
    const handleLogin = ({email, password}) => {
        const loginData = {
            email: email,
            password: password,
          };


          axios
          .post('https://pichang-app-e6269910e1a5.herokuapp.com/api/v1/login', loginData)
          .then((response) => {
            AsyncStorage.setItem('userToken', response.data.token)
            props.onLogin();
          })
          .catch((error) => {
            console.error('Error al iniciar sesión:', error);
          });
    }


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder="email"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={onChangePassword}
                    placeholder="password"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleLogin({email, password})}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    title: {
        fontWeight: 'bold',
        fontFamily: 'Georgia', 
        fontSize: 30
    },
    button: {
        backgroundColor: '#c9a0dc',
        padding: 10,
        borderRadius: 5, // Borde redondeado
    },
    buttonText: {
        color: 'white',
    }
});

export default LoginScreen;
