/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {

 
   const orderNow = () => {
     navigation.navigate("SignIn")
   }

   const ragister = () => {
     navigation.navigate("SignUp")
   }
  
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.buttonView}>
        <TouchableOpacity  style={styles.button} onPress={orderNow}>
          <Text style={styles.label}>Order Now</Text>
        </TouchableOpacity>
        <View style={{justifyContent : "center",alignItems : "center"}}>
          <Image source={require("../assets/safe.jpg")} style={styles.safeImage}/>
          <Animatable.Text 
            animation="fadeOut" 
            delay={2000} 
            iterationCount="infinite" 
            direction="alternate"
            style={styles.safetyText}>
              Your Safety is Our Responsiblity
          </Animatable.Text>
        </View>
        <TouchableOpacity  style={styles.button} onPress={ragister}>
          <Text style={styles.label}>SignUp</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  buttonView : {
    flex : 1,
    justifyContent : "space-evenly",
    alignItems : "center",
    width : Dimensions.get("screen").width, 
    height : Dimensions.get("screen").height,
  },
  button : {
    height : 50,
    width : 100,
    backgroundColor : "#74B9FF",
    borderRadius : 5,
    borderWidth : 2
  },
  label : {
    textAlign : "center",
    padding : 5,
    marginVertical : "7%",
  },
  safeImage : {
    height : 200,
    width : 200,
    borderRadius : 100
  },
  safetyText : {
    fontSize : 15,
    color : 'blue'
  }
});

export default Home;
