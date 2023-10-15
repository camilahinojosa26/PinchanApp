
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.botonPerfil}  onPress={() => navigation.navigate("Profile")}> 
                <Text style={styles.textoPerfil}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonPichangas}  onPress={() => navigation.navigate("Pichangas")}> 
                <Text style={styles.textoPichangas}>Lista de Pichangas</Text>
            </TouchableOpacity>
        </View>
    )
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
        borderRadius: 5
    },
    textoPichangas: {
        color: 'white'
    },
    botonPerfil: {
        backgroundColor: '#b3dca0',
        padding: 10,
        borderRadius: 5,
        top: 0,
        right: 0,
        marginBottom: 10
    },
});

export default HomeScreen;