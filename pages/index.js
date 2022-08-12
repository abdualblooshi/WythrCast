import Head from "next/head";
import Weather from "../components/Weather";
import Drawer from "../components/Drawer";
import Loading from "../components/Loading";
import Error from "../components/Error";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import { useEffect } from "react";

/**
 * TODO:
 * Add a search bar to the drawer.
 * Create script to fetch current time in a country/city
 * Create script to fetch weather data of a country/city
 * Change theme based on time of a country
 * */

// Image Imports

// API LINK https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Night Images
import clearNight from "../public/images/clear_night.jpg";
import cloudyNight from "../public/images/cloudy_night.jpg";

// Day Images
import clearDay from "../public/images/clear_day.jpg";
import cloudyDay from "../public/images/clouds.jpg";
import snowyDay from "../public/images/snow_day.jpg";

// Weather Condition Images
import hotWeather from "../public/images/clear_hot.jpg";
import rainWeather from "../public/images/rain.jpg";
import stormWeather from "../public/images/thunderstorm.jpg";
import mistWeather from "../public/images/mist.jpg";
import { data } from "autoprefixer";
import { render } from "react-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getBackgroundImage = (sunrise, sunset, data) => {
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const sunriseTime = new Date(sunrise * 1000);
  const sunriseHours = sunriseTime.getHours();
  const sunriseMinutes = sunriseTime.getMinutes();
  const sunsetTime = new Date(sunset * 1000);
  const sunsetHours = sunsetTime.getHours();
  const sunsetMinutes = sunsetTime.getMinutes();

  const current_time = {
    hours: currentHours,
    minutes: currentMinutes,
  };

  const sunrise_time = {
    hours: sunriseHours,
    minutes: sunsetMinutes,
  };

  const sunset_time = {
    hours: sunsetHours,
    minutes: sunsetMinutes,
  };

  if (
    current_time.hours >= sunrise_time.hours &&
    current_time.minutes >= sunrise_time.minutes &&
    current_time.hours <= sunset_time.hours &&
    current_time.minutes <= sunset_time.minutes
  ) {
    if (data.weather[0].main === "Clear") {
      return clearDay.src;
    } else if (data.weather[0].main === "Clouds") {
      return cloudyDay.src;
    } else if (
      (data.weather[0].main === "Rain" &&
        data.weather[0].description === "light rain") ||
      data.weather[0].description === "moderate rain"
    ) {
      return rainWeather.src;
    } else if (
      data.weather[0].main === "Rain" &&
      data.weather[0].description === "heavy intensity rain"
    ) {
      return stormWeather.src;
    } else if (data.weather[0].main === "Mist") {
      return mistWeather.src;
    } else if (data.main.temp > 30) {
      return hotWeather.src;
    } else if (data.main.temp < 0) {
      return snowyDay.src;
    }
  } else {
    if (data.weather[0].main === "Clear") {
      return clearNight.src;
    } else if (data.weather[0].main === "Rain") {
      return rainWeather.src;
    } else if (data.weather[0].main === "Mist") {
      return mistWeather.src;
    } else if (data.weather[0].main === "Clouds") {
      return cloudyNight.src;
    }
  }
};

export default function Home() {
  const [city, setCity] = useState("Texas");
  const [units, setUnits] = useState("metric");
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [backgroundImage, setBackground] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const weatherRequest = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.WEATHER_API_KEY}`
      );
      const timeRequest = await axios.get(
        `https://timezone.abstractapi.com/v1/current_time?api_key=${process.env.TIMEZONE_API_KEY}&location=${city}`
      );

      axios
        .all([weatherRequest, timeRequest])
        .then(
          axios.spread((...responses) => {
            const weatherResponse = responses[0];
            const timeResponse = responses[1];
            setWeather(weatherResponse.data);
            setLoading(false);
            setSunrise(weatherResponse.data.sys.sunrise);
            setSunset(weatherResponse.data.sys.sunset);
            setBackground(
              getBackgroundImage(
                weatherResponse.data.sys.sunrise,
                weatherResponse.data.sys.sunset,
                weatherResponse.data
              )
            );
            setLatitude(timeResponse.data.latitude);
            setLongitude(timeResponse.data.longitude);
            setTime(timeResponse.data);
          })
        )
        .catch((errors) => {
          setError(true);
        });
    };
    fetchData();
  }, [city, units]);

  console.log(time, longitude, latitude);
  console.log(weather);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Head>
          <title>WythrCast</title>
          <meta
            name="description"
            content="A weather application created by Abdulrahman Alblooshi"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          className="app-container"
          style={{
            position: "absolute",
            display: "block",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
          }}
        >
          <span
            className="app-title"
            style={{
              position: "absolute",
              fontSize: "3rem",
              marginLeft: "3rem",
              marginTop: "5vh",
              color: "#FFF",
              fontWeight: 100,
            }}
          >
            WythrCast
          </span>
          <div
            className="weather-app"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <Weather weather={weather} time={time} />
            <Drawer city={city} error={error} />
          </div>
        </div>
      </>
    );
  }
}
