import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from 'react';
import { auth, db} from './firebaseConfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth functions
//this stores the sign up stuff
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


//added from app to LoginSignupscreen
export default function LoginSignUpScreen({navigation}) {
  //added this
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //https://www.mailercheck.com/articles/email-validation-javascript 
  const validEmail = (email) =>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailPattern.test(email);
  };
  
  const handleLogin = () => {
    //if user doesnt enter a legit email format
    if (!validEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    //if user doesnt enter a password length gives this error message to the UI
    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters long.");
      return;
    }

    //goes to the home screen
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully logged in
        navigation.navigate("Home"); // Navigate to Home screen
      })
      .catch((error) => {
        Alert.alert("Sorry we couldn't find your account with the email or password", error.message);
      });
  };


  const handleSignUp = () => {
    
    if (!validEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    //if user doesnt enter a password length gives this error message to the UI
    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters long.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Successfully signed up
        const user = userCredential.user;

        // Add the user to Firestore
        await setDoc(doc(db, "SunWise User", user.uid), {
          email: user.email,
      
        });
        
        //navigation.navigate("Home");
        navigation.navigate("User Questionnaire"); 
      })
      .catch((error) => {
        Alert.alert("Sign Up Failed, this email is already used", error.message);
      });
  };

return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>SunWise</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
<View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.buttons} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text> 
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'#fff0d1',
      justifyContent:'center',
      flex: 1,
    },
    buttonContainer: {
      alignItems: 'center',

    },
    titleText: {
        marginTop: 100,
        marginBottom:300,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 40,
        color:'#4E4B3E',
        
       },

       buttons: {
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
        fontSize: 18,
        color: 'white',
        

      },


      input: { 
        height: 50, 
        borderColor: '#ddd', 
        borderWidth: 3, 
        marginBottom: 16, 
        paddingHorizontal: 13,
        backgroundColor:'#FFFFFF',
        width: '80%',
        alignSelf: 'center',
        borderRadius:25,
        borderColor:'#FFFFFF',
      },
  });