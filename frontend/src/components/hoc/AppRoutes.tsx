import { BrowserRouter } from "react-router-dom";
import allComponents from "@src/components/components";
import ProtectedRoute from "@src/components/hoc/ProtectedRoutes";
import { objectToArray } from "@src/helpers/utils/objectToArray";
import ROUTES from "@src/routes";

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
