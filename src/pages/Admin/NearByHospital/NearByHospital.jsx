import React, { useState, useEffect } from "react";
import "./nearByHospital.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Model from "../../../Component/Model/Model";
import HospitalModel from "./HospitalModel/HospitalModel";
import { ToastContainer, toast } from "react-toastify";

const NearByHospital = (props) => {
  const [model, setModel] = useState(false);
  const [getData, setGetData] = useState([]);
  const [editData, setEditData] = useState(null);

  const handelOnOff = () => {
    setEditData(null);
    setModel((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/hospital/get`)
      .then((res) => {
        setGetData(res.data.hospital);
      })
      .catch((err) => {
        toast.error(err?.data?.response?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (data) => {
    setEditData(data);
    setModel(true);
  };

  const handleDelete = async (id) => {
    
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/hospital/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Hospital Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        toast.error(err?.data?.response?.error);
      });
  };

  return (
    <div className="nearby-hospital">
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      <div className="a-f-header">
        <div className="a-f-h">Near By Hospital</div>
        <div className="a-f-btn" onClick={handelOnOff}>
          Add
        </div>
      </div>
      <div className="a-f-cards">
        {getData.map((item, index) => (
          <div className="a-f-card" key={index}>
            <div className="a-f-c-left">
              <div className="c-l-title">{item.name}</div>
              <div className="c-l-content">Address : {item.address} </div>
              <div className="c-l-contact">Contact No : {item.contact}</div>
              <div className="c-l-end">added by : {item.addedBy.name}</div>
            </div>
            <div className="a-f-c-right">
              <div onClick={() => handleEdit(item)}>
                <EditIcon sx={{ cursor: "pointer" }} />
              </div>
              <div onClick={() => handleDelete(item._id)}>
                <DeleteIcon sx={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {model && (
        <Model
          header={"Add Hospital"}
          handelClose={handelOnOff}
          children={
            <HospitalModel
              hideLoader={props.hideLoader}
              showLoader={props.showLoader}
              fetchData={fetchData}
              editData={editData}
            />
          }
        />
      )}
    </div>
  );
};

export default NearByHospital;
