import Head from "next/head";
import Weather from "../components/Weather";
import Drawer from "../components/Drawer";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import rateLimit from "axios-rate-limit";
import { useEffect, useCallback } from "react";
import LoadingModal from "../components/LoadingModal";

/**
 * TODO:
 * Add a search bar to the drawer. [DONE]
 * Create script to fetch current time in a country/city [WIP/BUGGY]
 * Create script to fetch weather data of a country/city [DONE]
 * Change theme based on time of a country [WIP]
 * Implement Caching Mechanism for API calls [WIP]
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
import dustDay from "../public/images/dust_day.jpg";

// Weather Condition Images
import hotWeather from "../public/images/clear_hot.jpg";
import rainWeather from "../public/images/rain.jpg";
import stormWeather from "../public/images/thunderstorm.jpg";
import mistWeather from "../public/images/mist.jpg";
import { data } from "autoprefixer";
import { render } from "react-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getBackgroundImage = (sunrise, sunset, data, time) => {
  const targetTime = new Date(time * 1000);
  const currentHours = targetTime.getHours();
  const currentMinutes = targetTime.getMinutes();
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
    // Day Pictures
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
    } else if (data.weather[0].main === "Dust") {
      return dustDay.src;
    } else if (data.main.temp > 30) {
      return hotWeather.src;
    } else if (data.main.temp < 0) {
      return snowyDay.src;
    }
  } else {
    // Night Pictures
    if (data.weather[0].main === "Clear") {
      return clearNight.src;
    } else if (data.weather[0].main === "Rain") {
      return rainWeather.src;
    } else if (data.weather[0].main === "Mist") {
      return mistWeather.src;
    } else if (data.weather[0].main === "Clouds") {
      return cloudyNight.src;
    } else if (data.weather[0].main === "Dust") {
      return dustDay.src;
    }
  }
};

export default function Home(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [searchValue, setSearchValue] = useState("");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [timeZone, setTimeZone] = useState(props.timeZone);
  const [time, setTime] = useState(Date.now());
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [backgroundImage, setBackground] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const http = rateLimit(axios.create(), {
        maxRequests: 1,
        perMilliseconds: 1000,
        maxRPS: 1,
      });

      http.setMaxRPS(1);

      setLoading(true);
      try {
        const ipRequest = await http.get(
          `http://ip-api.com/json/${props.ip}?fields=status,message,country,city,lat,lon,query,timezone`,
          {
            cache: {
              maxAge: 2 * 60 * 1000, // 2 min instead of 15 min
              exclude: { query: false },
            },
          }
        );
        const ipResponse = ipRequest.data;

        const timeRequest = await axios.get(
          `http://worldtimeapi.org/api/timezone/${ipResponse.timezone}`,
          {
            cache: {
              maxAge: 2 * 60 * 1000, // 2 min instead of 15 min
              exclude: { query: false },
            },
          }
        );
        const weatherRequest = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.WEATHER_API_KEY}`,
          {
            cache: {
              maxAge: 2 * 60 * 1000, // 2 min instead of 15 min
              exclude: { query: false },
            },
          }
        );

        axios.all([weatherRequest, timeRequest]).then(
          axios.spread(async (...responses) => {
            const timeResponse = responses[1];
            const weatherResponse = responses[0];
            console.log(weatherResponse.request.fromCache);
            const unixTime = () => {
              return Math.floor(
                new Date(timeResponse.data.datetime).getTime() / 1000
              );
            };
            setTime(unixTime);
            setWeather(weatherResponse.data);
            setSunrise(weatherResponse.data.sys.sunrise);
            setSunset(weatherResponse.data.sys.sunset);
            console.log(time);
            setBackground(
              getBackgroundImage(
                weatherResponse.data.sys.sunrise,
                weatherResponse.data.sys.sunset,
                weatherResponse.data,
                time
              )
            );
            setError(false);
            setLoading(false);
          })
        );
      } catch (error) {
        console.log(error);
        if (error.request.status === 404) {
          setError(true);
          setErrorMessage("Wrong city/country name!");
          setLoading(false);
        } else {
          setErrorMessage("Error!");
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [city]);
  console.log(weather);
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
      <LoadingModal isLoading={isLoading} />
      <div
        className="app-container"
        style={{
          position: "absolute",
          display: "block",
          backgroundImage: `url(${
            isLoading && backgroundImage === "" ? clearDay.src : backgroundImage
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          fontFamily: "Lato, sans-serif",
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
          <Weather weather={weather} time={time} isLoading={isLoading} />}
          <Drawer
            city={city}
            weather={weather}
            error={error}
            setCity={setCity}
            setSearchValue={setSearchValue}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const ipRequest = await axios.get(`https://api.ipify.org?format=json`);
  const ip = ipRequest.data.ip;

  const cityRequest = await axios.get(
    `http://ip-api.com/json/${ip}?fields=status,message,country,city,lat,lon,query,timezone`
  );
  const defaultCity = cityRequest.data.city;
  const timeZone = cityRequest.data.timezone;
  console.log(defaultCity);

  return {
    props: {
      ip,
      defaultCity,
      timeZone,
    },
  };
}
