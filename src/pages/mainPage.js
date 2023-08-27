import React, { useState } from "react";
// import "./App.css";
import pfp from "../images/ayanokoji.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
// import {Routez} from "./Routes"

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
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
  const [subjectOptions, setSubjectOptions] = useState(["Math", "English", "Physics"]);

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
        borderWidth: 0,
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

  const [logs, setLogs] = useState([
    {
      subject: "Math",
      duration: 45,
      timeCreated: 1673523628000,
      object: "Log",
      description: "Studied chapter 3",
    },
    {
      subject: "Physics",
      duration: 60,
      timeCreated: 1673523688000,
      object: "Log",
      description: "Practice problems",
    },
    // Add more log entries as needed
  ]);

  const initialLog = {
    subject: "",
    duration: "",
    timeCreated: new Date().getTime(),
    description: "",
    customSubject: "",
  };

  const [newLog, setNewLog] = useState({ ...initialLog });

  const handleAddLog = () => {
    if (newLog.subject === "custom" && newLog.customSubject) {
      setLogs([
        ...logs,
        {
          ...newLog,
          subject: newLog.customSubject,
          customSubject: undefined, // Reset custom subject
        },
      ]);
    } else {
      setLogs([...logs, newLog]);
    }
    setNewLog({ ...initialLog });
  }
  
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

      {/* Logs Code */}

      <div className="log-table">
        <h1 className="log-heading">Your Logs</h1> {/* Added heading */}
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Duration (minutes)</th>
              <th>Time Created</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.subject}</td>
                <td>{log.duration}</td>
                <td>{new Date(log.timeCreated).toLocaleString()}</td>
                <td>{log.description}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  list="subjectOptions"
                  value={newLog.subject}
                  onChange={(e) =>
                    setNewLog({ ...newLog, subject: e.target.value })
                  }
                  onBlur={() => {
                    if (!subjectOptions.includes(newLog.subject)) {
                      setSubjectOptions([...subjectOptions, newLog.subject]);
                    }
                  }}
                />
                <datalist id="subjectOptions">
                  {subjectOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  type="number"
                  value={newLog.duration}
                  onChange={(e) => {
                    const newDuration = Math.max(0, e.target.value); // Ensure the value is not below 0
                    setNewLog({ ...newLog, duration: newDuration });
                  }}
                />
              </td>
              <td>{new Date(newLog.timeCreated).toLocaleString()}</td>
              <td>
                <input
                  type="text"
                  value={newLog.description}
                  onChange={(e) =>
                    setNewLog({ ...newLog, description: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="log-actions"></div>
        <button className="add-log-button" onClick={handleAddLog}>
          Add Log
        </button>
      </div>
    </div>
  );
};

export default MainPage;
