import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { Line } from "react-chartjs-2";
import { ReactTabulator } from 'react-tabulator'
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

    const [view,setView] = useState("laptops");

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


    function changeView(view){
        setView(view);
    }


    const laptopLoanColumns = [
        { title: "Type", field: "type", width: 150 },
        { title: "To", field: "name", hozAlign: "left"},
        { title: "Date Passed", field: "dob", hozAlign: "center" },
      ];

      const laptopPastDueColumns = [
        { title: "Type", field: "type", width: 150 },
        { title: "To", field: "name", hozAlign: "left"},
        { title: "Days Late", field: "number", hozAlign: "center" },
      ];
      
      const badgeColumns = [
        { title: "Badge Name", field: "type", width: 150 },
        { title: "Name", field: "name", hozAlign: "left"},
        { title: "Location", field: "location", hozAlign: "center" },
      ];

      const keyColumns = [
        { title: "Name", field: "name", width: 150 },
        { title: "725", field: "room", hozAlign: "center", formatter: "tickCross"},
        { title: "728", field: "roomtwo", hozAlign: "center", formatter: "tickCross"},
        { title: "REST", field: "rest", hozAlign: "center", formatter: "tickCross"},
      ];

      const supplyColumns = [
        { title: "Quantity", field: "quantity", width: 150 },
        { title: "Unit", field: "unit", hozAlign: "center",},
        { title: "Building Location", field: "location", hozAlign: "center"}, 
        { title: "Area", field: "area", hozAlign: "center"},
        { title: "Reorder Level", field: "reorderLevel", hozAlign: "center"},
        { title: "Reorder Quantity", field: "reorderQuantity", hozAlign: "center"},
        { title: "Vendor", field: "vendor", hozAlign: "center"},
        { title: "Cost", field: "cost", hozAlign: "center"},
      ];
    

    return (
        <div className='dashboard'>
            <Header />
            <div className='container'>
                <SideNav />      
                <div className='content'>
                        <div className='dashboardHeader'>
                            <p id='laptopDashboard'onClick={() => setView("laptops")}>Laptops</p>
                            <p id='badgesDashboard' onClick={() => setView("badges")}>Badges</p>
                            <p id='keysDashboard' onClick={() => setView("keys")}>Keys</p>
                            <p id='suppliesDashboard' onClick={() => setView("supplies")}>Supplies</p>
                        </div>

                    {view == "laptops" && (
                        <>
                            <h1><u>Laptops</u></h1>
                            <h1>3</h1>
                            <p>Current Loans</p>
                            <h1>All Loans</h1>
                                <ReactTabulator
                            
                                columns={laptopLoanColumns}
                                layout={"fitData"}
                                />
                            <h1>Past Due</h1>
                            <ReactTabulator
                            
                            columns={laptopPastDueColumns}
                            layout={"fitData"}
                            />

                        </>
                    )}

                    {view == "badges" && (
                        <>
                            <h1><u>Badges</u></h1>
                                <ReactTabulator
                            
                                columns={badgeColumns}
                                layout={"fitData"}
                                />
                            

                        </>
                    )}

                    {view == "keys" && (
                        <>
                            <h1><u>Keys</u></h1>
                                <ReactTabulator
                            
                                columns={keyColumns}
                                layout={"fitData"}
                                />
                            

                        </>
                    )}

                    {view == "supplies" && (
                        <>
                            <h1><u>Supplies</u></h1>
                                <ReactTabulator
                            
                                columns={supplyColumns}
                                layout={"fitData"}
                                />
                            

                        </>
                    )}
                        
                    
                </div>
            </div>
        </div>
        
        
    )
}

export default Dashboard;