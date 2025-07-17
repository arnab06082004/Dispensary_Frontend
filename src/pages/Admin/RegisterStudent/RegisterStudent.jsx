import React, { useState } from "react";
import "./registerStudent.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "../../../Component/SearchBar/Search";
import Model from "../../../Component/Model/Model";
import Report from "./Report/Report";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RegisterStudent = (props) => {
  const [searchStudent, setSearchStudent] = useState("");
  const [reportModel, setReportModel] = useState(false);
  const handelOnchange = (value) => {
    setSearchStudent(value);
  };
  const handelOpenClose = () => {
    setReportModel((prev) => !prev);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roll: "",
    mobileNo: "",
    fatherName: "",
    fatherMobile: "",
    address: "",
    previous_health: "",
    bloodGroup: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handelClick = async () => {
    if (searchStudent.trim() === "") return toast.error("Invalid Roll No");

    props.showLoader();
    axios
      .get(
        `http://localhost:4000/api/auth/get-student-by-roll/${searchStudent}`,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setFormData(res.data.student);
        
      })
      .catch((err) => {
        setFormData({
          name: "",
          email: "",
          roll: "",
          mobileNo: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          previous_health: "",
          bloodGroup: "",
          age: "",
        });
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleUpdate = async () => {
    if (
      formData.name.trim() == "" ||
      formData.roll.trim() == "" ||
      formData.mobileNo.trim() == ""
    )
      return toast.error(
        "Student name or roll or Mobile number should not be empty"
      );
    props.showLoader();
    axios
      .put(
        `http://localhost:4000/api/auth/update-student/${formData?._id}`,
        {
          name: formData.name,
          roll: formData.roll,
          mobileNo: formData.mobileNo,
          fatherName: formData.fatherName,
          fatherMobile: formData.fatherMobile,
          address: formData.address,
          previous_health: formData.previous_health,
          bloodGroup: formData.bloodGroup,
          age: formData.age,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Student Details updated Successfully");
      })
      .catch((err) => {
        toast.error(err?.data?.response?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleRegister = async () => {
    if (
      formData.name.trim() == "" ||
      formData.roll.trim() == "" ||
      formData.mobileNo.trim() == "" ||
      formData.email.trim() == ""
    )
      return toast.error(
        "Student name, roll, email or Mobile number should not be empty"
      );
    props.showLoader();
    axios
      .post(
        "http://localhost:4000/api/auth/registerStudentByStaff",
        {
           email: formData.email,
          name: formData.name,
          roll: formData.roll,
          mobileNo: formData.mobileNo,
          fatherName: formData.fatherName,
          fatherMobile: formData.fatherMobile,
          address: formData.address,
          previous_health: formData.previous_health,
          bloodGroup: formData.bloodGroup,
          age: formData.age,
        },
        { withCredentials : true}
      )
      .then((res) => {
        toast.success(res?.data?.message);
        
      })
      .catch((err) => {
        setFormData({
          name: "",
          email: "",
          roll: "",
          mobileNo: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          previous_health: "",
          bloodGroup: "",
          age: "",
        });
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div>
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <Search
        placeholder="Search By Roll No."
        onChange={handelOnchange}
        handelClick={handelClick}
        value={searchStudent}
      />

      <div className="r-s-block">
        <div className="r-s-header">Register Student</div>
        <form className="r-form" onSubmit={handelSubmit}>
          <div className="r-f-div">
            <div className="r-f-inp">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Student Name"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="email"
                disabled={formData?._id}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="roll"
                value={formData.roll}
                onChange={handleInputChange}
                placeholder="Roll No."
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                placeholder="Mobile No."
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Father's Name"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleInputChange}
                placeholder="Father's Mobile No."
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="previous_health"
                value={formData.previous_health}
                onChange={handleInputChange}
                placeholder="Previous Health Issue"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                placeholder="Blood Group"
              />
            </div>
            <div className="r-f-inp">
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
            </div>
          </div>

          {formData?._id ? (
            <div className="block-div">
              <button className="btn b1" onClick={handleUpdate}>
                Update
              </button>
              <button
                type="button"
                className="btn b1"
                onClick={handelOpenClose}
              >
                Report
              </button>
            </div>
          ) : (
            <button type="submit" className="btn b1" onClick={handleRegister}>
              Register
            </button>
          )}
        </form>
      </div>
      {reportModel && (
        <Model
          header={"Report"}
          handelClose={handelOpenClose}
          children={<Report formData= {formData}/>}
        />
      )}
      
    </div>
  );
};

export default RegisterStudent;
