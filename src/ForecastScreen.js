import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Alert, Button,  Linking, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const ForecastScreen = () => {

  return (

    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.h2}>
        Your Location(User)
      </Text>

      <Text style={styles.h1}>
        4/10(example)
      </Text>

      <Text style={styles.h3}>
        current weather condition(User)
      </Text>


      <ScrollView style={styles.scrollViewContainer}>

      <Text style={styles.text16}>
        HOURLY UV INDEX
      </Text>

      <ScrollView horizontal={true} style={styles.scrollView}>

      <View style={styles.containerHourly}>
        <Text style={styles.text16}>Now</Text>
        {/* We also need to fetch for the current time in Hour */}
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18} >8</Text>
      </View>


      <View style={styles.containerHourly}>
        <Text style={styles.text16}>1PM</Text>
        {/*fetch Hourly Uv Index */}
        {/*fetch Hourly Uv Index, change icon image to moon after the sunset */}
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>

      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>


      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>


      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>


      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>



      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>


      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>



      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>



      <View style={styles.containerHourly}>
        <Text style={styles.text16}>2PM</Text>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>7</Text>
      </View>
      </ScrollView>


      <Text style={styles.text16}>
        10-DAY FORECAST
      </Text>
      <ScrollView style={styles.scrollView2}>

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Today</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Tomorrow</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Wed</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />


      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.containerForecast}>
        
        <Text style={styles.textForecast}>Thurs</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
      </View>
      

      </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEC',
    padding: 20,
  },

  
  containerHourly:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop:5,
    backgroundColor:'white',
    width: 80,
  },

  scrollView: {
    borderRadius:25,
    marginBottom:20,
    maxHeight:'50%',
  },

    scrollViewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius:25,
    marginLeft:20,
    marginRight:20,
    marginBottom:20,
    padding:10,
    marginTop:20,

  },

  scrollView2: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius:25,
    marginBottom:20,
  },
  
  containerForecast:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center", // Center-align items vertically
    // justifyContent: "flex-start", // Optional: Center the entire content within the parent
    justifyContent: "space-between", // Space between text and image
    padding: 5,
    borderRadius:25,
  },


  image: {
    margin:10,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  
  button: {
    backgroundColor: '#4E4B3E',
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom:20,
  },

  // Font Start

  // font: {
  //   fontFamily: 'Montserrat-Regular',
  // },

  text: {
    fontSize: 24,
    color: '#333',
    textAlign: 'left',
   marginTop: 20,
    marginBottom: 20,
    alignSelf: 'left',
    
  },

  h1: {
    fontSize: 38,
    color: '#333',
    margin: 20,
    marginBottom:0,
  },

  h2: {
    fontSize: 24,
    color: '#333',
    marginTop: 50,
    margin: 20,
    marginBottom:0,
  },
  h3: {
    fontSize: 20,
    color: '#333',
    margin: 20,
    marginBottom:0,
  },

  boldText: {
    fontWeight:'bold',
  },
  text20:{
    fontSize: 20,
    color: '#333',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'left',

  },
    buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#4E4B3E',

  },
  text18:{
    marginLeft: 20,
    marginRight:20,

    fontSize: 18,

  },

  text16 :{

    fontSize: 16,
    textAlign:'left',

  },

  textForecast:{
  },
  
  divider: {
    height: 1, // Thickness of the divider
    backgroundColor: "gray", // Color of the divider
    width: "100%", // Make sure it spans the full width
  },
});

export default ForecastScreen;