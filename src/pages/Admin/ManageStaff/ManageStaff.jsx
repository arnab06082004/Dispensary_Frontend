import React, { useState, useEffect, useCallback } from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ManageStaff = (props) => {
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNo: "",
  });

  const [staffs, setStaffs] = useState([]);
  const [clickEdit, setClickEdit] = useState(null);

  // Use useCallback to memoize fetchData
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/get-staff`,
        {}
      );

      setStaffs(response.data.staff || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelUpdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-staff/${clickEdit?._id}`,
        staffForm,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setClickEdit(null);
      setStaffForm({
        name: "",
        email: "",
        password: "",
        designation: "",
        mobileNo: "",
      });
      fetchData();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (clickEdit) return handelUpdate();

    props?.showLoader?.();

    try {
      // Use strict equality (===) instead of loose equality (==)
      if (
        staffForm.name.trim() === "" ||
        staffForm.mobileNo.trim() === "" ||
        staffForm.email.trim() === "" ||
        staffForm.password.trim() === "" ||
        staffForm.designation.trim() === ""
      ) {
        toast.error("Invalid Credentials");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/add-staff`,
        {
          name: staffForm.name,
          email: staffForm.email,
          password: staffForm.password,
          designation: staffForm.designation,
          mobileNo: staffForm.mobileNo,
        },
        { withCredentials: true }
      );
      
      toast.success("Password sent to your staffs email Id ");
      fetchData();
      setStaffForm({
        name: "",
        email: "",
        password: "",
        designation: "",
        mobileNo: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Error adding staff");
    } finally {
      props?.hideLoader?.();
    }
  };

  const handleEdit = (item) => {
    setClickEdit(item);
    setStaffForm({
      name: item.name || "",
      email: item.email || "",
      password: "",
      designation: item.designation || "",
      mobileNo: item.mobileNo || "",
    });
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/delete-staff/${item}`,
        { withCredentials: true }
      );
      fetchData();
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // Memoize the fields array to prevent unnecessary re-renders
  const formFields = React.useMemo(() => {
    return ["name", "email", "password", "designation", "mobileNo"]
      .filter((field) => !(field === "password" && clickEdit !== null));
  }, [clickEdit]);

  return (
    <div className="staff-box">
      <form className="from" onSubmit={handleSubmit}>
        <div className="from-divs">
          {formFields.map((field) => (
            <div className="from-div" key={field}>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                className="from-input"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={staffForm[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn">
          {!clickEdit ? "Add" : "Update"}
        </button>
      </form>

      <div className="list-staffs">
        {staffs.length > 0 ? (
          staffs.map((staff, index) => (
            <div className="list-staff" key={staff._id || index}>
              <div>{staff.name}</div>
              <div className="l-s-btns">
                <div onClick={() => handleEdit(staff)}>
                  <EditIcon />
                </div>
                <div onClick={() => handleDelete(staff._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No staff members found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;