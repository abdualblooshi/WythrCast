import Image from "next/image";

export default function Weather() {
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
        className="weather-data"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          marginLeft: "3rem",
          gap: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.7px)",
          webkitBackdropFilter: "blur(5.7px)",
          width: "50vh",
          height: "19vh",
          borderRadius: "2.5rem",
          color: "#000",
        }}
      >
        <h1
          className="temp"
          style={{
            fontSize: "6rem",
            fontWeight: 400,
          }}
        >
          16&#176;
        </h1>
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
            London
          </span>
          <span
            className="datetime"
            style={{
              fontSize: "1.2rem",
            }}
          >
            06:09 - {new Date().toLocaleDateString()}
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
          <img
            className="condition-icon"
            src="http://openweathermap.org/img/wn/50d@4x.png"
            style={{
              width: "3.5rem",
            }}
          />
          <span
            className="condition-text"
            style={{
              fontSize: "1.25rem",
            }}
          >
            Cloudy
          </span>
        </div>
      </div>
    </div>
  );
}
