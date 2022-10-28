import allComponents from "@src/components/components";
import ProtectedRoute from "@src/components/hoc/ProtectedRoutes";
import { objectToArray } from "@src/helpers/utils/utils";
import ROUTES from "@src/routes";

const AppRoutes = () => {
  return (
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
  );
};
export default AppRoutes;
