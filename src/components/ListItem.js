import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Divider } from '@rneui/themed';

const ListItem = ({ pichanga }) => {
  const handleUpdate = () => {
    // Lógica para actualizar la pichanga
  };

  const handleDelete = () => {
    // Lógica para eliminar la pichanga
  };

  const gameDate = new Date(pichanga.game_date);
  const formattedDate = gameDate.toLocaleDateString();
  const formattedTime = gameDate.toLocaleTimeString();

  return (
    <View>
      <View>
        <Text style={styles.title}>{formattedDate} - {formattedTime}</Text>
        <Text style={styles.info}>Ubicación: {pichanga.location.place_name}</Text>
        <Text style={styles.info}>Reglas: {pichanga.instructions}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.update} onPress={handleUpdate}>
            <Text style={{justifyContent: 'center'}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={handleDelete}>
            <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <Divider style={{marginBottom: 10, marginTop: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    info: {
        fontSize: 18,
        marginBottom: 10
    },
    update: {
        backgroundColor: '#56887d',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
        flex: 1,
        alignItems: 'center'
    },
    delete: {
        backgroundColor: '#ff7373',
        padding: 10,
        borderRadius: 5,
        width: 100,
        marginBottom: 10,
        marginLeft: 10,
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row', // Esto coloca los elementos en una fila // Esto separa los elementos horizontalmente
        marginTop: 10, // Puedes ajustar el margen según tus necesidades
        alignItems: 'stretch'
    }
});

export default ListItem;
