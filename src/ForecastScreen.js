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
  const [uvHigh, setUVHigh] = useState(0); 
  const [uvLow, setUVLow] = useState(0);
  const [currentUV, setCurrentUV] = useState(0); // User's current UV index
  const [currentWeather, setCurrentWeather] = useState('');

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
    
        // Extract daily UV data and current UV index
        const dailyUVValues = data.daily.map((day) => day.uvi);
        const uvHigh = Math.max(...dailyUVValues);
        const uvLow = Math.min(...dailyUVValues);
        const currentUV = data.current.uvi;
        const currentWeatherDesc = data.current.weather[0].description;
        

        setHourlyUV(data.hourly.slice(0, 10));
        setDailyUV(data.daily.slice(0, 10));
        setUVHigh(uvHigh);
        setUVLow(uvLow);
        setCurrentUV(currentUV);
        setLoading(false);
        setCurrentWeather(currentWeatherDesc);
      } catch (error) {
        console.error('Error fetching UV data:', error);
      }
    };

    fetchUserLocation();
  }, []);

  const getUVIndexInfo = (uvIndex) => {
    if (uvIndex <= 3) {
      return {
        color: 'green',
        risk: 'Minimal Risk',
      };
    } else if (uvIndex <= 8) {
      return {
        color: 'orange',
        risk: 'Moderate Risk',
      };
    } else if (uvIndex <= 11) {
      return {
        color: 'red',
        risk: 'High Risk',
      };
    } else {
      return {
        color: 'purple',
        risk: 'Extreme Risk',
      };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const uvInfo = getUVIndexInfo(currentUV);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.currentUVContainer}>
          <Text style={styles.currentUVLabel}>Current UV Index</Text>
        <View style={styles.uvIndexRow}>
          <Text style={[styles.uvIndexValue, { color: uvInfo.color }]}>
            {currentUV.toFixed(1)}
          </Text>
          <Text style={[styles.uvRiskText, { color: uvInfo.color }]}>
            {uvInfo.risk}
          </Text>
        </View>
        <Text style={styles.weatherDescription}>
          {`${currentWeather}`}
        </Text>
      </View>

      
      <ScrollView style={styles.scrollViewContainer}>
        {/* Hourly UV Index */}
        
          <Text style={styles.sectionTitle}>HOURLY UV INDEX</Text>
          <ScrollView horizontal style={styles.hourlyUVContainer}>
            {hourlyUV.map((hour, index) => (
              <View key={index} style={styles.hourlyUVItem}>
                <Text style={styles.hourlyUVText}>
                  {new Date(hour.dt * 1000).getHours()}H
                </Text>
                <Image
                  source={require('../assets/sunnyicon.png')}
                  style={styles.weatherIcon}
                />
                <Text style={styles.hourlyUVText}>{hour.uvi.toFixed(0)}</Text>
              </View>
            ))}
          </ScrollView>

        {/* 10-Day Forecast */}
      
        <ScrollView style={styles.dailyForecastContainer}>
        <Text style={styles.sectionTitle}>8-DAY FORECAST</Text>
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
   // backgroundColor: '#FFFAEC',
    padding: 20,
  },
  currentUVContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentUVLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  uvIndexValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  uvRiskText: {
    fontSize: 24,
    fontStyle: 'bold',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding:10,
    borderRadius:15,
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:10,
  },
  hourlyUVContainer: {
    paddingHorizontal: 10,
   
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
    backgroundColor: 'rgba(255, 255, 115, 0.6)',
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
  uvIndexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:8,
    
  },

  weatherDescription: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'bold',
  },
  
});

export default ForecastScreen;
