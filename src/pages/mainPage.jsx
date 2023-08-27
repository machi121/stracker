import React, { useState, useEffect } from "react";
import pfp from "../images/ayanokoji.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
  const API_URL =
    "https://oif3ocmqbh.execute-api.ca-central-1.amazonaws.com/prod/user/log";

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
  const [SubjectOptions, setSubjectOptions] = useState([
    "Math",
    "English",
    "Physics",
  ]);
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    Subject: "",
    Duration: "", // Initialize with a default value
    Description: "",
  });

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        console.log("API Response Data:", response.data); // Log the response to inspect its structure

        const fetchedLogs =
          response.data.map((item) => ({
            Subject: item.Subject,
            Duration: item.Duration,
            TimeCreated: item.TimeCreated,
            Description: item.Description,
          })) || [];

        console.log("Parsed Logs:", fetchedLogs);
        setLogs(fetchedLogs);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, [accessToken]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const lightColors = ["#96B6C5", "#A0C49D", "#A9907E"];
  const darkColors = ["#614BC3", "#678983", "#352F44"];

  const data = {
    labels: SubjectOptions,
    datasets: [
      {
        label: "Poll",
        data: [3, 6, 8], // Placeholder data
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

  const total_data = {
    labels: ["Total Hours", "Average Hours"],
    datasets: [
      {
        label: "Poll",
        data: [120.4, 93], // Placeholder data
        backgroundColor: theme === "light" ? lightColors : darkColors,
        borderColor: ["black"],
        color: ["white"],
      },
    ],
  };

  const [error, setError] = useState(null);

  const handleAddLog = () => {
    if (!newLog.Subject || !newLog.Duration || !newLog.Description) {
      // Prevent adding empty log
      return;
    }
  
    const newLogToAdd = {
      Subject: newLog.Subject,
      Duration: newLog.Duration,
      TimeCreated: new Date().toISOString(),
      Description: newLog.Description,
    };
  
    axios
      .post(API_URL, newLogToAdd, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const addedLog = {
          Subject: newLog.Subject, // Use newLog.Subject instead of response.data.Subject
          Duration: newLog.Duration,
          TimeCreated: response.data.TimeCreated, // Use new Date().toISOString() for consistency
          Description: newLog.Description,
        };
        setLogs((prevLogs) => [...prevLogs, addedLog]); // Update logs state with the new log
  
        // Reset the newLog state after successful addition
        setNewLog({
          Subject: "",
          Duration: "",
          Description: "",
        });
      })
      .catch((error) => {
        console.error("Error adding log:", error);
        setError("Error adding log. Please try again later.");
      });
  };
  

  return (
    <div className={`main ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>

      <div className="profile-section">
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
                <i className="fas fa-map-marker-alt"></i>{" "}
                <span>{location}</span>
              </div>
              <div className="bio">
                <p>{bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div className="log-table">
        <h1 className="log-heading">Your Logs</h1>
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
            {logs.map((log) => (
              <tr key={log.TimeCreated}>
                <td>{log.Subject}</td>
                <td>{log.Duration}</td>
                <td>{new Date(log.TimeCreated).toLocaleString()}</td>
                <td>{log.Description}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  list="SubjectOptions"
                  value={newLog.Subject}
                  onChange={(e) =>
                    setNewLog((prevLog) => ({
                      ...prevLog,
                      Subject: e.target.value,
                    }))
                  }
                  onBlur={() => {
                    if (!SubjectOptions.includes(newLog.Subject)) {
                      setSubjectOptions([...SubjectOptions, newLog.Subject]);
                    }
                  }}
                />
                <datalist id="SubjectOptions">
                  {SubjectOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  type="number"
                  value={newLog.Duration}
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue)) {
                      const newDuration = Math.max(0, parsedValue);
                      setNewLog({ ...newLog, Duration: newDuration });
                    }
                  }}
                />
              </td>
              <td>{new Date(newLog.TimeCreated).toLocaleString()}</td>
              <td>
                <input
                  type="text"
                  value={newLog.Description}
                  onChange={(e) =>
                    setNewLog({ ...newLog, Description: e.target.value })
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
