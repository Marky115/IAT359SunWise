import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (

    <SafeAreaView style={styles.container}>

    <Image
        source={require('../assets/Group 14.png')} 
        style={styles.image}
      />

      <Text style={styles.titleText}>Welcome to SunWise</Text>

      {/* Skip Button to navigate to LoginSignUpScreen */}
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => navigation.navigate('LoginSignUp')}
      >

        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEC',
  },
  image:{
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E4B3E',
    width: '80%',
    height: 50,
    padding: 5,
    marginVertical: 10,
    borderRadius: 25,

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});