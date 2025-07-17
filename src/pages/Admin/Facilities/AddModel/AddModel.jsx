import React from "react";
import "./addModel.css";
import { useState } from "react";
import { toast} from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const AddModel = (props) => {
  const [inpField, setInpField] = useState({
    title: "",
    description: "",
  });

  const handleInp = (event, key) => {
    setInpField((prev) => ({ ...prev, [key]: event.target.value }));
  };

  useEffect(() => {
    if (props.editData) {
      setInpField({
        title: props.editData.title,
        description: props.editData.description,
      });
    } else {
      setInpField({ title: "", description: "" });
    }
  }, [props.editData]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (inpField.title.trim() === "" || inpField.description.trim() === "")
      return toast.error("Invalid Credentials");
    props.showLoader();
    if (props.editData) {
      axios
       .put(`${import.meta.env.VITE_BACKEND_URL}/api/facility/update/${props.editData._id}`, 

          { title: inpField.title, description: inpField.description },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Facility updated Successfully");
          props.fetchData();
          window.location.reload()
        })
        .catch((err) => {
          toast.error(err?.data?.response?.error);
        })
        .finally(() => {
          props.hideLoader();
        });
    } else {
      axios
       .post(`${import.meta.env.VITE_BACKEND_URL}/api/facility/add`,

          { title: inpField.title, description: inpField.description },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Facility added Successfully");
          setInpField({ title: "", description: "" });
          props.fetchData();
        })
        .catch((err) => {
          toast.error(err?.data?.response?.error);
        })
        .finally(() => {
          props.hideLoader();
        });
    }
  };
  return (
    <div className="add-model">
      <form className="r-form" onSubmit={handelSubmit}>
        <div >
          <div className="r-f-inp">
            <input
              type="text"
              placeholder="Title"
              value={inpField.title}
              onChange={(e) => handleInp(e, "title")}
            />
          </div>
          <div className="r-f-inp" style={{ marginTop: 20 }}>
            <textarea
              value={inpField.description}
              className="a-m-inp"
              rows={5}
              cols={450}
              placeholder="Add description"
              onChange={(e) => handleInp(e, "description")}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn b1">
          {props.editData ? "Update" : "Add"}
        </button>
      </form>
      
    </div>
  );
};

export default AddModel;
