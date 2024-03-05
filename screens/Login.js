import React,{ useState } from 'react'; 
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales'
import {getAuth,signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(appFirebase)

export default function Login(props) {

    //variable estado
    const [email, setEmail] = useState()
    const [password, setpassword] = useState()
    const logue = async()=>{
        try {
            await signInWithEmailAndPassword(auth,email,password)
            Alert.alert('Iniciando sesion','Accediendo.....')
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Error','compruebe su contraseña')
            
        }
    }
    return (
        <View style={styles.padre}> 
            <View>
                <Image source={require('../assets/voip.jpg')} style={styles.profile} />
            </View>
            <View style={styles.tarejeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='correo@gmail.com' style={{paddingHorizontal:15}}
                    onChangeText={(text)=>setEmail(text)}/>
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Contraseña' style={{paddingHorizontal:15}} onChangeText={(text)=>setpassword(text)} secureTextEntry={true}/>
                </View>

                <View style={styles.padreboton}>
                    <TouchableOpacity style={styles.cajaboton} onPress={logue}>
                        <Text style={styles.textoboton}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    profile:{
        width:290,
        height:180,
        borderRadius:60,
        borderColor:'white'

    },
    tarejeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5,
    },
    cajaTexto:{
        paddingVertical:20,
        backgroundColor:'#cccccc40',
        borderRadius:30,
        marginVertical:10
    },
    padreboton:{
        alignItems:'center'
    },
    cajaboton:{
        backgroundColor:'#525fe1',
        borderRadius:30,
        paddingVertical:20,
        width:150,
        margin:20
    },
    textoboton:{
        textAlign:'center',
        color:'white'
    }

});
