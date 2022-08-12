import ReactLoading from "react-loading";

const Loading = () => (
  <div
    className="loading"
    style={{
      position: "absolute",
      display: "flex",
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <ReactLoading type={"spin"} color={"#000"} height={75} width={75} />
    <h1 className="title" style={{ color: "#000" }}>
      Please wait...
    </h1>
  </div>
);

export default Loading;
