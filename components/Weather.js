import Image from "next/image";

export default function Weather({ weather, time }) {
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
          height: "10rem",
          borderRadius: "1rem",
          padding: "1rem 2rem",
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
              fontSize: "6rem",
              fontWeight: 400,
            }}
          >
            {Math.round(weather.main.temp)}&#176;
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
            {weather.name}
          </span>
          <span
            className="datetime"
            style={{
              fontSize: "1.2rem",
            }}
          >
            {time.datetime.substring(10, 16)} -{" "}
            {new Date().toLocaleDateString()}
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
          <Image
            className="condition-icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            width="55px"
            height="55px"
            alt="Weather Condition"
          />
          <span
            className="condition-text"
            style={{
              fontSize: "1.25rem",
            }}
          >
            {weather.weather[0].main}
          </span>
        </div>
      </div>
    </div>
  );
}
