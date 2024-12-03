import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
<LinearGradient
      style={styles.gradientBackground}
      colors={['#fffaf5','#fff3d1' ]} 
    > 

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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFAEC',
  },
  image:{
    marginTop:100,
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 300,
    color: '#4E4B3E',
  },
  skipButton: {
    position:"fixed",
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

  gradientBackground: {
    flex: 1,
  },
});