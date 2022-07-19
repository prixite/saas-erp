import { Suspense } from "react";
import Routes from "./routes/AppRoutes";

const loading = <span>Loading....</span>;
const App = () => (
  <Suspense fallback={loading}>
    <Routes />
  </Suspense>
);
export default App;
