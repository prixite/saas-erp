import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

export default baseTheme;
