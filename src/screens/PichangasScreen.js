import { useEffect, useState } from 'react';
import { SectionList, View, Text, StyleSheet, FlatList, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../components/ListItem';

const PichangasScreen = ({ navigation }) => {

    const sortList = (lista) => {
        const sorted = lista.sort((a, b) => {
            const dateA = new Date(a.game_date);
            const dateB = new Date(b.game_date);
            return dateB - dateA; // Ordena de forma descendente (de más reciente a menos reciente)
        });

        return sorted
    } 

    const [pichangasList, setPichangasList] = useState(null);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const checkUserToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setUserToken(token);
            } else {
                // No hay un token, el usuario no está autenticado
                setUserToken(null);
            }
        };

        checkUserToken();
    }, []); // Deja el arreglo de dependencias vacío para que se ejecute solo una vez

    useEffect(() => {
        if (userToken) {
            const getPichangas = async () => {
                try {
                    const response = await axios.get('https://pichang-app-e6269910e1a5.herokuapp.com/api/v1/pichangas', {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                    const sortedPichangas = sortList(response.data.pichangas);
                    setPichangasList(sortedPichangas);
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                }
            };

            getPichangas();
        }
    }, [userToken, setPichangasList, sortList]);

    return (
        <View style={styles.container}>
            <FlatList
                data={pichangasList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem pichanga={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonPichangas: {
        backgroundColor: '#813d53',
        padding: 10,
        borderRadius: 5,
    },
    textoPichangas: {
        color: 'white',
    },
    pichangaItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default PichangasScreen;
