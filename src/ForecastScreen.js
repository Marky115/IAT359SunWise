import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ForecastScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.text}>Forecast Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default ForecastScreen;