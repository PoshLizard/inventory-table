import React, { useState, useEffect, createRef, useRef } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { Line } from "react-chartjs-2";
import { ReactTabulator } from 'react-tabulator'

const Dashboard = () => {

    const date = new Date()
    

    const [view,setView] = useState("laptops");


    function changeView(view){
        setView(view);
    }


    const laptopColumns = [
        { title: "Model", field: "type", width: 150},
        { title: "Issued To", field: "name", hozAlign: "left"},
        { title: "Start Date", field: "startDate", hozAlign: "center" },
        { title: "End Date", field: "endDate", hozAlign: "center" },
        { title: "Days Late", field: "daysLate", hozAlign: "center" }
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
    

      const laptopData = [
        {
        type: "Dell Laptop",
        name: "Tunmise Kehinde",
        startDate: "05-21-2023",
        endDate: "06-29-2024",       
      },{
        type: "Dell Laptop",
        name: "Tunmise Kehinde",
        startDate: "05-21-2021",
        endDate: "05-24-2022",
      }
    
    ];


    const rowFormatter = (row) => {
        const rowData = row.getData();
        const endDate = new Date(rowData.endDate)
        if (endDate < date) {
            console.log(endDate)
          row.getElement().style.backgroundColor = 'red';
        }
      };

      const calculateDaysLate = (value, data, type, params, component) => {
        const endDate = new Date(data.endDate)
        const diffTime = Math.abs(endDate.getTime() - date.getTime());
        
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if((endDate.getTime() - date.getTime() ) >= 0){
            return " ";
        }
        return diffDays;
      };
        
    let laptopTableRef = useRef(null);
    

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
                            <div style={{display:'flex', marginTop:'30px'}}>
                                <div style={{margin:'45px'}}>
                                    <h1>3</h1>
                                    <p>Current Loans</p>
                                </div>
                                <div>
                                    <h1>All Loans</h1>
                                        <ReactTabulator
                                        onRef={ (r) => (laptopTableRef = r)}
                                        data={laptopData}
                                        columns={laptopColumns.map(col => col.field === 'daysLate' ? { ...col, mutator: calculateDaysLate } : col)}
                                        layout={"fitData"}
                                        rowFormatter={rowFormatter}
                                        />
                                </div>
                            </div>
                           
                            
                            
                            

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