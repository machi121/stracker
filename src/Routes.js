import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthCallbackPage from "./components/AuthCallbackPage";

// Create a component for redirection
const RedirectToLogin = () => {
  // window.location.href = "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-callback";
  window.location.href = "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmachi121.github.io%2Fstracker%2Fauth-callback";
  return null; // This component doesn't render anything
};

export const Routez = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/main" element={<MainPage />} />
        {/* Redirect from root */}
        <Route path="/" element={<RedirectToLogin />} />
      </Routes>
    </Router>
  );
};
