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

const ForecastScreen = () => {
  const [hourlyUV, setHourlyUV] = useState([]);
  const [dailyUV, setDailyUV] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = '6ce018353e5ada81bd7e4b7f5460b494';
  const latitude = 37.7749; // Replace with dynamic latitude
  const longitude = -122.4194; // Replace with dynamic longitude

  useEffect(() => {
    const fetchUVData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        setHourlyUV(data.hourly.slice(0, 10)); // First 10 hours of UV index
        setDailyUV(data.daily.slice(0, 10));   // First 10 days of UV index
        setLoading(false);
      } catch (error) {
        console.error('Error fetching UV data:', error);
      }
    };

    fetchUVData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.h2}>Your Location(User)</Text>
      <Text style={styles.h1}>4/10(example)</Text>
      <Text style={styles.h3}>Current Weather Condition(User)</Text>

      <ScrollView style={styles.scrollViewContainer}>
  {/* Hourly UV Index */}
  <Text style={styles.text16}>HOURLY UV INDEX</Text>
  <ScrollView horizontal={true} style={styles.scrollView}>
    {hourlyUV.map((hour, index) => (
      <View key={index} style={styles.containerHourly}>
        <Text style={styles.text16}>{new Date(hour.dt * 1000).getHours()}H</Text>
        <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
        <Text style={styles.text18}>{hour.uvi.toFixed(0)}</Text> {/* Rounded to 1 decimal */}
      </View>
    ))}
  </ScrollView>

  {/* 10-Day Forecast */}
  <Text style={styles.text16}>10-DAY FORECAST</Text>
  <ScrollView style={styles.scrollView2}>
    {dailyUV.map((day, index) => (
      <View key={index}>
        {/* Container for the day's forecast content */}
        <View style={styles.containerForecast}>
          <Text style={styles.textForecast}>
            {new Date(day.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
            })}
          </Text>
          {/* Displaying sun icon, UV High, and UV Low in a row */}
          <View style={styles.containerForecastDetails}>
            <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
            <View style={styles.uvContainer}>
              <Text style={styles.textForecast}>UV High: 8</Text>
              <Text style={styles.textForecast}>UV Low: 2</Text>
            </View>
          </View>
        </View>

        {/* Border line that separates each day's content */}
        <View style={styles.divider} />
      </View>
    ))}
  </ScrollView>
</ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerForecastDetails: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    justifyContent: 'space-between', // Space items evenly in the row
    width: '100%', // Ensure it takes full width for proper alignment
  },
  
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%', // Ensure the divider takes full width
    marginVertical: 10, // Space between days
  },
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
    marginTop: 10 
  },

  h1: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginVertical: 10 
  },
  h3: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 10 
  },
  scrollViewContainer: { 
    flex: 1 
  },
  text16: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    margin: 10 
  },

  scrollView: { 
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    
  },
  containerHourly: { 
    alignItems: 'center', 
    marginHorizontal: 10 
  },
  image: { 
    width: 40, 
    height: 40, 
    marginVertical: 5
  },
  containerForecast: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    justifyContent: 'space-between', // Space items evenly in the row
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    
  },
  uvContainer: {
    flexDirection: 'row', // Place UV High and Low next to each other
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  text18: { 
    fontSize: 18, 
    fontWeight: 'bold'
   },
  scrollView2: { 
    padding: 10 
  },

  textForecast: {
    fontSize: 16,
    marginHorizontal: 5, // Space between UV High and UV Low
  },

  
});

export default ForecastScreen;
/*  <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Tomorrow</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

 textForecast:{
//   },
containerForecast:{
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center", // Center-align items vertically
//     // justifyContent: "flex-start", // Optional: Center the entire content within the parent
//     justifyContent: "space-between", // Space between text and image
//     padding: 5,
//     borderRadius:25,
//   },
*/

// const ForecastScreen = () => {
//   const [hourlyUV, setHourlyUV] = useState([]);
//   const [dailyUV, setDailyUV] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiKey = '6ce018353e5ada81bd7e4b7f5460b494';
//   const latitude = 37.7749; 
//   const longitude = -122.4194; 

//   return (

//     <SafeAreaView style={styles.screenContainer}>
//       <Text style={styles.h2}>
//         Your Location(User)
//       </Text>

//       <Text style={styles.h1}>
//         4/10(example)
//       </Text>

//       <Text style={styles.h3}>
//         current weather condition(User)
//       </Text>


//       <ScrollView style={styles.scrollViewContainer}>

//       <Text style={styles.text16}>
//         HOURLY UV INDEX
//       </Text>

//       <ScrollView horizontal={true} style={styles.scrollView}>

//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>Now</Text>
//         {/* We also need to fetch for the current time in Hour */}
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.text18} >8</Text>
//       </View>


//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>1PM</Text>
//         {/*fetch Hourly Uv Index */}
//         {/*fetch Hourly Uv Index, change icon image to moon after the sunset */}
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>

//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>


//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>


//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>


//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/oxyb.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>



//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/oxyb.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>


//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/oxyb.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>



//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/oxyb.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>



//       <View style={styles.containerHourly}>
//         <Text style={styles.text16}>2PM</Text>
//         <Image source={require('../assets/oxyb.png')} style={styles.image} />
//         <Text style={styles.text18}>7</Text>
//       </View>
//       </ScrollView>


//       <Text style={styles.text16}>
//         10-DAY FORECAST
//       </Text>
//       <ScrollView style={styles.scrollView2}>

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Today</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Tomorrow</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Wed</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />


//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.containerForecast}>
        
//         <Text style={styles.textForecast}>Thurs</Text>
//         <Image source={require('../assets/sunnyicon.png')} style={styles.image} />
//         <Text style={styles.textForecast}>UV High ___ UV Low ___</Text>
//       </View>
      

//       </ScrollView>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFAEC',
//     padding: 20,
//   },

  
//   containerHourly:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     marginTop:5,
//     backgroundColor:'white',
//     width: 80,
//   },

//   scrollView: {
//     borderRadius:25,
//     marginBottom:20,
//     maxHeight:'50%',
//   },

//     scrollViewContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//     borderRadius:25,
//     marginLeft:20,
//     marginRight:20,
//     marginBottom:20,
//     padding:10,
//     marginTop:20,

//   },

//   scrollView2: {
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//     borderRadius:25,
//     marginBottom:20,
//   },
  
//   containerForecast:{
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center", // Center-align items vertically
//     // justifyContent: "flex-start", // Optional: Center the entire content within the parent
//     justifyContent: "space-between", // Space between text and image
//     padding: 5,
//     borderRadius:25,
//   },


//   image: {
//     margin:10,
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
  
//   button: {
//     backgroundColor: '#4E4B3E',
//     height: 50,
//     padding: 5,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '90%',
//     marginBottom:20,
//   },

//   // Font Start

//   // font: {
//   //   fontFamily: 'Montserrat-Regular',
//   // },

//   text: {
//     fontSize: 24,
//     color: '#333',
//     textAlign: 'left',
//    marginTop: 20,
//     marginBottom: 20,
//     alignSelf: 'left',
    
//   },

//   h1: {
//     fontSize: 38,
//     color: '#333',
//     margin: 20,
//     marginBottom:0,
//   },

//   h2: {
//     fontSize: 24,
//     color: '#333',
//     marginTop: 50,
//     margin: 20,
//     marginBottom:0,
//   },
//   h3: {
//     fontSize: 20,
//     color: '#333',
//     margin: 20,
//     marginBottom:0,
//   },

//   boldText: {
//     fontWeight:'bold',
//   },
//   text20:{
//     fontSize: 20,
//     color: '#333',
//     textAlign: 'left',
//     marginTop: 20,
//     marginBottom: 20,
//     alignSelf: 'left',

//   },
//     buttonText: {
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//     backgroundColor: '#4E4B3E',

//   },
//   text18:{
//     marginLeft: 20,
//     marginRight:20,

//     fontSize: 18,

//   },

//   text16 :{

//     fontSize: 16,
//     textAlign:'left',

//   },

//   textForecast:{
//   },
  
//   divider: {
//     height: 1, // Thickness of the divider
//     backgroundColor: "gray", // Color of the divider
//     width: "100%", // Make sure it spans the full width
//   },
// });
