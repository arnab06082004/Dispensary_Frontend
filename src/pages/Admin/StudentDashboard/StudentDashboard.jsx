import React, { useEffect, useState } from "react";
import "./studentDashboard.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Model from "../../../Component/Model/Model";
import StudentModel from "./StudentModel/StudentModel";
const StudentDashboard = (props) => {
  const [model, setModel] = useState(false);
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([])

  const handelOnOff = (data) => {
    setModel((prev) => !prev);
    setHistory(data)
  };

  const fetchData = async () => {
    props.showLoader();
    axios
      .get(`http://localhost:4000/api/history/get?roll=${user?.roll}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.sHistory);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return (
    <div className="student-dashboard">
      <div className="s-d-header">
        <div className="s-d-title-main">Welcome, {user?.name}</div>
        <div className="s-d-info-cards">
          <div className="s-d-info-card">{user?.roll}</div>
          <div className="s-d-info-card">{user?.email}</div>
        </div>
      </div>
      <div className="s-d-table">
        <div className="s-d-t-header">
          <div>View</div>
          <div>Date</div>
        </div>
        <div className="s-d-t-items">
          
            {data?data.map((item, index) => (
              <div key={index} className="s-d-t-item">
                <div>
                  <VisibilityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handelOnOff(item)}
                  />
                </div>
                <div>{item.createdAt
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}</div>
              </div>
            )) : <div className="s-d-t-item"> No records found</div>}
        </div>
      </div>

      {model && (
        <Model
          header={"Details"}
          handelClose={handelOnOff}
          children={<StudentModel history = {history}  />}
        />
      )}
     
    </div>
  );
};

export default StudentDashboard;
