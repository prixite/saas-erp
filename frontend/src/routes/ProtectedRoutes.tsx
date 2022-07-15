import { useState } from "react";
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
            <Route path={path} element={<MatchComponent />} />
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
