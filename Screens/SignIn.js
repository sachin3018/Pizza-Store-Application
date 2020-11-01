/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {
  StyleSheet,
  Text,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {Content,  Form, Item, Input, Label, Button } from 'native-base'
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
const App = ({navigation}) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");    
    var database = firebase.database()

    const check = () => {
        firebase.auth()
        .onAuthStateChanged(user => {
        if(user){
            navigation.navigate("Menu")
        }else{
            ToastAndroid.showWithGravity(
                "Need to Login First",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
    }})
    }

    useEffect(() => {
        check();
    }, [])
    const signIn = () => {
        //setloading(true)
        firebase.auth().signInWithEmailAndPassword(email,password)
                .then(data => {
                   // setloading(false)
                    setemail("")
                    setpassword("")
                    ToastAndroid.showWithGravity(
                        "Welcome to your store",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                      );
                    navigation.navigate("Menu")
                    
                })
                .catch(error => {
                    ToastAndroid.showWithGravity(
                        "Something went wrong",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                      );
                   console.log(error)
                })
    }


  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.buttonView}>
        
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input 
                autoCapitalize = "none"
                onChangeText={e => setemail(e)}
                value={email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
                secureTextEntry={true}
                autoCapitalize = "none"
                onChangeText={p => setpassword(p)}
                value={password}
                />
            </Item>
          </Form>
        <Button  block  style={styles.login} onPress={signIn}>
            <Text>Login</Text>
        </Button>
        <TouchableOpacity style={styles.new} onPress={() => {
            navigation.navigate("SignUp")
        }}>
            <Text>New Here? Sign-Up</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
    buttonView : {
        flex : 1,
        justifyContent : "center",
      },
    form : {
        marginBottom : "5%",
        marginLeft : "1%",
        marginRight : "5%",
        marginTop : "-10%"
    },
    login : {
        marginHorizontal : "5%",
        marginLeft : "5%"
    },
    new : {
        alignSelf : "center",
        marginTop : "15%"
    }
});

export default App;
