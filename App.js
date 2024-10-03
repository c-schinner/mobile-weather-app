import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import Header from "./components/Header.js";
import coverImage from "./assets/sunnyday2.jpeg";
import WeatherData from "./components/WeatherData.js";
import ForecastData from "./components/ForecastData.js";
import { useState } from "react";

export default function App() {
    const [searchParams, setSearchParams] = useState({
        q: "",
        units: "imperial",
    });

    return (
        <ImageBackground
            source={coverImage}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
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
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    weatherContainer: {
        marginTop: 5,
    },
    forecastContainer: {
        marginTop: 50,
    },
});
