import { createTheme } from "@mui/material/styles";

const GLOBAL_RED = "#FF2F2F";
const GLOBAL_LIGHT_RED = "#ffcdcd3b";
const GLOBAL_BLACK = "#000000";
const GLOBAL_WHITE = "#FFFFFF";
const GLOBAL_GRAY = "#6C6C6C";
const GLOBAL_GRAY_LIGHT = "#AAAAAA";
// const GLOBAL_GRAY_CONTRAST = "#BEBEBE";

const baseTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: GLOBAL_RED,
      light: GLOBAL_LIGHT_RED,
      dark: GLOBAL_BLACK,
      contrastText: GLOBAL_WHITE,
    },
    secondary: {
      main: GLOBAL_BLACK,
      light: GLOBAL_GRAY,
      contrastText: GLOBAL_GRAY_LIGHT,
    },
    // /********* comment for future use ********/
    // warning: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // info: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // error: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // success: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
  },
  typography: {
    fontFamily: "",
    fontSize: 14,
    h1: {
      fontFamily: "",
      fontSize: 22,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "",
      fontSize: 18,
      fontWeight: 700,
    },
    h3: {
      fontFamily: "",
      fontSize: 16,
      fontWeight: 700,
    },
    h4: {
      fontFamily: "",
      fontSize: 14,
      fontWeight: 700,
    },
    h5: {
      fontFamily: "",
      fontSize: 14,
      fontWeight: 700,
    },
    h6: {
      fontFamily: "",
      fontSize: 14,
      fontWeight: 700,
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {
      fontFamily: "",
      fontSize: "16px",
      fontWeight: 400,
      color: GLOBAL_WHITE,
    },
  },
});

export default baseTheme;
