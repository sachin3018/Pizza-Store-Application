/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ImageBackground
} from 'react-native';
import * as firebase from 'firebase'
import {CardItem,Button} from 'native-base'
import { Value } from 'react-native-reanimated';
var data = [
    {
        "id" : 1,
        "url" : 'https://www.dominos.co.in/files/items/Farmhouse.jpg',
        "Name" : 'Farmhouse',
        "price" : 100,
        "quantity" : 0
    },
    {
        "id" : 2,
        "url" : 'https://chefchoice.com.np/wp-content/uploads/2020/07/Fresh_Veggie.jpg',
        "Name" : 'Fresh Veggie',
        "price" : 150,
        "quantity" : 0
    },
    {
        "id" : 3,
        "url" : 'https://www.berhampuriya.com/wp-content/uploads/2020/02/Veg_Extravaganz-1.jpg',
        "Name" : 'Veg Extravaganz',
        "price" : 250,
        "quantity" : 0
    },
    {
        "id" : 4,
        "url" : 'https://img2.exportersindia.com/product_images/bc-full/2018/10/2044906/veg-loaded-pizza-1540892242-4420413.jpeg',
        "Name" : 'veg loaded',
        "price" : 200,
        "quantity" : 0
    },
    {
        "id" : 5,
        "url" : 'https://deliciouspizzabites.com/wp-content/uploads/2020/05/quick-single-tomato.png',
        "Name" : 'single tomato',
        "price" : 150,
        "quantity" : 0
    },
    {
        "id" : 6,
        "url" : 'https://www.berhampuriya.com/wp-content/uploads/2020/02/Corn__Cheese.jpg',
        "Name" : 'Corn Cheese',
        "price" : 80,
        "quantity" : 0
    }
]


const App = ({route,navigation}) => {

  
  
  const [cart, setcart] = useState([])
  const [move, setmove] = useState(false)
  
  useEffect(() => {
      setmove(false)
   }, [])


  const addToCart = (id) => {
        let c = 0;
        setmove(true)
        cart.forEach((item) => {
            if(item.id === id){
                item.quantity += 1
                c = 1
            }
        })
        if(c === 0){
            data.forEach((item) => {
            if(item.id === id){
                var temp = [...cart];
                temp.push(item)
                item.quantity += 1
                setcart(temp);
            }
        })
    }
  }
  return (
    <View style={styles.buttonView}>
       
      <View style={{marginTop : "15%"}}>
      <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
                var path = item.url
                var name = item.Name
                var price = item.price
                return(
                    <View style={styles.cardView}>
                        <Image source={{uri: path}} style={styles.card}/>
                        <View style={{flexDirection : "row",justifyContent : "space-evenly",alignItems : "center"}}>
                            <Text style={{fontSize : 15}}>{`Name : ${name} `}</Text>
                            <Text style={{fontSize : 15}}>{`Price : ${price} `}</Text>
                        </View>
                        <Button 
                            block 
                            success 
                            style={styles.addtocart}
                            onPress={() => {addToCart(item.id)}}>
                                <Text style={{padding : 5}}>ADD TO CART</Text>
                        </Button>
                        
                    </View>
                )
            }}
        />
      </View>
      {
          move  &&
          <Button block danger style={{marginBottom : "12%"}} onPress={() => {
              navigation.navigate("Payment",{
                  mycart : cart
              })
          }}>
            <Text >Move To Cart({`${cart.length}`})</Text>
          </Button>
      }
      {
          !move  &&
          <Button block danger style={{marginBottom : "12%"}} onPress={() => {
                    firebase.auth()
                    .signOut()
                    .then(() => {
                    navigation.navigate("Home")
                })
                .catch(error => {
                    Alert.alert(error.message)
                })
          }}>
            <Text >Log-out</Text>
          </Button>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  
    buttonView : {
        flex : 1,
        justifyContent : "center",
        backgroundColor : "#000"
      },
    card : {
        height: 300, 
        width: 300, 
        flex: 1,
        alignSelf : "center",
        marginVertical : "4%"
    },
    addtocart : {
        marginHorizontal : "10%",
        marginTop : "2%",
        marginBottom : "4%"
    },
    cardView : {
        marginHorizontal : "10%",
        marginVertical : "3%",
        borderWidth : 1,
        borderColor : "#f50"
    }
});

export default App;
