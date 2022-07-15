import { BrowserRouter } from "react-router-dom";
import allComponents from "../components";
import ROUTES from "../constants/routes";
import ProtectedRoute from "../routes/ProtectedRoutes";
import { objectToArray } from "../utils/objectToArray";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <>
        {objectToArray(ROUTES).map(({ name, path, component }) => {
          return (
            <ProtectedRoute
              key={name}
              path={path}
              MatchComponent={allComponents[component]}
            />
          );
        })}
      </>
    </BrowserRouter>
  );
};
export default AppRoutes;
