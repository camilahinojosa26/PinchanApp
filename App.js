import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import PichangasScreen from './src/screens/PichangasScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const LogOutButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Text style={{ color: 'blue' }}>{title}</Text>
    </TouchableOpacity>
  );
};


export default function App() {
  const Stack = createNativeStackNavigator();
  const [userToken, setUserToken] = useState(null);

  const handleLogin = () => {
    setUserToken(true);
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null)
      console.log('Elemento eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  }

  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };

    checkUserToken();
  }, []);


  console.log(userToken);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <LogOutButton
                  title="Log Out"
                  onPress={handleLogOut}
                />
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        )}
        <Stack.Screen
          name="Pichangas"
          component={PichangasScreen}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
