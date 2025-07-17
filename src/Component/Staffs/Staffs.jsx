import React from "react";
import "./staffs.css";
import TableComp from "../Table/TableComp";
import { Email } from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const staffsHeader = ["Name", "Designation", "Email", "Contact No."];

const Staffs = (props) => {
  const [data, setData] = useState([]);
  const formatData = (data) => {
    const newData = data.map((item) => {
      return {
        Name: item.name,
        Designation: item.designation,
        Email: item.email,
        Contact: item.mobileNo,
      };
    });
    setData(newData);
  };
  useEffect(() => {
    props.showLoader();
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/get-staff`)
        .then((response) => {
          formatData(response.data.staff);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          props.hideLoader();
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <TableComp header={staffsHeader} data={data} />
    </div>
  );
};

export default Staffs;
