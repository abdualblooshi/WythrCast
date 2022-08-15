import {
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function Drawer({
  city,
  error,
  setCity,
  errorMessage,
  isLoading,
}) {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <>
      <div
        className="drawer-container glass-light"
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "23vw",
          color: "#000",
          borderRadius: "1rem",
        }}
      >
        <div
          className="drawer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "2rem 4rem",
            gap: "1rem",
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
                icon={<SearchIcon color={error ? "#F00" : "#000"} />}
                variant="ghost"
                onClick={(e) => {
                  setCity(currentValue);
                }}
              />
            </InputLeftElement>
            <Input
              placeholder="Search for a city/country"
              color={error ? "#F00" : "#000"}
              variant="flushed"
              fontSize="1.5rem"
              _placeholder={error ? { color: "#F00" } : { color: "#555" }}
              _outline={{ color: "#000" }}
              _focusVisible={{
                outline: "none",
              }}
              onChange={(e) => setCurrentValue(e.currentTarget.value)}
              _underline={{ color: "#000" }}
              width="fit-content"
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
              }}
              display={
                currentValue === "" || currentValue === null ? "none" : "flex"
              }
              alignItems="center"
              justifyContent="center"
            >
              <CloseIcon color="#000" />
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </>
  );
}
