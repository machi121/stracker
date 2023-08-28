import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import pfp from "./images/ayanokoji.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import AuthCallbackPage from "./components/AuthCallbackPage";
import { Routez } from "./Routes";

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  return (
    <div className={`main`}>
      <Routez />
    </div>
  );
};

export default App;
