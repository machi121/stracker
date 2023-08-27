import React, { useState } from "react";
import "./App.css";
import pfp from "./images/ayanokoji.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {Routez} from "./Routes"

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  return (
    <div className={`main`}>
      <Routez/>
    </div>
  );
};

export default App;
