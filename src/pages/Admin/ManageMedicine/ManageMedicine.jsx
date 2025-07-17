import React, { useEffect, useState } from "react";
import "./manageMedicine.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "../../../Component/SearchBar/Search";
import Model from "../../../Component/Model/Model";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MedicineModel from "./MedicineModel/MedicineModel";
import axios from "axios";
import { toast } from "react-toastify";

const ManageMedicine = (props) => {
  const [searchMedicine, setSearchMedicine] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setSelectedMedicine(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedMedicine(item);
    setIsModalOpen(true);
  };

  const onChange = (value) => {
    setSearchMedicine(value);
  };

  const fetchData = async () => {
    try {
      props.showLoader();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search-by-name?name=${searchMedicine}`
      );

      setMedicines(res.data.medicine || []);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to fetch medicines");
    } finally {
      props.hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchMedicine]);

  const handleDelete = async (id) => {
    try {
      props.showLoader();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/medicine/delete/${id}`,
        { withCredentials: true }
      );
      toast.success("Medicine deleted successfully!");
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to delete medicine");
    } finally {
      props.hideLoader();
    }
  };

  return (
    <div className="manage-medicine">
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="m-m-header">
        <Search
          placeholder={"Search Medicine"}
          value={searchMedicine}
          onChange={onChange}
        />
        <button className="btn-1" onClick={handleOpenAddModal}>
          Add
        </button>
      </div>

      <div className="report-form-rows manageMedicine">
        <div className="report-form-header">
          <div className="col-3-rm">Sl. No</div>
          <div className="col-3-rm">Medicine Name</div>
          <div className="col-3-rm">Added By</div>
          <div className="col-3-rm">Quantity</div>
          <div className="col-3-rm">Edit</div>
          <div className="col-3-rm">Delete</div>
        </div>
      </div>

      <div className="report-form-row-block tableData">
        {medicines.length > 0 ? (
          medicines.map((item, index) => (
            <div className="report-form-row" key={item._id}>
              <div className="col-3-rm">{index + 1}</div>
              <div className="col-3-rm">{item.name}</div>
              <div className="col-3-rm">{item?.addedBy?.name}</div>
              <div className="col-3-rm">{item.quantity}</div>
              <div className="col-3-rm">
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleEdit(item)}
                />
              </div>
              <div className="col-3-rm">
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No Any medicine yet</div>
        )}
      </div>

      {isModalOpen && (
        <Model
          header={selectedMedicine ? "Update Medicine" : "Add Medicine"}
          handelClose={() => setIsModalOpen(false)}
        >
          <MedicineModel
            fetchMed={selectedMedicine}
            showLoader={props.showLoader}
            hideLoader={props.hideLoader}
            fetchData={fetchData}
          />
        </Model>
      )}
    </div>
  );
};

export default ManageMedicine;
