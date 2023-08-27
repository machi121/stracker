import React, { useState } from "react";
import "./App.css";
import pfp from "./images/ayanokoji.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const [theme, setTheme] = useState("light");
  const [profilePicture, setProfilePicture] = useState(pfp);
  const [name, setName] = useState("綾小路 清隆");
  const [username, setUsername] = useState("ayanokoji.kiyotaka");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(17);
  const [grade, setGrade] = useState("2年生");
  const [school, setSchool] = useState("東京都高度育成高等学校");
  const [location, setLocation] = useState("Tokyo, Japan");
  const [bio, setBio] = useState("Everyone is just a tool to me.");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const lightColors = ["#96B6C5", "#A0C49D", "#A9907E"];
  const darkColors = ["#614BC3", "#678983", "#352F44"];

  const data = {
    labels: ["Subject#1", "Subject#2", "Subject#3"],
    datasets: [
      {
        label: "Poll",
        data: [3, 6, 8],
        backgroundColor: theme === "light" ? lightColors : darkColors,
        borderColor: ["black"],
        color: ["white"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0, // Set the border width to 0 to remove outlines
      },
    },
  };

  const total_data = {
    labels: ["Total Hours", "Average Hours"],
    datasets: [
      {
        label: "Poll",
        data: [120.4, 93],
        backgroundColor: theme === "light" ? lightColors : darkColors,
        borderColor: ["black"],
        color: ["white"],
      },
    ],
  };

  return (
    <div className={`main ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>

      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-picture">
            <img src={profilePicture} alt="Profile" />
          </div>
          <div className="profile-details">
            <div className="name">{name}</div>
            <div className="username">@{username}</div>
            <div className="detail">
              <i className="fas fa-user"></i>{" "}
              <span>
                {gender}, {age} years old
              </span>
            </div>
            <div className="detail">
              <i className="fas fa-graduation-cap"></i> <span>{grade}</span>
            </div>
            <div className="detail">
              <i className="fas fa-school"></i> <span>{school}</span>
            </div>
            <div className="detail">
              <i className="fas fa-map-marker-alt"></i> <span>{location}</span>
            </div>
            <div className="bio">
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Code */}

      <div className="stats-section">
        <h1>User Stats</h1>
        <div className="stats">
          <div className="pie-graph">
            <Pie
              data={data}
              options={options}
              width={200} // Adjust the width to your preference
            />
          </div>
          <div className="other-stats">
            <Doughnut data={total_data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
