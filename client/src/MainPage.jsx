import React, {Component} from "react";
import {useState, useEffect} from 'react'
import axios from 'axios';
import chartjs from 'chartjs';
import YouTube from 'react-youtube';
import ytlogo from '/pics/ytlogo.png';

import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


function Header() {
    return (
        <div className="headerbar">
            <div className="container" id="headercontainer">
                <img src={ytlogo} alt="ytlogo"></img>
                <h2>YouTube Analyzer</h2>
            </div>
        </div>
    );
}

class YTP extends React.Component {
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId="0BjlBnfHcHM" opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}
export const LineGraph = () => {
    const options = {
        scales: {
            x: [{
                grid: {
                    display: false
                }
            }],
            y: [{
                grid: {
                    display: false
                }
            }]
        }
    };
    return <Line options={options} data={lineData} />
}


function MainPage() {
    /*
    const [analyticsData, setAnalyticsData] = useState(null);
    useEffect(() => {
        // Fetch data from the backend server
        axios
            .get("http://localhost:5000/api/youtube-analytics")
            .then((response) => {
                setAnalyticsData(response.data); // Store the response data in state
            })
            .catch((error) => {
                setError("Failed to fetch data: " + error.message);
            });
        console.log(analyticsData);
    }, []);

    useEffect(() => {
        fetchAPI();
    }, []);
    */
    return (
        <>
            <Header />
            <div className="container" id="gridContainer">
                <div className="parent">
                    <div className="gridChild div1 "></div>
                    <div className="gridChild div2"></div>
                    <div className="gridChild div3">Subscribers: <p>+{divsData[0]}</p></div>
                    <div className="gridChild div4">Est. Revenue: <p> ${divsData[1]}</p></div>
                    <div className="gridChild div5"><LineGraph /></div>
                    <div className="gridChild div6"><YTP/></div>
                    <div className="gridChild div7">Click Through Rate<p>+{divsData[3]}%</p></div>
                    <div className="gridChild div8">Retention<p>{divsData[4]}%</p></div>
                </div>
            </div>
        </>
    );
}

const lineData = {
    labels: [
        "05-2021",
        "06-2021",
        "07-2021",
        "08-2021",
        "09-2021",
        "10-2021",
        "11-2021",
        "12-2021",
        "01-2022",
        "02-2022",
        "03-2022",
        "04-2022",
        "05-2022",
        "06-2022",
        "07-2022",
        "08-2022",
        "09-2022",
        "10-2022",
        "11-2022",
        "12-2022",
        "01-2023",
        "02-2023",
        "03-2023",
    ],
    datasets: [
        {
            label: "Views",
            data: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0, 3, 3],
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 5,
            fill: true,
        }
    ],
}

const divsData = [0, 0, 0, 0, 0, 0, 0, 0];


export default MainPage;



