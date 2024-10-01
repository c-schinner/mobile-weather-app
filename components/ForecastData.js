import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./services/GetWeather";

export default function ForecastData({ searchParams }) {
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            if (searchParams.q) {
                const data = await fetchWeatherData("forecast", searchParams);

                const dailyForecasts = data.list.filter(
                    (forecastItem) =>
                        new Date(forecastItem.dt * 1000).getHours() === 12
                );

                setForecast(dailyForecasts);
            }
        };

        fetchForecast();
    }, [searchParams]);

    return (
        <View style={styles.container}>
            {forecast ? (
                <View style={styles.headerInfo}>
                    <Text style={styles.headerText}> 5 Day Forecast</Text>
                </View>
            ) : null}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.forecastContainer}
            >
                {forecast
                    ? forecast.map((day, index) => (
                          <View key={index} style={styles.dataInfo}>
                              <Text style={styles.dataText}>
                                  {new Date(day.dt * 1000).toLocaleDateString(
                                      "en-US",
                                      { weekday: "short" }
                                  )}
                              </Text>
                              <Text style={styles.dataText}>
                                  Temp: {Math.round(day.main.temp)} °F
                              </Text>
                          </View>
                      ))
                    : null}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    headerInfo: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        alignSelf: "center",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    dataInfo: {
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    dataText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    forecastContainer: {
        justifyContent: "space-between",
    },
});
