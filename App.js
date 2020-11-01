/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from  '@react-navigation/stack'
import {
  Button,
  Alert
} from 'react-native';
import * as firebase from "firebase"
import Home from "./Screens/Home"
import SignIn from "./Screens/SignIn"
import Signup from "./Screens/Signup"
import Menu from "./Screens/Menu"
import Payment from "./Screens/Payment"
import { Icon } from 'native-base';
const stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCy8iQ60RpKn_-lGpV5aO5fAqQfFPRI9I4",
  authDomain: "pizzaapp-d1fce.firebaseapp.com",
  databaseURL: "https://pizzaapp-d1fce.firebaseio.com",
  projectId: "pizzaapp-d1fce",
  storageBucket: "pizzaapp-d1fce.appspot.com",
  messagingSenderId: "275677652454",
  appId: "1:275677652454:web:246d4ed151d0b4c1916227",
  measurementId: "G-467FW9DX7R"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const App = ({navigation}) => {
  return(
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
          name="Home"
          component = {Home}
          options={{
            headerShown : false
          }}
        />
        <stack.Screen 
          name="SignIn"
          component = {SignIn}
          options={{
            headerTitleAlign : "center"
          }}
        />
        <stack.Screen 
          name="SignUp"
          component = {Signup}
          options={{
            headerTitleAlign : "center"
          }}
        />
        <stack.Screen 
          name="Menu"
          component = {Menu}
          options={({navigation}) => ({
            headerTitleAlign : "center",
          })}
        />
        <stack.Screen 
          name="Payment"
          component = {Payment}
          options={{
            headerTitleAlign : "center"
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

