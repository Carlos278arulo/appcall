import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, Alert, PermissionsAndroid } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function Home({ navigation }) {
  const auth = getAuth();

  // Estados para la configuración de VOIP
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  // Nuevo estado para controlar el estado de la llamada
  const [isCalling, setIsCalling] = useState(false);

  const handleSaveVoIPSettings = () => {
    // Lógica para guardar la configuración de VOIP
    Alert.alert('Configuración VOIP', `Guardada correctamente:\nUsuario: ${username}\nServidor: ${server}`);
  };

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Permiso para acceder al micrófono",
          message: "La aplicación necesita acceso a tu micrófono para realizar llamadas",
          buttonNeutral: "Pregúntame Luego",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Ahora tienes acceso al micrófono");
      } else {
        console.log("Permiso de micrófono denegado");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCall = () => {
    // inicio de una llamada
    setIsCalling(true);
    requestMicrophonePermission().then(() => {
      // llamada está en curso
      setTimeout(() => {
        setIsCalling(false);
        Alert.alert("En Línea", "Ahora estás en una llamada");
      }, 2000); // 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración VOIP</Text>
      <TextInput
        placeholder="Nombre de usuario @PBX/proveedor"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre del servidor o proveedor"
        value={server}
        onChangeText={setServer}
        style={styles.input}
      />
      <Button title="Guardar Configuración VOIP" onPress={handleSaveVoIPSettings} />

      {/* Botón para simular la llamada */}
      <Button title={isCalling ? "Llamando..." : "Iniciar Llamada"} onPress={handleCall} disabled={isCalling} />

      {/* Parte de Cerrar Sesión */}
      <TouchableOpacity onPress={() => signOut(auth).then(() => navigation.replace('Login')).catch((error) => console.log(error))} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '90%',
    paddingHorizontal: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#525FE1',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
