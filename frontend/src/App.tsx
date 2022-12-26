import { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
import AppRoutes from "@src/components/hoc/AppRoutes";
import baseTheme from "@src/theme/base-theme";
import "react-toastify/dist/ReactToastify.css";

const loading = <span>Loading....</span>;

window.Buffer = Buffer;

const App = () => {
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
