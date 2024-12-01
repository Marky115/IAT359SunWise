import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Alert, Button,  Linking, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const supportedURL1 = 'https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses';
const supportedURL2 = 'https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses';



const ProfileScreen = () => {

  const [totalScore, setTotalScore] = useState(0);

useEffect(() => {

  
  
  const getQuizResults = async () => {
    try {
      const quizResults = await AsyncStorage.getItem('quizResults');
      if (quizResults) {
        const parsedResults = JSON.parse(quizResults);
        console.log('Parsed Results:', parsedResults); // Log the parsed results to check the structure
        let score = 0;
        const answerWeights = {
          // https://sundoctors.com.au/blog/how-does-the-sun-affect-different-skin-types/
          fair: 5, 
          medium: 2.5,
          dark: 1,
          // 2nd question doesn't matter as much coming the score
          yes: 5,
          no: 1.5, 
        };
        Object.values(parsedResults).forEach((response) => {
          if (answerWeights[response] !== undefined) {
            score += answerWeights[response]; // Add weight for the given response
          }
        });
        setTotalScore(score); // Store the calculated score
      } else {
        console.log('No quiz results found');
      }
    } catch (error) {
      console.error('Failed to load quiz results:', error);
    }
  };


  getQuizResults();
}, []);

const renderSuggestions = () => {
  if (totalScore > 7) {
    return <Text style={styles.text18}>You are at the highest risk for skin damage, including skin cancer, and must take extra precautions to protect and maintain your overall skin health.</Text>;
  } else if (totalScore >= 5 && totalScore < 7) {
    return <Text style={styles.text18}>You are at a high risk for skin damage, including skin cancer. Prioritize protective measures to maintain healthy skin.
</Text>;
  } else if (totalScore >= 2.6 && totalScore < 5) {
    return <Text style={styles.text18}>You are at a moderate risk for skin damage, including skin cancer. Take consistent steps to protect your skin and promote overall health.
</Text>;
  } else {
    return <Text style={styles.text18}>You are at a low risk for skin damage, but it’s still important to practice good skin care to maintain long-term health and reduce the risk of issues like skin cancer.
</Text>;
  }
};


  const handlePress1 = () => {
    // URL to open when button is pressed
    Linking.openURL(supportedURL1).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };







  return (

    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.textUser}>
        Hello <Text style={styles.boldText}>SunWiser</Text>
      </Text>

      <View style={styles.scoreContainer}>

        <Text style={styles.text18}>Your score: {totalScore}/10</Text>
      {renderSuggestions()}

      </View>

      {/* TouchableOpacity to open URL */}
      <TouchableOpacity style={styles.button} onPress={handlePress1}>
        <Text style={styles.buttonText}>Sun Safety Tips</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollViewContainer}>

      <Text style={styles.text20}>
        Chemicals to Avoid in SunScreens
      </Text>

      <ScrollView horizontal={true} style={styles.scrollView}>

      <View style={styles.containerChem}>
      
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18} >OxyBenzone</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>OxyBenzone</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>OxyBenzone</Text>
      </View>

      </ScrollView>

      <Text style={styles.text16}>
        If you do not have Zinc allergy, We would recommend you using physical sunscreen, or known as zinc based Sunscreen.
      </Text>

      <Text style={styles.text20}>
        Our Recommendations 
      </Text>
      <ScrollView horizontal={true} style={styles.scrollView}>

      <View style={styles.containerChem}>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>OxyBenzone</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/oxyb.png')} style={styles.image} />
        <Text style={styles.text18}>OxyBenzone</Text>
      </View>

      </ScrollView>

      <Text>LogOut</Text>

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
  scoreContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',              
    width:'100%',
    marginBottom: 50,
  },
  
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'red',  
    padding: 20,                 
  },
  
  containerChem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin:10,
    backgroundColor:'white',
    borderRadius:25,
    width: 200,
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

  textUser: {
    fontSize: 30,
    color: '#333',
    textAlign: 'left',
    marginTop: 50,
    margin: 20,
    marginBottom:0,
    alignSelf: 'left',
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
    marginTop:10,

    fontSize: 18,

  },

  text16 :{

    fontSize: 16,
    textAlign:'left',

  },
  scrollView: {
    backgroundColor: '#fff0d1',
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

  },
  image: {
    width: 120,
    height: 110,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;