/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Alert
} from 'react-native';
import * as firebase from "firebase";
import {Content,  Form, Item, Input, Label, Button } from 'native-base'

const App = ({navigation}) => {
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");    
    var database = firebase.database()
    const signup = () => {
        console.log(phone.length)
        if(email !== "" && phone.length  === 10 && password !== ""){
            //setloading(true)
            if(email.includes('@')){
                firebase.auth().createUserWithEmailAndPassword(email,password)
                           .then(authenticate => {
                               authenticate.user.updateProfile({
                                   displayName : email
                               })
                               .then(() => {
                                   //setloading(false)
                                   setemail("")
                                   setpassword("")
                                   setphone("")
                                   firebase.auth()
                                        .onAuthStateChanged(user => {
                                        if(user){
                                            database.ref(user.uid).child("UserInfo").set({
                                                username : user.displayName,
                                                phone : phone,
                                            })

                                        }else{
                                        console.log(user)
                                    }
                                })
                                   navigation.navigate("SignIn")
                               })
                               .catch(error =>{
                                  // setloading(false)
                                   Alert.alert(error.message)
                               })
                           })
                           .catch(error => {
                             //  setloading(false)
                               Alert.alert(error.message)
                           })
            }
            else{
                Alert.alert("not valid email")
            }
        }
        else if(phone.length < 10){
            Alert.alert("Phone number Should contain 10 digit")
        }
    }
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.buttonView}>
        
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                autoCapitalize = "none"
                onChangeText={e => setemail(e)}
                value={email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Phone-Number</Label>
              <Input 
                autoCapitalize = "none"
                maxLength={10}
                keyboardType = "phone-pad"
                onChangeText={p => setphone(p)}
                value={phone}
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
        <Button  block  style={styles.login} onPress={signup}>
            <Text>Ragister</Text>
        </Button>
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
