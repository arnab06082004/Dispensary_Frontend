import React, { useState, useEffect } from "react";
import "./report.css";
import Search from "../../../../Component/SearchBar/Search";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Report = (props) => {
  const [searchMedicineName, setSearchMedicineName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const onChange = (value) => {
    setSearchMedicineName(value);
  };

  const fetchData = async () => {
    if (searchMedicineName.trim() === "") {
      setSuggestions([]);
      setDropDown(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:4000/api/medicine/search-by-name?name=${searchMedicineName}`
      );
      setSuggestions(res.data.medicine || []);
      setDropDown(true);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error fetching suggestions");
      setSuggestions([]);
      setDropDown(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchMedicineName]);

  const handleSelectSuggestion = (item) => {
    const alreadyExists = selectedMedicines.some((med) => med._id === item._id);
    if (alreadyExists) {
      toast.info("Medicine already added to the report");
      setSearchMedicineName("");
      setDropDown(false);
      return;
    }

    const newItem = {
      _id: item._id,
      name: item.name,
      quantityLeft: item.quantity,
      requiredQuantity: 0,
    };

    setSelectedMedicines((prev) => [...prev, newItem]);
    setSearchMedicineName("");
    setDropDown(false);
  };

  const handleQuantityChange = (index, value) => {
    setSelectedMedicines((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, requiredQuantity: value } : item
      )
    );
  };

  const handleDelete = (index) => {
    setSelectedMedicines((prev) => prev.filter((_, i) => i !== index));
  };

 const handleSubmit = () => {
  if (selectedMedicines.length === 0) {
    toast.error("No medicines selected to submit");
    return;
  }

  // Check for empty or invalid required quantity
  const invalidQuantity = selectedMedicines.find(
    (item) =>
      item.requiredQuantity === "" ||
      item.requiredQuantity === null ||
      isNaN(Number(item.requiredQuantity)) ||
      Number(item.requiredQuantity) <= 0
  );

  if (invalidQuantity) {
    toast.error(
      `Please fill all required quantities`
    );
    return;
  }

  // Check for over-request
  const overRequested = selectedMedicines.find(
    (item) => Number(item.requiredQuantity) > Number(item.quantityLeft)
  );

  if (overRequested) {
    toast.error(
      `Requested quantity for "${overRequested.name}" exceeds available stock`
    );
    return;
  }

  const studentRoll = props?.formData?.roll || "";
  const studentId = props?.formData?._id || "";

  if (!studentRoll || !studentId) {
    toast.error("Student roll or ID is missing. Cannot submit report.");
    return;
  }

  // Send to backend
  axios
    .post(
      "http://localhost:4000/api/history/add",
      {
        roll: studentRoll,
        student: studentId,
        medicines: selectedMedicines,
      },
      { withCredentials: true }
    )
    .then(() => {
      toast.success("Report submitted successfully!");
      setSelectedMedicines([]);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error || "Submission failed");
    });
};


  return (
    <div>
      <div className="medicine-suggestion-box">
        <Search
          className={"medicine-suggestion-box"}
          value={searchMedicineName}
          placeholder={"Search Medicine"}
          onChange={onChange}
        />

        {dropDown && searchMedicineName.trim() !== "" && (
          <div className="report-dropdown">
            {suggestions.length === 0 ? (
              <div className="report-dropdown-list">No Results</div>
            ) : (
              suggestions.map((item, index) => (
                <div
                  key={item._id || index}
                  className="report-dropdown-list"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  {item.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="report-form-rows">
        <div className="report-form-header">
          <div className="col-1-rm">Medicine Name</div>
          <div className="col-2-rm">Quantity Left</div>
          <div className="col-3-rm">Required Quantity</div>
          <div className="col-4-rm">Delete</div>
        </div>
      </div>

      <div className="report-form-row-block">
        {selectedMedicines.length === 0 ? (
          <div className="report-form-row">
            <div className="col-1-rm">No data yet</div>
          </div>
        ) : (
          selectedMedicines.map((item, index) => (
            <div className="report-form-row" key={item._id || index}>
              <div className="col-1-rm">{item.name}</div>
              <div className="col-2-rm">{item.quantityLeft}</div>
              <div className="col-3-rm">
                <input
                  type="number"
                  className="input-table"
                  min={0}
                  value={item.requiredQuantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </div>
              <div className="dlt col-4-rm" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="modal-submit" onClick={handleSubmit}>
        Submit
      </div>

      
    </div>
  );
};

export default Report;
