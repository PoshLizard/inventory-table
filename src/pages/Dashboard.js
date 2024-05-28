import React, { useState, useEffect, createRef, useRef } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import { Line } from "react-chartjs-2";
import { ReactTabulator } from "react-tabulator";
import axios from "axios";

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [tableRows, setTableRows] = useState([]);
  // const [laptopData, setLaptopData] = useState([]);
  const [view, setView] = useState("computers");

  const date = new Date();

  useEffect(() => {
      const handleResize = debounce(() => {
          console.log('Resize event triggered');
      }, 200);

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  useEffect(() => {
    fetchData();
    console.log("hello");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${view}`);
      console.log(response.data);
      if (view === "computers") {
        const laptopRows = response.data;
        const newArr = laptopRows
          .filter((row) => row.status === "loaned")
          .map((row) => {
            const tempLoan = row.loans[row.loans.length - 1];
            return {
              type: row.model,
              name: tempLoan.name,
              lendStart: tempLoan.lendStart,
              lendEnd: tempLoan.lendEnd,
            };
          });
        // setLaptopData(newArr);
        console.log(newArr);
      } else if (view === "badges") {
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function changeView(view) {
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
    { title: "Model", field: "type", width: 200 },
    { title: "Issued To", field: "name", hozAlign: "left" },
    { title: "Start Date", field: "startDate", hozAlign: "left" },
    { title: "End Date", field: "endDate", hozAlign: "left" },
    { title: "Days Late", field: "daysLate", hozAlign: "left" },
  ];

  const badgeColumns = [
    { title: "Badge Name", field: "type", width: 350 },
    { title: "Name", field: "name", hozAlign: "left" },
    { title: "Location", field: "location", hozAlign: "left" },
  ];

  const supplyColumns = [
    { title: "Quantity", field: "quantity", width: 150 },
    { title: "Unit", field: "unit", hozAlign: "center" },
    { title: "Building Location", field: "location", hozAlign: "center" },
    { title: "Area", field: "area", hozAlign: "center" },
    { title: "Reorder Level", field: "reorderLevel", hozAlign: "center" },
    { title: "Reorder Quantity", field: "reorderQuantity", hozAlign: "center" },
    { title: "Vendor", field: "vendor", hozAlign: "center" },
    { title: "Cost", field: "cost", hozAlign: "center" },
  ];

  const laptopData = [
    {
      type: "Dell Laptop",
      name: "Tunmise Kehinde",
      startDate: "05-21-2023",
      endDate: "05-21-2025",
    },
    {
      type: "Dell Laptop",
      name: "Tunmise Kehinde",
      startDate: "05-21-2021",
      endDate: "05-21-2024",
    },
  ];

  const rowFormatter = (row) => {
    const rowData = row.getData();
    console.log(rowData);
    const endDate = new Date(rowData.endDate);
    if (endDate < date) {
      console.log(endDate);
      row.getElement().style.backgroundColor = "lightcoral";
    }
  };

  const calculateDaysLate = (value, data, type, params, component) => {
    const currentdate = new Date();
    const endDate = new Date(data.endDate);
    const diffTime = Math.abs(endDate.getTime() - currentdate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    console.log(diffTime);
    if (endDate.getTime() - date.getTime() >= 0) {
      return " ";
    }
    return diffDays - 1;
  };

  let laptopTableRef = useRef(null);
  return (
    <div className="dashboard">
      <Header />
      <div className="container">
        <SideNav />
        <div className="content">
          <div className="dashboardHeader">
            <label style={{fontSize:"1.5rem"}}>View: </label>
            <select  onChange={e => setView(e.target.value)} >
              <option value="computers">Computers</option>
              <option value="badges">Badges</option>
              <option value="supplies">Supplies</option>
            </select>
          </div>
          {view == "computers" && (
            <>
              <h1 style={{ marginTop: "70px", fontSize:"3rem"}}>
                <u>Laptops</u>
              </h1>
              <div style={{ marginTop: "30px" }}>
                <div style={{ margin: "45px" }}>
                  <h1 style={{color: 'var(--code-orange)'}}>3</h1>
                  <h2>Current Loans</h2>
                </div>
                <div>
                  <ReactTabulator
                    onRef={(r) => (laptopTableRef = r)}
                    data={laptopData}
                    columns={laptopColumns.map((col) =>
                      col.field === "daysLate"
                        ? { ...col, mutator: calculateDaysLate }
                        : col
                    )}
                    layout={"fitColumns"}
                    rowFormatter={rowFormatter}
                  />
                </div>
              </div>
            </>
          )}
          {view == "badges" && (
            <>
              <h1 style={{ margin: "70px 0" }}>
                <u>Badges</u>
              </h1>
              <ReactTabulator columns={badgeColumns} layout={"fitColumns"} />
            </>
          )}
          {view == "supplies" && (
            <>
              <h1 style={{ margin: "70px 0" }}>
                <u>Supplies</u>
              </h1>
              <ReactTabulator columns={supplyColumns} layout={"fitColumns"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
