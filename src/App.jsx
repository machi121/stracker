import React, { useState } from 'react';
import './App.css';
import pfp from './images/ayanokoji.jpg';
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import {Pie} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const App = () => {
  const [theme, setTheme] = useState('light');
  const [profilePicture, setProfilePicture] = useState(pfp);
  const [name, setName] = useState('綾小路 清隆');
  const [username, setUsername] = useState('ayanokoji.kiyotaka');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(17);
  const [grade, setGrade] = useState('2年生');
  const [school, setSchool] = useState('東京都高度育成高等学校');
  const [location, setLocation] = useState('Tokyo, Japan');
  const [bio, setBio] = useState('Everyone is just a tool to me.');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const data = {
    labels: ['Subject#1',"Subject#2","Subject#3"],
    datasets:[{
        // label:'Poll',
        data: [3,6,8],
        backgroundColor:["#A2678A","#102C57","#3D246C"],
        borderColor:["black"],
        Color:["white"]

    }]
  }
  const options = {
    responsive: true

    

  }

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
              <i className="fas fa-user"></i> <span>{gender}, {age} years old</span>
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
        <div className='stats'>
          <div className="pie-graph">
            <Pie
              data={data}
              options={options}
              width={200} // Adjust the width to your preference
            />
          </div>
          <div className="other-stats">
            <h2>Total Hours: 102hr</h2>
            <h2>Average per day 13.3hr/day</h2>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default App;