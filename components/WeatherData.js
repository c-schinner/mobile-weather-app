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
                                    {info.label}: {info.value}
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
    weatherIcon: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
});
