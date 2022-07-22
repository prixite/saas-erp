import { Suspense } from "react";
import Routes from "@src/routes/AppRoutes";
import baseTheme from "@src/theme/base-theme";
import { ThemeProvider } from "@mui/material/styles";

const loading = <span>Loading....</span>;
const App = () => (
  <Suspense fallback={loading}>
    <ThemeProvider theme={baseTheme}>
      <Routes />
    </ThemeProvider>
  </Suspense>
);
export default App;
