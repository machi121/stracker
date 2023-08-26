import "./App.css";



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


function App() {
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
    <>
      <div className="main">
    {/* Portfile Info Code */}










    {/* Stats Code */}

        <div className="stats-section">
            <h1>User Stats</h1>        
            <div className='stats'>
                
                <div className="pie-graph">
                    <Pie 
                    data = {data}
                    options = {options}>
                    </Pie>
                </div>
                <div className="other-stats">
                    <h2>Total Hours: 102hr</h2>
                    {/* <h2>Total Hours: 102hr</h2> */}
                    <h2>Average per day 13.3hr/day</h2>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
