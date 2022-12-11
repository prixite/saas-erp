import { Suspense, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import AppRoutes from "@src/components/hoc/AppRoutes";
import baseTheme from "@src/theme/base-theme";
import "react-toastify/dist/ReactToastify.css";

const loading = <span>Loading....</span>;

const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <ToastContainer />
      <Suspense fallback={loading}>
        <ThemeProvider theme={baseTheme}>
          <AppRoutes />
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
