import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Buffer } from "buffer";
import AppRoutes from "@src/components/hoc/AppRoutes";
import baseTheme from "@src/theme/base-theme";
import { uploadImageToS3 } from "./helpers/utils/uploadImage";

const loading = <span>Loading....</span>;

window.Buffer = Buffer;
const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <Suspense fallback={loading}>
        <ThemeProvider theme={baseTheme}>
          <form>
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                return uploadImageToS3(e.target.files[0])
                  .then((data) => console.log("Data", data))
                  .catch((err) => console.log("Error", err));
              }}
            />
          </form>
          <AppRoutes />
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
