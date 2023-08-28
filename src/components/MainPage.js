import React, { useState, useEffect } from "react";
import pfp from "../images/ayanokoji.jpg";
import logo from "../images/logo.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
  const API_URL =
    "https://oif3ocmqbh.execute-api.ca-central-1.amazonaws.com/prod/user/log";

  const STAT_URL =
    "https://oif3ocmqbh.execute-api.ca-central-1.amazonaws.com/prod/user";

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
  const [expiredMessage, setExpiredMessage] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "TimeCreated", // Key for sorting
    direction: "desc",
  });
  const lightColors = ["#96B6C5", "#A0C49D", "#A9907E"];
  const darkColors = ["#614BC3", "#678983", "#352F44"];
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: theme === "light" ? lightColors : darkColors,
        borderColor: ["black"],
        color: ["white"],
        borderWidth: 0,
      },
    ],
  });

  const [totalMinutesStudied, setTotalMinutesStudied] = useState(0);
  const [numDays, setNumDays] = useState(0);

  const averageMinutesPerDay = totalMinutesStudied / (numDays || 1);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const accessToken = Cookies.get("accessToken");

  const [responseData, setResponseData] = useState([]);

  // Calculate the total time spent on each subject
  const calculateTimeSpentPerSubject = () => {
    const subjectMap = new Map();

    logs.forEach((log) => {
      if (!subjectMap.has(log.Subject)) {
        subjectMap.set(log.Subject, log.Duration);
      } else {
        subjectMap.set(log.Subject, subjectMap.get(log.Subject) + log.Duration);
      }
    });

    return subjectMap;
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        const fetchedLogs =
          response.data.map((item) => ({
            Subject: item.Subject,
            Duration: parseInt(item.Duration),
            TimeCreated: parseInt(item.TimeCreated), // Keep it as a Unix timestamp
            Description: item.Description,
          })) || [];

        setLogs(fetchedLogs);

        // Calculate total minutes studied
        let totalMinutes = 0;
        fetchedLogs.forEach((log) => {
          totalMinutes += log.Duration;
        });
        setTotalMinutesStudied(totalMinutes);

        // Calculate the number of days
        const startTimestamp =
          logs.length > 0 ? logs[logs.length - 1].TimeCreated : Date.now();
        const endTimestamp = Date.now();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const days = Math.ceil(
          (endTimestamp - startTimestamp) / millisecondsPerDay
        );
        setNumDays(days);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === "The incoming token has expired"
        ) {
          setExpiredMessage(
            "Your session has timed out. Redirecting to login page..."
          );
          setTimeout(() => {
            window.location.href =
              "https://strack1.auth.ca-central-1.amazoncognito.com/login?client_id=gpm3id372kcq7o79l6roja1gc&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmachi121.github.io%2Fstracker%2Fauth-callback";
          }, 3000);
        } else {
          console.error("Error fetching logs:", error);
        }
      });
  };

  const generateStreakData = (logs) => {
    // Generate your streak data array based on logs
    // For simplicity, I'm assuming the logs have a "TimeCreated" property as Unix timestamps
    const streakData = []; // Array of objects, each representing a day

    // Calculate the start and end dates for the streak heatmap
    const startDate = new Date(new Date().setMonth(new Date().getMonth() - 6)); // Assuming a 6-month streak period
    const endDate = new Date();

    // Loop through each day and determine if it's active or not
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const activeDay = logs.some((log) => {
        const logDate = new Date(log.TimeCreated);
        return logDate.toDateString() === date.toDateString();
      });
      streakData.push({ date, count: activeDay ? 1 : null });
    }

    return streakData;
  };

  const handleAddLog = () => {
    if (!newLog.Subject || !newLog.Duration || !newLog.Description) {
      // Prevent adding empty log
      return;
    }

    const newLogToAdd = {
      Subject: newLog.Subject,
      Duration: newLog.Duration,
      Description: newLog.Description,
    };

    axios
      .post(API_URL, newLogToAdd, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(() => {
        fetchLogs(); // Fetch logs again after successful addition
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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedLogs = logs.slice().sort((a, b) => {
    if (sortConfig.key === "Duration") {
      const aValue = parseInt(a[sortConfig.key]);
      const bValue = parseInt(b[sortConfig.key]);
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    } else if (sortConfig.key === "TimeCreated") {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    } else {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  /*
  // Stats API
  useEffect(() => {
    axios
      .get(STAT_URL, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        const parsedData =
          response.data.map((item) => ({
            Subject: item.Object,
            Minutes: item.SubjectMinutes,
          })) || [];

        const labels = parsedData.map((data) => data.Subject);
        const dataPoints = parsedData.map((data) => data.Minutes);

        console.log("Labels:", labels);
        console.log("Data Points:", dataPoints);

        setData({
          labels: labels,
          datasets: [
            {
              data: dataPoints,
              backgroundColor: theme === "light" ? lightColors : darkColors,
              borderColor: ["black"],
              color: ["white"],
              borderWidth: 0,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching STATS", error);
      });
  }, [accessToken, theme]);

  const total_data = {
    labels: ["Total Hours"],
    datasets: [
      {
        label: "Poll",
        data: [1223], // Placeholder data
        backgroundColor: theme === "light" ? lightColors : darkColors,
        borderColor: ["black"],
        color: ["white"],
      },
    ],
  };

  */

  const options = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0, // Set the border width to 0 to remove outlines
      },
    },
  };

  const [error, setError] = useState(null);

  // Calculate data for the pie chart
  const getPieChartData = () => {
    const timeSpentPerSubject = calculateTimeSpentPerSubject();
    const labels = Array.from(timeSpentPerSubject.keys());
    const dataPoints = Array.from(timeSpentPerSubject.values());

    return {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          backgroundColor: theme === "light" ? lightColors : darkColors,
          borderColor: ["black"],
          color: ["white"],
          borderWidth: 0,
        },
      ],
    };
  };

  return (
    <div className={`main ${theme}`}>
      {expiredMessage && <p>{expiredMessage}</p>}

      {/* Logo section */}
      <div className="logo-section">
        <img src={logo} alt="Website Logo" className="website-logo" />
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-picture">
            <img src={profilePicture} alt="Profile" />
          </div>

          {/* Profile details */}
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

          {/* User Stats */}
          <div className="user-stats">
            <div className="stats">
              <div className="pie-graph">
                <Pie data={getPieChartData()} options={options} width={200} />
              </div>

              {/* Total Minutes Studied */}
              <div className="total-minutes-section">
                <h2>Total Minutes Studied</h2>
                <p>{totalMinutesStudied} minutes</p>
              </div>

              {/* Display the average hours per day */}
              <div className="total-minutes-section">
                <h2>Average Minutes Per Day</h2>
                <p>{averageMinutesPerDay.toFixed(2)} minutes</p>
              </div>
              {/* Streak Heatmap */}
              <div className="streak-heatmap">
                <h2>Activity Streak</h2>
                <CalendarHeatmap
                  startDate={new Date().setMonth(new Date().getMonth() - 6)} // Assuming a 6-month streak period
                  endDate={new Date()}
                  values={generateStreakData(logs)} // Pass the generated streak data array
                  showOutOfRangeDays={false}
                  classForValue={(value) => {
                    if (!value) {
                      return "color-empty";
                    }
                    return `color-scale-${value.count}`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log table */}
      <div className="log-table">
        <h1 className="log-heading">Your Logs</h1>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("Subject")}>
                Subject{" "}
                {sortConfig.key === "Subject" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("Duration")}>
                Duration (minutes){" "}
                {sortConfig.key === "Duration" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("Description")}>
                Description{" "}
                {sortConfig.key === "Description" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("TimeCreated")}>
                Time Created{" "}
                {sortConfig.key === "TimeCreated" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.Subject}</td>
                <td>{log.Duration}</td>
                <td>{log.Description}</td>
                <td>{new Date(log.TimeCreated).toLocaleString()}</td>
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
                    const newDuration = Math.max(0, parseInt(e.target.value));
                    setNewLog({ ...newLog, Duration: newDuration });
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newLog.Description}
                  onChange={(e) =>
                    setNewLog({ ...newLog, Description: e.target.value })
                  }
                />
              </td>
              <td></td>
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
