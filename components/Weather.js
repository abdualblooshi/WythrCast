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
        className="weather-data glass-light"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          marginLeft: "3rem",
          gap: "2rem",
          width: "30rem",
          height: "10rem",
          borderRadius: "1rem",
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
            16&#176;
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
          <Image
            className="condition-icon"
            src="http://openweathermap.org/img/wn/11d@4x.png"
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
            Mist
          </span>
        </div>
      </div>
    </div>
  );
}
