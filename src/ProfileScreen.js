import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Alert, Button,  Linking, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { LinearGradient } from 'expo-linear-gradient';

const supportedURL = 'https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses';
const ChemURL = 'https://www.goodhousekeeping.com/beauty/anti-aging/g26541068/best-zinc-oxide-sunscreen/';
const ZincSunscreenURL = 'https://www.health.com/beauty/best-zinc-oxide-sunscreen';
const SunscreenURL1 = 'https://www.amazon.ca/Thinkbaby-Clear-Zinc-Sunscreen-SPF/dp/B09SQDNB64';
const SunscreenURL2 = 'https://www.amazon.ca/Sun-Bum-Sunscreen-Protection-Sensitive/dp/B0869CLL1G/ref=sr_1_10?ascsubtag=%5Bartid%7C10055.g.26541068%5Bsrc%7Cwww.google.com%5Bch%7C%5Blt%7C%28not+set%29+%7C+%28not+set%29%5Bpid%7Cc8729a87-3851-4d8a-ad98-45cdb5c43fba%5Baxid%7C3e8bc4b6-8710-4ec0-9442-0d69d07788b1&dib=eyJ2IjoiMSJ9.X1BPnzDUoxktbYxQxSzSZ00JCx4y7Y-2PZCwW-eVGPUbV4P9HOuFS7NxwYhrrWJcDZlcyXlpJnmrigtJllsIRA4a0WueHgaDObpWw2HfK9mAVeYyhsRyYbF0mu9MGN6FGlj6QydSajvP7cES-DR2YqkDTualpGt4WAAHznaujR8tVSLw4b-r1qAEFTZFOk_wZwBbbXQ3uvxAvFaIDSgMmTzzXZgtvyhTlGscp3oLajaRvb1OmYKZxgtrfW9t1Fy8QQpVi1NOsM5WdXI_Y-j8rh3_dpPsfnETqpOmXZbz-GA.4ZQ17zbyM0VfUuxvMe6W-23Guz8fpeiD4lKwLHDNG4Q&dib_tag=se&keywords=Sun+Bum+Mineral+SPF+30+Sunscreen+Body+Lotion%7C+Broad+Spectrum+Moisturizing+Facial+Sunblock+with+Vitamin+E+%7C+Vegan+and+Hawaii+104+Act+Compliant+%28Octinoxate&linkCode=gg3&qid=1733096202&sr=8-10';
const SunscreenURL3 = 'https://www.sephora.com/ca/en/product/blume-sunburst-mineral-spf-50-with-niacinimide-P510880?skuId=2780377&icid2=products%20grid:p510880:product';



const ProfileScreen = () => {

  const [totalScore, setTotalScore] = useState(0);

  const getScoreColor = () => {
    if (totalScore > 7) {
      return 'rgba(255, 62, 28, 0.1)'; 
    } else if (totalScore >= 5 && totalScore <= 7) {
      return 'rgba(255, 183, 28, 0.1)'; 
    } else if (totalScore >= 2.6 && totalScore < 5) {
      return 'rgba(255, 213, 28, 0.1)';
    } else {
      return 'rgba(31, 143, 16, 0.1)';
    }
  };
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
    return <Text style={styles.text18Risk}>You are at the highest risk for skin damage, including skin cancer, and must take extra precautions to protect and maintain your overall skin health.</Text>;
  } else if (totalScore >= 5 && totalScore < 7) {
    return <Text style={styles.text18Risk}>You are at a high risk for skin damage, including skin cancer. Prioritize protective measures to maintain healthy skin.
</Text>;
  } else if (totalScore >= 2.6 && totalScore < 5) {
    return <Text style={styles.text18Risk}>You are at a moderate risk for skin damage, including skin cancer. Take consistent steps to protect your skin and promote overall health.
</Text>;
  } else {
    return <Text style={styles.text18Risk}>You are at a low risk for skin damage, but it’s still important to practice good skin care to maintain long-term health and reduce the risk of issues like skin cancer.
</Text>;
  }
};


  const handlePress1 = () => {
    // URL to open when button is pressed
    Linking.openURL(supportedURL).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };

  const handlePress2 = () => {
    // URL to open when button is pressed
    Linking.openURL(ChemURL).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };

  const handlePress3 = () => {
    // URL to open when button is pressed
    Linking.openURL(ZincSunscreenURL).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };
  
  const handlePress4 = () => {
    // URL to open when button is pressed
    Linking.openURL(SunscreenURL1).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };

  const handlePress5 = () => {
    // URL to open when button is pressed
    Linking.openURL(SunscreenURL2).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };

  const handlePress6 = () => {
    // URL to open when button is pressed
    Linking.openURL(SunscreenURL3).catch((err) => Alert.alert('Error', 'Failed to open URL'));
  };
  
  

  return (
<LinearGradient
      style={styles.gradientBackground}
      colors={[getScoreColor(),'#fffaf5','#fffaf5' ]} // Gradient colors
    > 

    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.textUser}>
      ☀︎ Hello <Text style={styles.boldText}>SunWiser ☀︎</Text>
      </Text>
      <View 
        style={styles.scoreContainer}
      >
        <Text style={styles.text18}>Your risk score: </Text>
        <Text style={styles.text32}>{totalScore}/10</Text>
        {renderSuggestions()}

</View>

      <ScrollView style={styles.scrollViewContainer}>

      {/* TouchableOpacity to open URL */}
      <TouchableOpacity style={styles.button} onPress={handlePress1}>
        <Text style={styles.buttonText}>Sun Safety Tips</Text>
      </TouchableOpacity>

      <Text style={styles.text20}>
        Chemicals to Avoid
      </Text>

      <Text style={styles.text16}>
      To protect both your skin and the environment, consider avoiding these chemicals commonly found in sunscreens:
      </Text>

      <ScrollView horizontal={true} style={styles.scrollView}>

      <View style={styles.containerChem}>
      
        <Image source={require('../assets/octin.png')} style={styles.image} />
        <Text style={styles.text18}>OxyBenzone</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/oxyben.png')} style={styles.image} />
        <Text style={styles.text18}>Octinoxate</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/homo.png')} style={styles.image} />
        <Text style={styles.text18}>Homosalate</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/homo.png')} style={styles.image} />
        <Text style={styles.text18}>Octisalate</Text>
      </View>

      <View style={styles.containerChem}>
        <Image source={require('../assets/coral-reef.png')} style={styles.image} />
        <Text style={styles.text18}>Octocrylene</Text>

      </View>
      
      <View style={styles.containerChem}>
        <Image source={require('../assets/homo.png')} style={styles.image} />
        <Text style={styles.text18}>Avobenzone</Text>

        </View>

      </ScrollView>

            {/* TouchableOpacity to open URL */}
      <TouchableOpacity style={styles.button} onPress={handlePress2}>
        <Text style={styles.buttonText}>Read More Here</Text>
      </TouchableOpacity>

      <Text style={styles.text16}>
        If you do not have Zinc allergy, We would recommend you using physical sunscreen, or known as zinc based Sunscreen.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePress3}>
        <Text style={styles.buttonText}>Zinc based Sunscreens</Text>
      </TouchableOpacity>

      <Text style={styles.text20}>
        Staff Picks
      </Text>
      <ScrollView horizontal={true} style={styles.scrollView}>

      <View style={styles.containerSun}>
        <Image source={require('../assets/26a4fceb180f40ce172f3123abdb8723_ra,w380,h380_pa,w380,h380.png')} style={styles.imageSunScreen} />
        <Text style={styles.text18Sunscreen}>Thinkbaby, SPF 30</Text>

      <TouchableOpacity style={styles.buttonBuy} onPress={handlePress4}>
        <Text style={styles.buttonTextBuy}>Amazon.ca</Text>
      </TouchableOpacity>
        
      </View>

      <View style={styles.containerSun}>
        <Image source={require('../assets/61FPnd5oiDL._AC_SL1500_.jpg')} style={styles.imageSunScreen} />
        <Text style={styles.text18Sunscreen}>SunBum, SPF 50</Text>

        <TouchableOpacity style={styles.buttonBuy} onPress={handlePress5}>
        <Text style={styles.buttonTextBuy}>Amazon.ca</Text>
      </TouchableOpacity>

      </View>

      
      <View style={styles.containerSun}>
        <Image source={require('../assets/blume.jpg')} style={styles.imageSunScreen} />
        <Text style={styles.text18Sunscreen}>Blume, SPF 50</Text>

        <TouchableOpacity style={styles.buttonBuy} onPress={handlePress6}>
        <Text style={styles.buttonTextBuy}>Sephora.ca</Text>
      </TouchableOpacity>

      </View>

      </ScrollView>

      
      <TouchableOpacity style={styles.buttonLogOut} onPress={handlePress6}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fffaf5',
    padding: 20,
  },
  scoreContainer: {

      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingBottom: 20,
      marginBottom: 20,
      marginTop: 20,
      width: '100%', 
      height: 150, 
      borderRadius: 15, 
      overflow: 'hidden', 
   
  },
  
  
  containerChem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop:10,
    marginBottom:10,

    marginLeft:5,
    marginRight:5,

    backgroundColor:'white',
    borderRadius:25,
    paddingTop:10,
    paddingBottom:10,


  },

  containerSun:{
    justifyContent: 'center',
    alignItems: 'center',

    marginTop:10,
    marginBottom:10,

    marginLeft:5,
    marginRight:5,

    backgroundColor:'white',
    borderRadius:25,
    padding:20,
  },

  
  button: {
    backgroundColor: 'rgba(78, 75, 62, 0.1)',
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom:20,
    borderWidth:2,
    borderColor: 'rgba(78, 75, 62, 0.6)',
  },

  buttonBuy: {
    backgroundColor: 'rgb(78, 75, 62)',
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  buttonLogOut: {
    backgroundColor: '#fffaf5',
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth:2,
    borderColor: '#87261f',
    marginBottom:10,
  },

  text: {
    fontSize: 24,
    color: '#4E4B3E',
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
    color: '#4E4B3E',
    textAlign: 'center',

  },

  buttonTextBuy: {
    fontSize: 18,
    color: '#fffaf5',
    textAlign: 'center',

  },

  text32:{
    marginLeft: 20,
    marginRight:20,
    marginTop:10,
    fontSize: 32,
  },

  text18:{
    marginLeft: 20,
    marginRight:20,
    fontSize: 18,
  },
  text18Risk:{
    marginTop: 10,

    marginLeft: 20,
    marginRight:20,
    fontSize: 15,

  },

  text16 :{

    fontSize: 16,
    textAlign:'left',
    marginBottom:20,

  },

  text18Sunscreen :{
    marginLeft: 20,
    marginRight:20,
    marginTop:10,
    fontSize: 18,
    marginBottom:20,
  },
  scrollView: {
    borderRadius:25,
    marginBottom:20,
  },

    scrollViewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius:25,
    marginLeft:20,
    marginRight:20,
    marginBottom:20,
    borderWidth:10,
    borderColor:'rgb(255, 255, 255)',

  },

  
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    opacity:0.5,
  },
  imageSunScreen: {
    width: 150,
    height:150,
    resizeMode: 'contain',
  },
  gradientBackground: {
    flex: 1,
  },
});

export default ProfileScreen;