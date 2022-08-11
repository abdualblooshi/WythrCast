import { Input, InputLeftElement, InputGroup, Button } from "@chakra-ui/react";
import { MdBuild, MdSearch } from "react-icons/md";

export default function Drawer() {
  return (
    <>
      {" "}
      <div
        className="drawer-container glass-light"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "25vw",
          color: "#000",
          borderTopLeftRadius: "1rem",
          borderBottomLeftRadius: "1rem",
        }}
      >
        <div
          className="drawer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "2rem 4rem",
          }}
        >
          <h2>Drawer (WIP)</h2>
        </div>
      </div>
    </>
  );
}
