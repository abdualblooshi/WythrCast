const Error = () => (
  <div
    className="error"
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
    <h1 className="title" style={{ color: "#F00" }}>
      Failed to load data!
    </h1>
  </div>
);

export default Error;
