import React from "react";
import "./facilities.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import ListItem from "@mui/material/ListItem";

const Facilities = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.showLoader()
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/api/facility/get")
        .then((res) => {
          setData(res.data.facility);
        })
        .catch((err) => {
         toast.error(err?.response?.data?.error);
        }).finally(() => {
          props.hideLoader()
        })
    };
    fetchData();
  }, []);

  return (
    <div className="Facilities">
      <div className="header">
        <div className="f-h">List of facilities available in HIT Health Center :</div>
      </div>

      <div className="f-lists">
        {data.map((item, index) => {
          return (
            <div key={index} className="f-list">
              <div className="f-l-header">{item.title}</div>
              <div className="f-l-content">{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;
