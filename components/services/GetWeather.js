import { WEATHER_API_KEY } from "@env";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const iconUrlFromCode = (icon) =>
    `http://openweathermap.org/img/wn/${icon}@2x.png`;

export const fetchWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);

    url.searchParams.append("units", searchParams.units);
    url.searchParams.append("q", searchParams.q);
    url.searchParams.append("appid", WEATHER_API_KEY);

    console.log("Final Request URL:", url.toString());

    const res = await fetch(url);
    return await res.json();
};

export const fetchForecastWeatherData = async (type, searchParams) => {
    const url = new URL(BASE_URL + type);

    url.searchParams.append("units", "imperial");
    url.searchParams.append("q", searchParams.q);
    url.searchParams.append("appid", WEATHER_API_KEY);

    console.log("Forecast Request URL:", url.toString());

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch forecast data:", error);
        return null;
    }
};
