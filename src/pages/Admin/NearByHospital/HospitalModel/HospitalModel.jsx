import React, { useState } from "react";

import "./hospitalModel.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const HospitalModel = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.trim() == "" ||
      formData.address.trim() == "" ||
      formData.contact.trim() == ""
    )
      return toast.error("Invalid Credentials");

    props.showLoader();
    if (props.editData) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/hospital/update/${props.editData._id}`,
          {
            name: formData.name,
            address: formData.address,
            contact: formData.contact,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Hospital updated Successfully");
          props.fetchData();
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err?.data?.response?.error);
        })
        .finally(() => {
          props.hideLoader();
        });
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/hospital/add`,
        {
          name: formData.name,
          address: formData.address,
          contact: formData.contact,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Hospital added Successfully");
        setFormData({
          name: "",
          address: "",
          contact: "",
        });
        props.fetchData();
      })
      .catch((err) => {
        toast.error(err?.data?.response?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    if (props.editData) {
      setFormData({
        name: props.editData.name,
        address: props.editData.address,
        contact: props.editData.contact,
      });
    } else {
      setFormData({ name: "", address: "", contact: "" });
    }
  }, [props.editData]);

  return (
    <div>
      <form className="r-form" onSubmit={handleSubmit}>
        <div className="r-f-div">
          <div className="r-f-inp">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
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
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Contact"
            />
          </div>
        </div>
        <button type="submit" className="btn b1">
          {props.editData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default HospitalModel;
