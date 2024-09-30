const API_KEY = {process.env.REACT_APP_WEATHER_API_KEY};
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export const fetchWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    const newSearchParams = {
        units: searchParams.units,
        q: searchParams.q,
        appid: API_KEY,
    };

    console.log(newSearchParams);
    url.search = new URLSearchParams(newSearchParams);

    const res = await fetch(url);
    return await res.json();
};
