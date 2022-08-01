import { BrowserRouter } from "react-router-dom";
import allComponents from "@src/components";
import ROUTES from "@src/constants/routes";
import ProtectedRoute from "@src/routes/ProtectedRoutes";
import { objectToArray } from "@src/utils/objectToArray";

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
