import React, { useEffect, useState } from "react";
import "./medicineModel.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MedicineModel = (props) => {
  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    usage: "",
  });

  // Fill data if editing
  useEffect(() => {
    if (props.fetchMed) {
      setFormData({
        medicineName: props.fetchMed.name || "",
        quantity: props.fetchMed.quantity || "",
        usage: props.fetchMed.usage || "",
      });
    } else {
      setFormData({
        medicineName: "",
        quantity: "",
        usage: "",
      });
    }
  }, [props.fetchMed]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.medicineName.trim() === "" ||
      formData.quantity.trim() === "" ||
      formData.usage.trim() === ""
    ) {
      return toast.error("All fields are required!");
    }

    props.showLoader();

    try {
      if (props.fetchMed && props.fetchMed._id) {
        
        await axios.put(
  `${import.meta.env.VITE_BACKEND_URL}/api/medicine/update/${props.fetchMed._id}`,

          {
            name: formData.medicineName,
            quantity: formData.quantity,
            usage: formData.usage,
          },
          { withCredentials: true }
        );
        toast.success("Medicine updated successfully!");
        
      } else {
        
        await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/medicine/add`,

          {
            name: formData.medicineName,
            quantity: formData.quantity,
            usage: formData.usage,
          },
          { withCredentials: true }
        );
        toast.success("Medicine added successfully!");
      }
      
      props.fetchData();
      props.hideLoader();
      window.location.reload()
      if (props.handelClose) props.handelClose();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to save medicine");
      props.hideLoader();
    }
  };

  return (
    <div>
      <form className="r-form" onSubmit={handleSubmit}>
        <div className="r-f-div">
          <div className="r-f-inp">
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleInputChange}
              placeholder="Medicine Name"
            />
          </div>
          <div className="r-f-inp">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
            />
          </div>
          <div className="r-f-inp">
            <input
              type="text"
              name="usage"
              value={formData.usage}
              onChange={handleInputChange}
              placeholder="Usage"
            />
          </div>
        </div>
        <button type="submit" className="btn b1">
          {props.fetchMed ? "Update" : "Add"}
        </button>
      </form>
     
    </div>
  );
};

export default MedicineModel;
