import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function QuestionsScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [responses, setResponses] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  // Questions array with associated images
  const questions = [
    {
      id: 1,
      label: 'What is your skin tone?',
      options: [
        { label: 'Fair', value: 'fair'  },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
      image: require('../assets/skin.png'),
    },
    {
      id: 2,
      label: "What's your primary skin concern?",
      options: [
        { label: 'Aging', value: 'aging' },
        { label: 'Sensitivity', value: 'sun sensitivity' },
        { label: 'Pigmentation', value: 'pigmentation' },
      ],
      image: require('../assets/concern.png'),
    },
    {
      id: 3,
      label: 'Do you have a family history of skin cancer/melanoma?',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no'},
      ],
      image: require('../assets/skincancer.png'),
    },
  ];

  const storeQuizResults = async (results) => {
    // troubleshoot
    try {
      await AsyncStorage.setItem('quizResults', JSON.stringify(results));
      console.log('Quiz results saved');
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  };
  
  // Function to handle the "Next" button
  const handleNext = async () => {
    if (value) {
      // Save the selected response
      const updatedResponses = {
        ...responses,
        [questions[selectedQuestion].id]: value,
      };
      setResponses(updatedResponses);
      setValue(null); // Reset dropdown value
  
      // Check if the current question is the last one
      if (selectedQuestion === questions.length - 1) {
        // Save results to AsyncStorage
        try {
          await AsyncStorage.setItem('quizResults', JSON.stringify(updatedResponses));
          console.log('Quiz results saved successfully.');
  
          // Optionally, log all AsyncStorage keys for debugging
          const allData = await AsyncStorage.getAllKeys();
          console.log('AsyncStorage keys:', allData);
          
          // Navigate to home screen
          console.log('Navigating to Home...');
          navigation.navigate('Home'); // Navigate to the home screen
        } catch (error) {
          console.error('Failed to save quiz results:', error);
        }
      } else {
        // Move to the next question
        setSelectedQuestion((prev) => prev + 1); // Go to the next question
      }
    } else {
      Alert.alert('Reminder', 'Please select an option before proceeding.');//error msg if the user clicks next without input
    }
  };

  return (
    <View style={styles.container}>
      <Image source={questions[selectedQuestion].image} style={styles.image} />

      {/* Question Text */}
      <Text style={styles.label}>{questions[selectedQuestion].label}</Text>

      {/* Dropdown for the current question */}
      <DropDownPicker
        open={open}
        value={value}
        items={questions[selectedQuestion].options}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="Select an option"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdownList}
        labelStyle={styles.dropdownLabel}
        placeholderStyle={styles.placeholderLabel}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
      />

      <View style={styles.spacer}></View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        {selectedQuestion > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedQuestion((prev) => prev - 1)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {selectedQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEC',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop:100,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4E4B3E',
  },
  dropdownContainer: {
    width: '90%',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#4E4B3E',
    borderWidth: 1,
    borderRadius: 20,

  },
  dropdownList: {
    backgroundColor: '#fff',
    fontSize: 25,


  },

  selectedItemContainer: {
    backgroundColor: '#4E4B3E', // Active color for the selected item
  },
  selectedItemLabel: {
    fontSize: 20, // Font size of the selected item
    color: 'white', // Text color for the selected item
  },

  placeholderLabel: {
    fontSize: 20,
    color: '#999',
  },
  dropdownLabel: {
    fontSize: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop:250,
    position:'fixed',
  },
  button: {
    backgroundColor: '#4E4B3E',
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    marginBottom:80,
  },
  rightButton: {
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
