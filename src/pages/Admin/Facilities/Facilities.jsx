import React, { useState } from "react";
import "./facilities.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Model from "../../../Component/Model/Model";
import AddModel from "./AddModel/AddModel";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Facilities = (props) => {
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/facility/get`)

      .then((res) => {
        setGetData(res.data.facility);
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
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/facility/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Facility Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        toast.error(err?.data?.response?.error);
      });
  };

  return (
    <div className="admin-facilities">
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      <div className="a-f-header">
        <div className="a-f-h">Facilities</div>
        <div className="a-f-btn" onClick={handelOnOff}>
          Add
        </div>
      </div>
      <div className="a-f-cards">
        {getData.map((item, index) => (
          <div className="a-f-card" key={index}>
            {" "}
            <div className="a-f-c-left">
              <div className="c-l-title">{item.title}</div>
              <div className="c-l-content">{item.description} </div>
              <div className="c-l-end">
                added by : {item.addedBy.name ? item.addedBy.name : ""}
              </div>
            </div>{" "}
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

        {model && (
          <Model
            header={"Add facility"}
            handelClose={handelOnOff}
            children={
              <AddModel
                hideLoader={props.hideLoader}
                showLoader={props.showLoader}
                fetchData={fetchData}
                editData={editData}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Facilities;
