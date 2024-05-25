import React, { useState, useEffect, createRef } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { Line } from "react-chartjs-2";
import { ReactTabulator } from 'react-tabulator'
import axios from 'axios'


const Dashboard = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [tableRows, setTableRows] = useState([]);
    const [laptopData, setLaptopData] = useState([]);
    const [view,setView] = useState("computers");

    
    // useEffect(() => {
    //     const handleResize = debounce(() => {
    //         console.log('Resize event triggered');
    //     }, 200);

    //     window.addEventListener('resize', handleResize);

        
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    useEffect(() => {
        fetchData();
        console.log('hello');
    }, [])



    const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/${view}`);
          console.log(response.data);
          if(view ==="computers"){
          const laptopRows = response.data;
          const newArr = laptopRows
            .filter(row => row.status === "loaned")
            .map(row => {
                const tempLoan = row.loans[row.loans.length - 1]; 
                return {
                    type: row.model,
                    name: tempLoan.name,
                    lendStart: tempLoan.lendStart,
                    lendEnd: tempLoan.lendEnd
                };
            });
            setLaptopData(newArr);
            console.log(newArr);
          } else if(view ==="badges"){

          } else{

          }
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    function changeView(view){
        setView(view);
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

   

    const laptopColumns = [
        { title: "Model", field: "type", width: 200},
        { title: "Issued To", field: "name", hozAlign: "left"},
        { title: "Start Date", field: "startDate", hozAlign: "left" },
        { title: "End Date", field: "endDate", hozAlign: "left" },
        { title: "Days Late", field: "daysLate", hozAlign: "left" }
      ];

      
      const badgeColumns = [
        { title: "Badge Name", field: "type", width: 350 },
        { title: "Name", field: "name", hozAlign: "left"},
        { title: "Location", field: "location", hozAlign: "left" },
      ];

    //   const keyColumns = [
    //     { title: "Name", field: "name", width: 300 },
    //     { title: "725", field: "room", hozAlign: "left", formatter: "tickCross"},
    //     { title: "728", field: "roomtwo", hozAlign: "center", formatter: "tickCross"},
    //     { title: "REST", field: "rest", hozAlign: "center", formatter: "tickCross"},
    //   ];

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
    

    //   const laptopData = [
    //     {

    //     type: "Dell Laptop",
    //     name: "Tunmise Kehinde",
    //     startDate: "05-21-2023",
    //     endDate: "05-21-2024",       
    //   },{

    //     type: "Dell Laptop",
    //     name: "Tunmise Kehinde",
    //     startDate: "05-21-2021",
    //     endDate: "05-21-2022",
    //     daysLate: "370",
    //   }
    
    // ];

    

    const innerRef = createRef();
    console.log(innerRef.data);
    return (
        <div className='dashboard'>
            <Header />
            <div className='container'>
                <SideNav />      
                <div className='content'>
                        <div className='dashboardHeader'>
                            <p className="dashboard-links" id='laptopDashboard'onClick={() => setView("computers")}>Laptops</p>
                            <p className="dashboard-links"  id='badgesDashboard' onClick={() => setView("badges")}>Badges</p>
                            {/* <p className="dashboard-links" id='keysDashboard' onClick={() => setView("keys")}>Keys</p> */}
                            <p className="dashboard-links" id='suppliesDashboard' onClick={() => setView("supplies")}>Supplies</p>
                        </div>

                    {view == "computers" && (
                        <>
                            <h1 style={{marginTop: '70px'}}><u>Laptops</u></h1>
                            <div style={{ marginTop:'30px'}}>
                                <div style={{margin:'45px'}}>
                                    <h1>3</h1>
                                    <p>Current Loans</p>
                                </div>
                                <div>
                                        <ReactTabulator
                                            ref={innerRef}
                                            data={laptopData}
                                            columns={laptopColumns}
                                            layout={"fitColumns"}
                                        />
                                </div>
                            </div>
                        </>
                    )}

                    {view == "badges" && (
                        <>
                            <h1 style={{margin: '70px 0'}} ><u>Badges</u></h1>
                                <ReactTabulator
                            
                                columns={badgeColumns}
                                layout={"fitColumns"}
                                />
                            

                        </>
                    )}

                    {/* {view == "keys" && (
                        <>
                            <h1 style={{margin: '70px 0'}} ><u>Keys</u></h1>
                                <ReactTabulator
                            
                                columns={keyColumns}
                                layout={"fitColumns"}
                                />
                            

                        </>
                    )} */}

                    {view == "supplies" && (
                        <>
                            <h1 style={{margin: '70px 0'}} ><u>Supplies</u></h1>
                                <ReactTabulator
                            
                                columns={supplyColumns}
                                layout={"fitColumns"}
                                />
                            

                        </>
                    )}
                        
                    
                </div>
            </div>
        </div>
        
        
    )
}

export default Dashboard;