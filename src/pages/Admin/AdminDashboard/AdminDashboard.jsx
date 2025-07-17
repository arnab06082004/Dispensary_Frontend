import React, { useState } from "react";
import "./AdminDashboard.css";
import Model from "../../../Component/Model/Model";
import ManageStaff from "../ManageStaff/ManageStaff";
import ManageEvent from "../ManageEvent/MangeEvent"
import { Link } from "react-router-dom";
const AdminDashboard = (props) => {
  const [manageStaff, setManageStaff] = useState(false);
  const [manageEvent, setManageEvent] = useState(false);

  const handelOpenClose = (value) => {
    if (value === "staff") {
      setManageStaff((prev) => !prev);
    } else {
      setManageEvent((prev) => !prev);
    }
  };
  let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

  return (
    <div>
      <div className="Admin-Dashboard-header">
        <div className="a-text">Welcome to Admin Panel</div>
        <div className="a-right">
          {userInfo.role === "admin" && <div className="a-r-btn" onClick={() => handelOpenClose("staff")}>
            Manage Staffs
          </div>}
          <div className="a-r-btn" onClick={() => handelOpenClose("event")}>
            Events
          </div>
        </div>
      </div>
      <div className="a-d-cards">
        <Link className="a-d-card" to={'/admin/register-student'}>Register Student</Link>
        <Link className="a-d-card" to={'/admin/manage-medicine'}>Manage Medicine</Link>
        <Link className="a-d-card" to={'/admin/record'}>Records </Link>
        <Link className="a-d-card" to = {'/admin/facilities'}>Facilities</Link>
        <Link className="a-d-card"to={'/admin/nearByHospital'}>Near By Hospital</Link>
        <Link className="a-d-card" to={'/admin/gallery'}>Gallery</Link>
      </div>
      {manageStaff && (
        <Model
          header={"Manage Staffs"}
          value={"staff"}
          handelClose={handelOpenClose}
          children={<ManageStaff showLoader = {props.showLoader} hideLoader = {props.hideLoader}/>}
        />
      )}

      {manageEvent && (
        <Model
          header={"Manage Events"}
          value={"event"}
          handelClose={handelOpenClose}
          children = {<ManageEvent showLoader = {props.showLoader} hideLoader = {props.hideLoader}/>}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
