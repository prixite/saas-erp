import { Suspense, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Routes from "@src/components/hoc/AppRoutes";
import baseTheme from "@src/theme/base-theme";

const loading = <span>Loading....</span>;

const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <Suspense fallback={loading}>
        <ThemeProvider theme={baseTheme}>
          <Routes />
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
