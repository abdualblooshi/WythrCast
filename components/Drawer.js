export default function Drawer() {
  return (
    <div
      className="drawer-container"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5.7px)",
        webkitBackdropFilter: "blur(5.7px)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "25vw",
        color: "#000",
        borderTopLeftRadius: "2.5rem",
        borderBottomLeftRadius: "2.5rem",
      }}
    >
      <div
        className="drawer"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Drawer</h1>
      </div>
    </div>
  );
}
