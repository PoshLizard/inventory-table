import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

const Dashboard = () => {
    // const data = {
    //     labels: ['Mon', 'Tue', 'Wed'],
    //     datasets: [
    //         {
    //             label: 'Stonks',
    //             data: [6, 3, 9],
    //             backgroundColor: 'aqua',
    //             borderColor: 'black',
    //             pointBorderColor: 'aqua',
    //             fill: true,
    //             tension: 0.4
    //         }
    //     ]
    // }

    // const options = {
    //     plugins: {
    //         legend: true
    //     },
    //     scales: {
    //         y: {
    //             min: 3,
    //             max: 6
    //         }
    //     }
    // }

    return (
        <div className='dashboard'>
            <Header />
            <div className='container'>
                <SideNav />
                <div className='content'>
                            <div>
                        <p>Laptops</p>
                        <p>Badges</p>
                        <p>Keys</p>
                        <p>Supplies</p>
                         </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default Dashboard;