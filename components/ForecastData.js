import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
    fetchForecastWeatherData,
    processForecastData,
} from "./services/GetWeather";

export default function ForecastData({ searchParams }) {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            if (searchParams.q) {
                try {
                    const data = await fetchForecastWeatherData(
                        "forecast",
                        searchParams
                    );
                    console.log("Processed Forecast Data:", data);

                    if (data) {
                        const processedData = processForecastData(data);
                        setForecast(processedData);
                    }
                } catch (error) {
                    console.log("Error fetching forecast data:", error);
                }
            }
        };

        fetchForecast();
    }, [searchParams]);

    return (
        <View style={styles.container}>
            {forecast.length > 0 ? (
                <>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerText}>5 Day Forecast</Text>
                    </View>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={styles.forecastContainer}
                    >
                        {forecast.map((day, index) => (
                            <View key={index} style={styles.dataInfo}>
                                <Text style={styles.dataText}>
                                    {new Date(day.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "short",
                                        }
                                    )}
                                </Text>
                                <Text style={styles.dataText}>
                                    Temp: {Math.round(day.temp)} °F
                                </Text>
                                <Text style={styles.dataText}>
                                    {day.description}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <Text style={styles.errorText}></Text>
            )}
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
