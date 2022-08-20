import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif`,
  },
  heading: {
    fontWeight: 400,
  }
});

export default theme;
