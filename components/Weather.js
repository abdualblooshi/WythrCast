import Image from "next/image";
import {
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  IconButton,
  Alert,
  AlertIcon,
  Button,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Weather({
  weather,
  time,
  date,
  isLoading,
  error,
  setCity,
  errorMessage,
  theme,
  setError,
}) {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <div
      className="weather-app"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <div
        className={`weather-data glass-${theme}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "5vh",
          gap: "1rem",
          width: "fit-content",
          maxWidth: "80rem",
          minHeight: "10rem",
          borderRadius: "1.5rem",
          padding: "1rem 2rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {error ? (
          <Alert status="error" borderRadius="0.75rem">
            {errorMessage}
          </Alert>
        ) : null}

        <InputGroup
          display="flex"
          alignItems="center"
          justifyContent="center"
          _focusVisible={{
            outline: "none",
          }}
          _error={{
            borderColor: "#ff0000",
          }}
          borderColor="#000"
        >
          <InputLeftElement color="gray.300">
            <IconButton
              icon={
                <SearchIcon
                  color={error ? "#F00" : theme === "light" ? "#000" : "#FFF"}
                />
              }
              variant="ghost"
              onClick={(e) => {
                setCity(currentValue);
              }}
            />
          </InputLeftElement>
          <Input
            placeholder="Search for a city/country"
            color={error ? "#F00" : theme === "light" ? "#000" : "#FFF"}
            _outline={{ color: "#F00" }}
            _underline={{ color: "#F00" }}
            variant="flushed"
            fontSize="1.5rem"
            _placeholder={error ? { color: "#F00" } : { color: "#555" }}
            _focusVisible={{
              outline: "none",
            }}
            onChange={(e) => setCurrentValue(e.currentTarget.value)}
            width="100%"
            value={currentValue}
            isInvalid={error}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setCity(currentValue);
              }
            }}
          />
          <InputRightElement
            onClick={(e) => {
              setCurrentValue("");
              setError(false);
            }}
            display={
              currentValue === "" || currentValue === null ? "none" : "flex"
            }
            alignItems="center"
            justifyContent="center"
          >
            <CloseIcon color={theme === "light" ? "#000" : "#FFF"} />
          </InputRightElement>
        </InputGroup>
        <div
          className="weather-data-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            width: "fit-content",
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
              {weather == undefined || weather == null || isLoading ? (
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
                fontSize: "2rem",
                fontWeight: "400",
              }}
            >
              {weather == undefined || weather == null || isLoading ? (
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
              {weather == undefined || weather == null || isLoading ? (
                <SkeletonText />
              ) : (
                `${time} - ${date}`
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
            {weather == undefined || weather == null || isLoading ? (
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
              {weather == undefined || weather == null || isLoading ? (
                <SkeletonText />
              ) : (
                weather.weather[0].main
              )}
            </span>
          </div>
          <div
            className="weather-data"
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="clouds"
              style={{
                display: "flex",
                alignContent: "flex-end",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                fontWeight: 400,
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#555",
                }}
              >
                Clouds
              </h2>
              <h3 style={{ textAlign: "center", fontSize: "1rem" }}>
                {isLoading ? (
                  <Skeleton height="1.5rem" />
                ) : (
                  `${weather.clouds.all}%`
                )}
              </h3>
            </div>
            <div
              className="humditity"
              style={{
                display: "flex",
                alignContent: "flex-end",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                fontWeight: 400,
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#555",
                }}
              >
                Humidity
              </h2>
              <h3 style={{ textAlign: "center", fontSize: "1rem" }}>
                {isLoading ? (
                  <Skeleton height="1.5rem" />
                ) : (
                  `${weather.main.humidity}%`
                )}
              </h3>
            </div>
          </div>
          <div
            className="weather-data"
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="wind"
              style={{
                display: "flex",
                alignContent: "flex-end",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                fontWeight: 400,
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#555",
                }}
              >
                Wind
              </h2>
              <h3 style={{ textAlign: "center", fontSize: "1rem" }}>
                {isLoading ? (
                  <Skeleton height="1.5rem" />
                ) : (
                  `${Math.round(weather.wind.speed)}km/h`
                )}
              </h3>
            </div>
            <div
              className="visibility"
              style={{
                display: "flex",
                alignContent: "flex-end",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                fontWeight: 400,
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#555",
                }}
              >
                Visiblity
              </h2>
              <h3 style={{ textAlign: "center", fontSize: "1rem" }}>
                {isLoading ? (
                  <Skeleton height="1.5rem" />
                ) : (
                  `${Math.round(weather.visibility / 1000)}km`
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
