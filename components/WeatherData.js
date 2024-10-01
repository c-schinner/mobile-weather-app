import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { fetchWeatherData, iconUrlFromCode } from "./services/GetWeather";

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

    const weatherInfoMap = weather
        ? [
              {
                  label: "Temperature",
                  value: `${weather.main?.temp} °F`,
                  icon: "thermometer",
              },
              {
                  label: "Humidity",
                  value: `${weather.main?.humidity}%`,
                  icon: "water-percent",
              },
              {
                  label: "Wind Speed",
                  value: `${weather.wind?.speed} mph`,
                  icon: "weather-windy",
              },
              {
                  label: "Description",
                  value: weather.weather[0]?.description,
                  icon: iconUrlFromCode(weather.weather[0]?.icon),
                  isImage: true,
              },
          ]
        : [];

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
                        {weatherInfoMap.map((info, index) => (
                            <View key={index} style={styles.weatherData}>
                                <Text style={styles.weatherInfo}>
                                    {info.label}:
                                </Text>
                                <Text style={styles.weatherValue}>
                                    {info.value}
                                </Text>
                                {info.isImage ? (
                                    <Image
                                        style={styles.weatherIcon}
                                        source={{ uri: info.icon }}
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name={info.icon}
                                        size={25}
                                        style={styles.icon}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </>
            ) : null}
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
        marginBottom: 10,
    },
    weatherInfo: {
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 10,
    },
    weatherValue: {
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 10,
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    icon: {
        marginLeft: 10,
    },
    locationContainer: {
        padding: 20,
        margin: 10,
    },
    locationText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    locationTextContainer: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
    },
});
