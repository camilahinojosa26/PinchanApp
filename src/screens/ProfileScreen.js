import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [name, setName] = useState(''); // Inicializa el estado con valores predeterminados
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkUserInfo = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await axios.get('https://pichang-app-e6269910e1a5.herokuapp.com/api/v1/current', {
          headers: {
            Authorization: `Bearer ${token}`, // Usar 'token' en lugar de 'userToken'
          },
        });

        const userName = response.data.user.name;
        const userCategory = response.data.user.category;
        const userEmail = response.data.user.email;

        // Actualiza el estado con los valores obtenidos
        setName(userName);
        setCategory(userCategory);
        setEmail(userEmail);
      }
    };

    checkUserInfo();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Name:</Text><Text style={styles.textStyle}>{name}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Category:</Text><Text style={styles.textStyle}>{category}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Email:</Text><Text style={styles.textStyle}>{email}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fcead7',
    padding: 10,
    borderRadius: 5
  },
  textStyle: {
    fontSize: 30
  }
});

export default ProfileScreen;
