// import React, { useEffect, useState } from "react";
// import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
// import * as Location from "expo-location";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// export default function HomeScreen() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [initialRegion, setInitialRegion] = useState(null);
//   const [uvIndex, setUvIndex] = useState(null); // State for UV index
//   const [isLoading, setIsLoading] = useState(false); // State for loading

//   useEffect(() => {

//     (async () => {
//       setIsLoading(true); // Start loading
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         setIsLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       if (location) {
//         console.log("Location:", location); // Debug log
//         setLocation(location);
//         setInitialRegion({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });

//         // Fetch UV index based on the user's location
//         const uvData = await fetchUvIndex(location.coords.latitude, location.coords.longitude);
//         setUvIndex(uvData);
//       } else {
//         setErrorMsg("Current location not obtained");
//       }
//       setIsLoading(false); // Stop loading
//     })();
//   }, []);
// // Function to fetch UV index data from OpenWeatherMap API
//   const fetchUvIndex = async (latitude, longitude) => {
//     const API_KEY = "6ce018353e5ada81bd7e4b7f5460b494"; // API key from OpenWeatherMap
//     const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data.value; 
//     } catch (error) {
//       console.error("Error fetching UV data:", error);
//       return null;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//       {initialRegion && (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={styles.map}
//             initialRegion={initialRegion}
//             showsMyLocationButton
//             showsUserLocation
//             provider={PROVIDER_GOOGLE}
//           />
//         </View>



//       )}
//       {errorMsg ? (
//         <Text style={styles.error}>{errorMsg}</Text>
//       ) : (
//         <Text style={styles.uvText}>
//           {uvIndex !== null ? `UV Index: ${uvIndex}` : "Fetching UV index..."}
//         </Text>

//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//   },
//   mapContainer: {
//     width: "100%",
//     height: "80%",
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   uvText: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   error: {
//     marginTop: 20,
//     fontSize: 16,
//     color: "red",
//   },
// });


// Mock Home Screen since I can't test when I'm getting error on IOS Map
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from "expo-location";
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);


  useEffect(() => {
    // Get user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
        // Set the initial region based on the user's current location
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        setErrorMsg("Current location not obtained");
        return;
      }
    })();
  }, []);


  return (
    // <SafeAreaView style={styles.container}>
    <Text>Map here</Text>


      // {initialRegion && (
      //   <View style={styles.mapContainer}>
      //     <MapView
      //       style={styles.map}
      //       initialRegion={initialRegion}
      //       showsMyLocationButton
      //       showsUserLocation
      //       provider={PROVIDER_GOOGLE}
      //     />
      //   </View>
      // )}
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 10,
  //   backgroundColor: '#FFFAEC',
  // },

  // mapContainer: {
  //   width: "100%",
  //   height: "80%",
  //   borderRadius: 20, 
  //   overflow: "hidden", 
  // },
  // map: {
  //   width: "100%",
  //   height: "100%", 
  // },

});