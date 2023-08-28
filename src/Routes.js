import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthCallbackPage from "./components/AuthCallbackPage";
import PageNotFound from "./components/PageNotFound";

export const Routez = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="*" element={<PageNotFound />} /> {/* Use the correct component name */}
      </Routes>
    </HashRouter>
  );
};

const RedirectToLogin = () => {
  // Implement the redirect logic directly

  // localhost
  /* window.location.href =
    "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-callback"; */

  // deployment
  window.location.href =
    "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmachi121.github.io%2Fstracker%2Fauth-callback";
  return null;
};

export default Routez;
