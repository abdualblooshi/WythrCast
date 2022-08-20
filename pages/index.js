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
 * Add a settings button
 * Finalize Drawer component
 * Mobile Support
 * */

// Image Imports

// API LINK https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Night Images
import clearNight from "../public/images/clear_night.jpg";
import cloudyNight from "../public/images/cloudy_night.jpg";
import drizzleNight from "../public/images/drizzle_night.jpg";
import dustNight from "../public/images/dust_night.jpg";

// Day Images
import clearDay from "../public/images/clear_day.jpg";
import cloudyDay from "../public/images/clouds.jpg";
import snowyDay from "../public/images/snow_day.jpg";
import dustDay from "../public/images/dust_day.jpg";
import drizzleDay from "../public/images/drizzle_day.jpg";

// Weather Condition Images
import hotWeather from "../public/images/clear_hot.jpg";
import rainWeather from "../public/images/rain.jpg";
import stormWeather from "../public/images/thunderstorm.jpg";
import mistWeather from "../public/images/mist.jpg";
import tornadoWeather from "../public/images/tornado.jpg";
import volcanoWeather from "../public/images/volcano.jpg";

import { data } from "autoprefixer";
import { render } from "react-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [backgroundImage, setBackground] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [amPm, setAmPm] = useState("");
  const [time12Format, setTime12Format] = useState("");
  const [titleColor, setTitleColor] = useState("#FFF");

  useEffect(() => {
    const fetchData = async () => {
      const http = rateLimit(axios.create(), {
        maxRequests: 1,
        perMilliseconds: 1000,
        maxRPS: 1,
      });

      http.setMaxRPS(1);

      const changeBackground = (sunrise, sunset, data, targetTime) => {
        const currentHours = targetTime.substring(0, 2);
        const currentMinutes = targetTime.substring(3, 5);
        console.log(`${currentHours} : ${currentMinutes}`);
        const sunriseTime = new Date(sunrise * 1000);
        console.log("Sunrise Time in City: ", sunriseTime);
        const sunriseHours = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunsetTime = new Date(sunset * 1000);
        console.log("Sunset Time in City: ", sunsetTime);
        const sunsetHours = sunsetTime.getHours();
        const sunsetMinutes = sunsetTime.getMinutes();

        const current_time = {
          hours: currentHours,
          minutes: currentMinutes,
        };

        const sunrise_time = {
          hours: sunriseHours,
          minutes: sunriseMinutes,
        };

        const sunset_time = {
          hours: sunsetHours,
          minutes: sunsetMinutes,
        };

        if (
          current_time.hours >= sunrise_time.hours &&
          current_time.hours <= sunset_time.hours
        ) {
          // Day Pictures
          if (data.weather[0].main === "Clear") {
            setTitleColor("#000");
            if (data.main.temp >= 40) {
              setBackground(hotWeather.src);
            } else if (data.main.temp <= 0) {
              setBackground(snowyDay.src);
            } else {
              setBackground(clearDay.src);
            }
          } else if (data.weather[0].main === "Clouds") {
            setTitleColor("#FFF");
            setBackground(cloudyNight.src);
          } else if (
            (data.weather[0].main === "Rain" &&
              data.weather[0].description === "light rain") ||
            data.weather[0].description === "moderate rain"
          ) {
            setTitleColor("#000");
            setBackground(rainWeather.src);
          } else if (
            data.weather[0].main === "Rain" &&
            data.weather[0].description === "heavy intensity rain"
          ) {
            setTitleColor("#FFF");
            setBackground(stormWeather.src);
          } else if (data.weather[0].main === "Drizzle") {
            setTitleColor("#FFF");
            setBackground(drizzleDay.src);
          } else if (
            data.weather[0].main === "Mist" ||
            data.weather[0].main === "Haze" ||
            data.weather[0].main === "Fog"
          ) {
            setTitleColor("#FFF");
            setBackground(mistWeather.src);
          } else if (
            data.weather[0].main === "Dust" ||
            data.weather[0].main === "Sand"
          ) {
            setTitleColor("#FFF");
            setBackground(dustDay.src);
          } else if (
            data.weather[0].main === "Tornado" ||
            data.weather[0].main === "Squall"
          ) {
            setBackground(tornadoWeather.src);
          } else if (data.weather[0].main === "Volcano") {
            setTitleColor("#FFF");
            setBackground(volcanoWeather.src);
          }
        } else {
          // Night Pictures
          if (data.weather[0].main === "Clear") {
            setTitleColor("#FFF");
            setBackground(clearNight.src);
          } else if (data.weather[0].main === "Rain") {
            setTitleColor("#000");
            setBackground(rainWeather.src);
          } else if (
            data.weather[0].main === "Mist" ||
            data.weather[0].main === "Haze" ||
            data.weather[0].main === "Fog"
          ) {
            setTitleColor("#FFF");
            setBackground(mistWeather.src);
          } else if (data.weather[0].main === "Clouds") {
            setTitleColor("#FFF");
            setBackground(cloudyNight.src);
          } else if (data.weather[0].main === "Dust") {
            setTitleColor("#FFF");
            setBackground(dustNight.src);
          } else if (data.weather[0].main === "Snow") {
            setTitleColor("#000");
            setBackground(snowyDay.src);
          } else if (data.weather[0].main === "Drizzle") {
            setTitleColor("#FFF");
            setBackground(drizzleNight.src);
          } else if (
            data.weather[0].main === "Tornado" ||
            data.weather[0].main === "Squall"
          ) {
            setTitleColor("#FFF");
            setBackground(tornadoWeather.src);
          } else if (data.weather[0].main === "Volcano") {
            setTitleColor("#FFF");
            setBackground(volcanoWeather.src);
          }
        }
      };

      setLoading(true);
      try {
        const timeRequest = await http.get(
          `https://api.ipgeolocation.io/timezone?apiKey=${process.env.TIMEZONE_API_KEY}&location=${city}`,
          {
            cache: {
              maxAge: 15 * 60 * 1000, // 2 min instead of 15 min
              exclude: { query: false },
            },
          }
        );

        const weatherRequest = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.WEATHER_API_KEY}`,
          {
            cache: {
              maxAge: 15 * 60 * 1000, // 2 min instead of 15 min
              exclude: { query: false },
            },
          }
        );

        axios.all([weatherRequest, timeRequest]).then(
          axios.spread(async (...responses) => {
            const timeResponse = responses[1];
            const weatherResponse = responses[0];
            setTime(timeResponse.data.time_24.substring(0, 5));
            setDate(timeResponse.data.date);
            setTime12Format(timeResponse.data.time_12.substring(0, 5));
            console.log(time12Format);
            setAmPm(timeResponse.data.time_12.substring(9));
            console.log(amPm);
            setWeather(weatherResponse.data);
            changeBackground(
              weatherResponse.data.sys.sunrise,
              weatherResponse.data.sys.sunset,
              weatherResponse.data,
              time // <--- to be fixed
              /*
               * TODO:
               * new Date() won't work because it keeps referencing back to the same time value,
               * it has to be changed to a string that contains time in 24-hour format
               * not a YMD format datetime string
               */
            );
            console.log(city);
            console.log("-------------");
            setError(false);
            setLoading(false);
          })
        );
      } catch (error) {
        console.log(error);
        if (error.request.status === 404) {
          setError(true);
          setErrorMessage("Wrong city/country!");
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
  return (
    <>
      <Head>
        <title>
          WythrCast
          {weather == null || weather == undefined
            ? null
            : ` - ${Math.round(weather.main.temp)}°C`}
        </title>
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
            isLoading && backgroundImage === ""
              ? hotWeather.src
              : backgroundImage
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
            color: titleColor,
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
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Weather
            weather={weather}
            time={time}
            isLoading={isLoading}
            date={date}
          />
          <Drawer
            city={city}
            weather={weather}
            error={error}
            setCity={setCity}
            errorMessage={errorMessage}
            isLoading={isLoading}
            amPm={amPm}
            time12Format={time12Format}
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

  return {
    props: {
      ip,
      defaultCity,
      timeZone,
    },
  };
}
