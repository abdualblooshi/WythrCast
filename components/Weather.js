import Image from "next/image";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

export default function Weather({ weather, time }) {
  const convertUnixToHHMM = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 👇️ Format as hh:mm:ss
    const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;

    return time; // 👉️ 09:25
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div
      className="weather-app"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "75vw",
      }}
    >
      <div
        className="weather-data glass-light"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          marginLeft: "3rem",
          gap: "2rem",
          width: "fit-content",
          maxWidth: "80rem",
          minHeight: "10rem",
          borderRadius: "1.5rem",
          padding: "1rem 2rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <div
          className="city-details"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            className="temp"
            style={{
              fontSize: "5rem",
              fontWeight: 400,
              maxWidth: "27.5rem",
            }}
          >
            {weather == undefined || weather == null ? (
              <SkeletonText width="25.5rem" />
            ) : (
              `${Math.round(weather.main.temp)}°C`
            )}
          </h1>
        </div>

        <div
          className="city-details"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="city-name"
            style={{
              fontSize: "3rem",
              fontWeight: "400",
            }}
          >
            {weather == undefined || weather == null ? (
              <SkeletonText />
            ) : (
              weather.name
            )}
          </span>
          <span
            className="datetime"
            style={{
              fontSize: "1.2rem",
            }}
          >
            {weather == undefined || weather == null ? (
              <SkeletonText />
            ) : (
              `${convertUnixToHHMM(time)} - ${new Date().toLocaleDateString()}`
            )}
          </span>
        </div>
        <div
          className="city-details"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {weather == undefined || weather == null ? (
            <SkeletonText />
          ) : (
            <Image
              className="condition-icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              width="55px"
              height="55px"
              alt="Weather Condition"
            />
          )}
          <span
            className="condition-text"
            style={{
              fontSize: "1.25rem",
            }}
          >
            {weather == undefined || weather == null ? (
              <SkeletonText />
            ) : (
              weather.weather[0].main
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
