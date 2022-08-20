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
  Boxider,
  Skeleton,
  SkeletonText,
  Heading,
  Box,
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
  isLargerThan900,
}) {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <Box
      className="weather-app"
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      padding={isLargerThan900 ? "1vh 2vw" : "8vh 2vw"}
    >
      <Box
        className={`weather-data glass-${theme}`}
        width={isLargerThan900 ? "52.5rem" : "95%"}
        marginY="2.5vh"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1vh",
          maxWidth: "80rem",
          minHeight: "10rem",
          borderRadius: "1.5rem",
          padding: "1vh 2vw",
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
            fontSize={isLargerThan900 ? "1.5rem" : "100%"}
            _placeholder={error ? { color: "#F00" } : { color: "#444" }}
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
        <Box
          className="weather-data-container"
          display="flex"
          flexDirection={isLargerThan900 ? "row" : "column"}
          alignItems="center"
          justifyContent="center"
          gap={["1.25rem", "2rem"]}
          width="100%"
          padding="1rem 2rem"
        >
          <Box
            className="city-details"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heading
              as="h1"
              className="temp"
              fontWeight="400"
              fontSize={isLargerThan900 ? "4rem" : "2.85rem"}
            >
              {weather == undefined || weather == null || isLoading ? (
                <SkeletonText
                  width={isLargerThan900 ? "25.5rem" : "50vh"}
                  startColor="#333"
                  endColor="#000"
                />
              ) : (
                `${Math.round(weather.main.temp)}°C`
              )}
            </Heading>
          </Box>
          <Box
            className="condition-city"
            display="flex"
            flexDirection="row"
            gap="10.25%"
            alignItems="flex-end"
            justifyContent="space-evenly"
            width="100%"
          >
            <Box
              className="city-details"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heading
                className="city-name"
                fontSize={isLargerThan900 ? "2.5rem" : "2rem"}
              >
                {weather == undefined || weather == null || isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : weather.name.includes(" ") && weather.name.length >= 10 ? (
                  weather.name
                    .split(/\s/)
                    .reduce(
                      (response, word) => (response += word.slice(0, 1)),
                      ""
                    ).split(/[a-z]/)
                ) : (
                  weather.name
                )}
              </Heading>
              <Heading
                className="datetime"
                fontSize={isLargerThan900 ? "1.2rem" : "0.85rem"}
              >
                {weather == undefined || weather == null || isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  `${time} - ${date}`
                )}
              </Heading>
            </Box>
            <Box
              className="city-details"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {weather == undefined || weather == null || isLoading ? (
                <Skeleton
                  startColor="#333"
                  endColor="#000"
                  width="50%"
                  height="1vh"
                />
              ) : (
                <Image
                  className="condition-icon"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  width={isLargerThan900 ? "55rem" : "35rem"}
                  height={isLargerThan900 ? "55rem" : "35rem"}
                  alt="Weather Condition"
                />
              )}
              <Heading
                className="condition-text"
                fontSize={"1.25rem"}
                fontWeight="400"
              >
                {weather == undefined || weather == null || isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  weather.weather[0].main
                )}
              </Heading>
            </Box>
          </Box>
          <Box
            className="weather-data"
            display="flex"
            gap="1rem"
            width="100%"
            justifyContent="center"
            flexDirection={isLargerThan900 ? "column" : "row"}
          >
            <Box
              className="clouds"
              display="flex"
              alignContent="flex-end"
              justifyContent={
                isLargerThan900 ? "space-between" : "space-evenly"
              }
              alignItems="center"
              gap="1rem"
              width="100%"
              fontWeight={400}
            >
              <Heading
                as="h2"
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#444",
                }}
              >
                Clouds
              </Heading>
              <Heading
                as="h3"
                textAlign="center"
                fontSize={["0.85rem", "1rem"]}
              >
                {isLoading ? (
                  <Skeleton
                    startColor="#222"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  `${weather.clouds.all}%`
                )}
              </Heading>
            </Box>
            <Box
              className="humditity"
              display="flex"
              alignContent="flex-end"
              justifyContent={
                isLargerThan900 ? "space-between" : "space-evenly"
              }
              alignItems="center"
              gap="1rem"
              width="100%"
              fontWeight={400}
            >
              <Heading
                as="h2"
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#444",
                }}
              >
                Humidity
              </Heading>
              <Heading
                as="h3"
                textAlign="center"
                fontSize={["0.85rem", "1rem"]}
              >
                {isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  `${weather.main.humidity}%`
                )}
              </Heading>
            </Box>
          </Box>
          <Box
            className="weather-data"
            display="flex"
            gap="1rem"
            width="100%"
            justifyContent="center"
            flexDirection={isLargerThan900 ? "column" : "row"}
          >
            <Box
              className="wind"
              display="flex"
              alignContent="flex-end"
              justifyContent={
                isLargerThan900 ? "space-between" : "space-evenly"
              }
              alignItems="center"
              gap="1rem"
              width="100%"
              fontWeight={400}
            >
              <Heading
                as="h2"
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#444",
                }}
              >
                Wind
              </Heading>
              <Heading
                as="h3"
                textAlign="center"
                fontSize={["0.85rem", "1rem"]}
              >
                {isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  `${Math.round(weather.wind.speed)}km/h`
                )}
              </Heading>
            </Box>
            <Box
              className="visibility"
              display="flex"
              alignContent="flex-end"
              justifyContent={
                isLargerThan900 ? "space-between" : "space-evenly"
              }
              alignItems="center"
              gap="1rem"
              width="100%"
              fontWeight={400}
            >
              <Heading
                as="h2"
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  color: "#444",
                }}
              >
                Visiblity
              </Heading>
              <Heading
                as="h3"
                textAlign="center"
                fontSize={["0.85rem", "1rem"]}
              >
                {isLoading ? (
                  <Skeleton
                    startColor="#333"
                    endColor="#000"
                    width="50%"
                    height="1vh"
                  />
                ) : (
                  `${Math.round(weather.visibility / 1000)}km`
                )}
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
