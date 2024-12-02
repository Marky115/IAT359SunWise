import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import * as Location from 'expo-location';

const ForecastScreen = () => {
  const [hourlyUV, setHourlyUV] = useState([]);
  const [dailyUV, setDailyUV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uvHigh, setUVHigh] = useState(0); // Add this line
  const [uvLow, setUVLow] = useState(0); // Add this line

  const apiKey = '6ce018353e5ada81bd7e4b7f5460b494';
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        await fetchUVData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    const fetchUVData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
    
        // Find the UV high and UV low from the daily forecast
        const dailyUVValues = data.daily.map((day) => day.uvi);
        const uvHigh = Math.max(...dailyUVValues);
        const uvLow = Math.min(...dailyUVValues);
    
        setHourlyUV(data.hourly.slice(0, 10));
        setDailyUV(data.daily.slice(0, 10));
        setUVHigh(uvHigh);
        setUVLow(uvLow);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching UV data:', error);
      }
    };

    fetchUserLocation();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  
  //<Text style={styles.h2}>Your Location(User)</Text>
  return (
    <SafeAreaView style={styles.screenContainer}>
      
      <Text style={styles.h1}>4/10(example)</Text>
      <Text style={styles.h3}>Current Weather Condition(User)</Text>

      <ScrollView style={styles.scrollViewContainer}>
        {/* Hourly UV Index */}
        <Text style={styles.sectionTitle}>HOURLY UV INDEX</Text>
        <ScrollView horizontal style={styles.hourlyUVContainer}>
          {hourlyUV.map((hour, index) => (
            <View key={index} style={styles.hourlyUVItem}>
              <Text style={styles.hourlyUVText}>{new Date(hour.dt * 1000).getHours()}H</Text>
              <Image source={require('../assets/sunnyicon.png')} style={styles.weatherIcon} />
              <Text style={styles.hourlyUVText}>{hour.uvi.toFixed(0)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 10-Day Forecast */}
        <Text style={styles.sectionTitle}>10-DAY FORECAST</Text>
        <ScrollView style={styles.dailyForecastContainer}>
          {dailyUV.map((day, index) => (
          <View key={index} style={styles.dailyForecastItem}>
            <Text style={styles.dailyForecastText}>
             {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
          <View style={styles.dailyForecastDetails}>
            <Image source={require('../assets/sunnyicon.png')} style={styles.weatherIcon} />
          <View style={styles.uvContainer}>
            <Text style={styles.dailyForecastText}>UV High: {uvHigh.toFixed(0)}</Text>
            <Text style={styles.dailyForecastText}>UV Low: {uvLow.toFixed(0)}</Text>
          </View>
        </View>
      </View>
    ))}
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
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  h3: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollViewContainer: {
    flex: 1,
   
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  hourlyUVContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  hourlyUVItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourlyUVText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  dailyForecastContainer: {
    padding: 10,
    backgroundColor:'rgba(255, 255, 255, 0.6)',
    
  },
  dailyForecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  dailyForecastText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  dailyForecastDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  uvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
});

export default ForecastScreen;


