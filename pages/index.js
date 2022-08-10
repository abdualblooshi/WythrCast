import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WythrCast</title>
        <meta
          name="description"
          content="A weather application created by Abdulrahman Alblooshi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
