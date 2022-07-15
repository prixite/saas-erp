import { BrowserRouter } from "react-router-dom";
import Components from "../components";
import ROUTES from "../constants/routes";
import ProtectedRoute from "../routes/ProtectedRoutes";
import { objectToArray } from "../utils/objectToArray";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <>
        {objectToArray(ROUTES).map(({ name, path, Component }) => {
          return (
            <ProtectedRoute
              key={name}
              path={path}
              MatchComponent={Components[Component]}
            />
          );
        })}
      </>
    </BrowserRouter>
  );
};
export default AppRoutes;
