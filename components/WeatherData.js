import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { fetchWeatherData } from "./services/GetWeather";

export default function WeatherData({ searchParams }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (searchParams.q) {
                const data = await fetchWeatherData("weather", searchParams);
                console.log(data);
                setWeather(data);
            }
        };

        fetchWeather();
    }, [searchParams]);

    return (
        <View>
            {weather ? (
                <>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationText}>
                                {weather.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.weatherDataContainer}>
                        <View style={styles.weatherData}>
                            <Text style={styles.weatherInfo}>
                                Temp: {weather.main?.temp} °F
                            </Text>
                            <MaterialCommunityIcons
                                name="thermometer"
                                size={25}
                            />
                        </View>
                        <View style={styles.weatherData}>
                            <Text style={styles.weatherInfo}>
                                Humidity: {weather.main?.humidity}
                            </Text>
                            <MaterialCommunityIcons
                                name="water-percent"
                                size={25}
                            />
                        </View>
                        <View style={styles.weatherData}>
                            <Text style={styles.weatherInfo}>
                                Wind Speed: {weather.wind?.speed}
                            </Text>
                            <MaterialCommunityIcons
                                name="weather-windy"
                                size={25}
                            />
                        </View>
                        <View style={styles.weatherData}>
                            <Text style={styles.weatherInfo}>
                                Weather: {weather.weather[0]?.description}
                            </Text>
                            <MaterialCommunityIcons
                                name="weather-sunny"
                                size={25}
                            />
                        </View>
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    weatherDataContainer: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        flexDirection: "column",
    },
    weatherData: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationContainer: {
        padding: 20,
        margin: 20,
    },
    locationText: {
        paddingVertical: 1,
        paddingHorizontal: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    locationTextContainer: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
    },
    weatherInfo: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
});
