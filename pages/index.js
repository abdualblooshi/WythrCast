import Head from "next/head";
import Weather from "../components/Weather";
import Drawer from "../components/Drawer";

/**
 * TODO:
 * Add a search bar to the drawer.
 * Create script to fetch current time in a country/city
 * Create script to fetch weather data of a country/city
 * */

// Image Imports

// Night Images
import clearNight from "../public/images/clear_night.jpg";

// Day Images
import cloudyDay from "../public/images/clouds.jpg";
import rainyDay from "../public/images/rain.jpg";
import snowyDay from "../public/images/snow.jpg";

export default function Home() {
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
          backgroundImage: `url(${cloudyDay.src})`,
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
          <Weather />
          <Drawer />
        </div>
      </div>
    </>
  );
}
