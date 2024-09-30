import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import Header from './components/Header.js';
import coverImage from './assets/globe.jpg';
import WeatherData from './components/WeatherData.js';
import ForecastData from './components/ForecastData.js';
import { useState } from'react';


// Weather dats is working correctly, adjust icons and import the icons from the weather app (in getWeather)
// forecast is not loading yet... figure out what is going on with that
// Get the different background images to load with each type of weather (images are in assets)
// get rid of borders and tune up the UI to make it look better
// maybe use a different background image for the initial load

export default function App() {

  const [searchParams, setSearchParams] = useState({
    q: '',
    units: 'imperial'
  });

  return (
    <ImageBackground source={coverImage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Header setSearchParams={setSearchParams} />
        <View style={styles.weatherContainer}>
          <WeatherData searchParams={searchParams} />
        </View>
        <View style={styles.forecastContainer}>
          <ForecastData searchParams={searchParams} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  weatherContainer: {
    marginTop: 50,
  },
  forecastContainer: {
    marginTop: 100,
  },
});
