import { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface props {
  path: string;
  MatchComponent: string;
}

const ProtectedRoutes = ({ path, MatchComponent }: props) => {
  const [isLoggedIn] = useState(true);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route
              path={path}
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <MatchComponent />
                </Suspense>
              }
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
};

export default ProtectedRoutes;
