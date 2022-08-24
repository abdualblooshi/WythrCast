import Head from "next/head";
import Weather from "../components/Weather";
import { useState } from "react";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import { useEffect, useCallback } from "react";
import LoadingModal from "../components/LoadingModal";
import { Heading } from "@chakra-ui/react";
import useMediaQuery from "../hooks/useMediaQuery";

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
import snowyNight from "../public/images/snow_night.jpg";
import hotNight from "../public/images/hot_night.jpg";

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
  const [dateYMD, setDateYMD] = useState(props.date_ymd);
  const [amPm, setAmPm] = useState("");
  const [time12Format, setTime12Format] = useState("");
  const [titleColor, setTitleColor] = useState("#FFF");
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(false);
  const isLargerThan900 = useMediaQuery(800);

  useEffect(() => {
    const fetchData = async () => {
      const http = rateLimit(axios.create(), {
        maxRequests: 2,
        perMilliseconds: 1250,
        maxRPS: 2,
      });

      http.setMaxRPS(1);

      const changeBackground = (sunrise, sunset, data, targetTime) => {
        const currentDate = new Date(targetTime);
        const utcCurrentDate = new Date(currentDate.toUTCString().slice(0, -4));
        console.log("--------------------------");
        console.log(utcCurrentDate);
        //console.log(`${currentHours} : ${currentMinutes}`);
        const sunriseTime = new Date(sunrise * 1000);
        const sunriseHours = sunriseTime.getUTCHours();
        const sunriseMinutes = sunriseTime.getUTCMinutes();
        const utcSunrise = new Date(sunriseTime.toUTCString().slice(0, -4));
        console.log(utcSunrise);
        /*console.log(
          `Sunrise Time in ${city}: (${sunriseHours}:${sunriseMinutes})`
        );*/
        const sunsetTime = new Date(sunset * 1000);
        const utcSunset = new Date(sunsetTime.toUTCString().slice(0, -4));
        console.log(utcSunset);
        const sunsetHours = sunsetTime.getUTCHours();
        const sunsetMinutes = sunsetTime.getUTCMinutes();
        console.log(utcCurrentDate < utcSunset);

        if (utcCurrentDate >= utcSunrise && utcCurrentDate <= utcSunset) {
          // Day Pictures
          if (data.weather[0].main === "Clear") {
            setTitleColor("#000");
            if (data.main.temp >= 38) {
              setBackground(hotWeather.src);
            } else {
              setBackground(clearDay.src);
            }
          } else if (data.main.temp <= 0) {
            setBackground(snowyDay.src);
          } else if (data.weather[0].main === "Clouds" && data.main.temp > 0) {
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
            if (data.main.temp >= 40) {
              setBackground(hotNight.src);
            } else {
              setBackground(clearNight.src);
            }
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
          } else if (data.weather[0].main === "Clouds" && data.main.temp > 0) {
            setTitleColor("#FFF");
            setBackground(cloudyNight.src);
          } else if (data.weather[0].main === "Dust") {
            setTitleColor("#FFF");
            setBackground(dustNight.src);
          } else if (data.weather[0].main === "Snow" || data.main.temp <= 0) {
            setTitleColor("#FFF");
            setBackground(snowyNight.src);
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
              maxAge: 15 * 60 * 1000, // 15 minutes cache
              exclude: { query: false },
            },
          }
        );

        const weatherRequest = await http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.WEATHER_API_KEY}`,
          {
            cache: {
              maxAge: 15 * 60 * 1000, // 15 minutes cache
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
            setDateYMD(timeResponse.data.date_time_ymd);
            setTime12Format(timeResponse.data.time_12.substring(0, 5));
            /*             console.log(time12Format); */
            setAmPm(timeResponse.data.time_12.substring(9));
            /*             console.log(amPm); */
            setWeather(weatherResponse.data);
            changeBackground(
              weatherResponse.data.sys.sunrise,
              weatherResponse.data.sys.sunset,
              weatherResponse.data,
              dateYMD
            );
            /*             console.log(city);
            console.log("-------------"); */
            setError(false);
            setLoading(false);
          })
        );
      } catch (error) {
        if (error.request.status === 404) {
          console.clear();
          console.log("🌏 Please type the correct city name");
          setError(true);
          setErrorMessage("Wrong city/country!");
          setLoading(false);
        } else {
          console.clear();
          console.log("🌏 Error!");
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
          display: "flex",
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
        <Heading
          className="app-title"
          color={titleColor}
          textAlign={isLargerThan900 ? "left" : "center"}
          padding={!isLargerThan900 ? "1.5rem 0rem" : "1.5rem 2.5rem"}
          width="100%"
          position="absolute"
          fontSize={["1.5rem", "2rem", "2.5rem"]}
          fontWeight={300}
        >
          WythrCast
        </Heading>
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
            error={error}
            setError={setError}
            setCity={setCity}
            errorMessage={errorMessage}
            theme={theme}
            isLargerThan900={isLargerThan900}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let ip;

  const { req } = context;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  const cityRequest = await axios.get(
    `http://ip-api.com/json/${ip}?fields=status,message,country,city,lat,lon,query,timezone`
  );
  const defaultCity = cityRequest.data.city;

  const timeRequest = await axios.get(
    `https://api.ipgeolocation.io/timezone?apiKey=${process.env.TIMEZONE_API_KEY}&location=${defaultCity}`,
    {
      cache: {
        maxAge: 15 * 60 * 1000, // 15 minutes cache
        exclude: { query: false },
      },
    }
  );

  const date_ymd = timeRequest.data.date_time_ymd;

  return {
    props: {
      ip,
      defaultCity,
      date_ymd,
    },
  };
}
