/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import * as firebase from 'firebase'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import {CardItem,Button, Form,Item,Label,Input} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const App = ({ route,navigation}) => {
  const [cart, setcart] = useState([])
  var database = firebase.database()
  const { mycart } = route.params;
  const [quant, setquant] = useState([])
  const [total, settotal] = useState(0)
  const [address, setaddress] = useState("")
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [uid, setuid] = useState("")
  const [orderPlaced, setorderPlaced] = useState(false)
  const set = () => {
    temp = []
    let t = 0;
    mycart.forEach((item,index) => {
        temp.push(item.quantity)
        t += item.price*item.quantity;
    })
    settotal(t*0.185+t);
    setquant(temp);
    setcart(mycart)
    //calculateTotal();
  }
  const get = () => {
    firebase.auth()
    .onAuthStateChanged(user => {
        if(user){
            setname(user.displayName)
            setuid(user.uid)
            var ref = firebase.database().ref(user.uid).child("UserInfo")
            ref.on("value",datasnapshot => {
                if(datasnapshot.val()){
                    console.log("data : ",(datasnapshot.val().subscription))
                    setphone(datasnapshot.val().phone)
                }
            })   
        }
    })
  }
  useEffect(() => {
     set();
     get();
  }, [])

  const decrement = (id) => {
      cart.forEach((item) => {
          if(item.id === id){
              if(item.quantity !== 0)
              item.quantity -= 1
          }
      })
      
  }

  const increment = (id) => {
      cart.forEach((item) => {
          if(item.id === id){
              item.quantity += 1
          }
      })
      
  }

  const payment = () => {
    var options = {
        description: 'Pizza Order from Pizza delicious',
        image: 'https://image.freepik.com/free-vector/pizza-logo-vector_25327-119.jpg',
        currency: 'INR',
        key: 'rzp_test_uVVlwzwq7t5sD9',
        amount: total*100,
        name: 'Pizza delicious since 1957',
        prefill: {
          email: name,
          contact: phone,
          name: name
        },
        theme: {color: '#53a20e'}
      }
      RazorpayCheckout.open(options).then((data) => {
        settotal(0)
        setcart([])
        setorderPlaced(true)
        var curr = new Date();
        var ref = database.ref(uid).child("OrderInfo");
        ref.set({
            transaction_id : data.razorpay_payment_id,
            status : "Ordered",
            Time : (curr.getDate()+"-"+curr.getMonth()+"-"+curr.getFullYear()).toString()
        })
        console.log("success");
        setTimeout(() => {
                navigation.navigate("Menu")
        },3000)
      }).catch((error) => {
        // handle failure
        alert("Something went wrong Try Again!");
      });
  }
 
  return (
    <KeyboardAvoidingView style={styles.buttonView}>
        {
            orderPlaced && 
            <Animatable.Text 
                animation="fadeOutDown" 
                delay={2000} 
                iterationCount={5} 
                direction="alternate"
                style={styles.safetyText}>
                Order Placed
          </Animatable.Text>
        }
      <View style={{flex : 3}}>
        <FlatList 
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
                var path = item.url
                var name = item.Name
                var price = item.price
                return(
                    item.quantity !== 0 &&
                    <View style={styles.cardView}>
                        <View style={{flex : 1,marginVertical : "2%"}}>
                            <Image source={{uri: path}} style={styles.card}/>
                            <Text style={{textAlign : "center"}}>{name}</Text>
                        </View>
                        <View style={{flex : 1,flexDirection : "row",justifyContent : "space-evenly",alignItems : "center"}}>
                           <TouchableOpacity 
                            style={{backgroundColor : "#c1c1c1",width : 30,height : 30,alignItems : "center",justifyContent : "center",borderRadius : 15}}
                            onPress={() => {
                                decrement(item.id)
                            }}>
                               <Text style={{fontSize : 25}}>-</Text>
                           </TouchableOpacity>
                                <Text>{item.quantity}</Text>
                            <TouchableOpacity 
                                style={{backgroundColor : "#c1c1c1",width : 30,height : 30,alignItems : "center",justifyContent : "center",borderRadius : 15}}
                                onPress={() => {
                                    increment(item.id)
                                }}>
                               <Text style={{fontSize : 25}}>+</Text>
                           </TouchableOpacity>
                        </View>
                        <View style={{flex : 1,flexDirection : "row",justifyContent : "center",alignItems : "center"}}>
                           
                                <Text>{item.quantity*price}</Text>
                            
                        </View>
                    </View>
                )
            }}
        />
      </View>
        <Text style={{textAlign : 'center',fontSize : 30}}>
            Total Bill : {total}
        </Text> 
        <Button block primary style={{marginBottom : "5%"}} onPress={payment}>
            <Text style={{fontSize : 20}}>Proceed To Pay</Text>
          </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
    buttonView : {
        flex : 1,
        backgroundColor : "#000"
      },
    card : {
        height: 100, 
        width: 100, 
        flex: 1,
        alignSelf : "center",
        marginVertical : "4%",
    },
    addtocart : {
        marginHorizontal : "10%",
        marginTop : "2%",
        marginBottom : "4%"
    },
    cardView : {
        marginHorizontal : "3%",
        marginVertical : "2%",
        borderWidth : 1,
        borderColor : "#f50",
        flexDirection : "row"
    },
    safetyText : {
        fontSize : 25,
        color : 'green',
        textAlign : "center",
        justifyContent : "center"
    }
});

export default App;
