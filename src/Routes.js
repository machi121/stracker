import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

export const Routez = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<RedirectToLogin />} />
      </Routes>
    </Router>
  );
};

const RedirectToLogin = () => {
  // Implement the redirect logic directly
  window.location.href = "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-callback";
  return null;
};
