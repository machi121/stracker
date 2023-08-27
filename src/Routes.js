import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { Fragment } from "react";
import MainPage from "./pages/mainPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

export const Routez = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route
            path="/login"
            element={
              <Navigate to="https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-callback" />
            }
          />
        </Routes>
      </Fragment>
    </Router>
  );
};
