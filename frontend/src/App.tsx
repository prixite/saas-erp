import { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Routes from "@src/routes/AppRoutes";
import baseTheme from "@src/theme/base-theme";

const loading = <span>Loading....</span>;
const App = () => (
  <Suspense fallback={loading}>
    <ThemeProvider theme={baseTheme}>
      <Routes />
    </ThemeProvider>
  </Suspense>
);
export default App;
