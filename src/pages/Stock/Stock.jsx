import React, { useState } from "react";
import "./stock.css";
import Search from "../../Component/SearchBar/Search.jsx";
import TableComp from "../../Component/Table/TableComp.jsx";
import { useEffect } from "react";
import axios from "axios";

const Stock = (props) => {
  const [medicineName, setMedicineName] = useState("");
  const [rowData, setRowData] = useState([]);
  const handleInpChange = (value) => {
    setMedicineName(value);
  };

  const header = ["Sl.no", "Name", "Quantity", "Usage"];

  const formattedData = (data) => {
    const newArr = data.map((item, idx) => {
      return {
        sl: idx + 1,
        name: item.name,
        quantity: item.quantity,
        usage: item.usage,
      };
    });
    setRowData(newArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search-by-name?name=${medicineName}`
        )
        .then((response) => {
          if (response.data.medicine.length === 0) setRowData([]);
          else formattedData(response.data.medicine);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        });
    };
    fetchData();
  }, [medicineName]);

  return (
    <div>
      <div className="stock">
        <Search
          placeholder="Search Medicine"
          onChange={handleInpChange}
          value={medicineName}
        />
      </div>
      <div className="stock-card">
        <TableComp header={header} data={rowData} />
      </div>
    </div>
  );
};

export default Stock;
