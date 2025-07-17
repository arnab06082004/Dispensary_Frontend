import React, { useEffect, useState } from "react";
import "./record.css";
import Search from "../../../Component/SearchBar/Search";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Model from "../../../Component/Model/Model";
import RecordModel from "./RecordModel/RecordModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AllRecordModel from "./AllRecordModel/AllRecordModel";

const Record = (props) => {
  const [studentRoll, setStudentRoll] = useState("");
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [model, setModel] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [allModel, setAllModel] = useState(false);
  const [allHistory, setAllHistory] = useState([]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
  const startingYear = 2025;

  // Only past and current years
  const years = Array.from(
    { length: currentYear - startingYear + 1 },
    (_, i) => startingYear + i
  );

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Show only up to current month for current year
  const monthsToShow =
    selectedYear === currentYear ? months.slice(0, currentMonth + 1) : months;

  const onChange = (val) => {
    setStudentRoll(val);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    if (year !== currentYear) setSelectedMonth(null);
    else setSelectedMonth(currentMonth);
  };

  const handleMonthClick = (index) => {
    setSelectedMonth(index);
  };

  const onClick = (item) => {
    setModel((prev) => !prev);
    setSelectedHistory(item);
  };

  const myClick = () => {
    setAllModel((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/history/get-history?month=${selectedMonth + 1}&year=${selectedYear}`,
        { withCredentials: true }
      )

      .then((res) => {
        setData(res.data.histories);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    if (selectedMonth === "" || selectedYear === "") return;

    fetchData();
  }, [selectedMonth, selectedYear]);

  const handelClick = async () => {
    if (studentRoll.trim() === "")
      return toast.error("Please enter valid roll no");
    props.showLoader();
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/history/get?roll=${studentRoll}`,
        {
          withCredentials: true,
        }
      )

      .then((res) => {
        setAllHistory(res.data.sHistory);
        setAllModel(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className="record">
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <Search
        value={studentRoll}
        placeholder={"Search By Roll No."}
        onChange={onChange}
        handelClick={handelClick}
        className={"margin"}
      />

      <div className="record-data-block pad">
        <div className="label">Select Year</div>
        <div className="r-d-year">
          {years.map((year) => (
            <div
              key={year}
              className={`record-year ${year === selectedYear ? "selected" : ""}`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      </div>

      <div className="record-data-block pad">
        <div className="label">Select Month</div>
        <div className="r-d-year">
          {monthsToShow.map((month, index) => (
            <div
              key={month}
              className={`record-year ${index === selectedMonth ? "selected" : ""}`}
              onClick={() => handleMonthClick(index)}
            >
              {month}
            </div>
          ))}
        </div>
      </div>
      <div className="report-form-rows manageMedicine m-top ">
        <div className="report-form-header .m-top">
          <div className="col-3-rm">View</div>
          <div className="col-3-rm">Student Name</div>
          <div className="col-3-rm">Roll No.</div>
          <div className="col-3-rm">Date</div>
        </div>
      </div>
      <div className="report-form-row-block tableData  m-top">
        {data.length !== 0 ? (
          data.map((item, index) => (
            <div className="report-form-row" key={index}>
              <div className="col-3-rm" onClick={() => onClick(item)}>
                <VisibilityIcon sx={{ cursor: "pointer" }} />
              </div>
              <div className="col-3-rm">{item.student.name}</div>
              <div className="col-3-rm">{item.student.roll}</div>
              <div className="col-3-rm">
                {item.student.createdAt
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
            </div>
          ))
        ) : (
          <div className="col-3-rm">No data found</div>
        )}
      </div>
      {model && (
        <Model
          header={"Records"}
          children={<RecordModel selectedHistory={selectedHistory} />}
          handelClose={onClick}
        />
      )}

      {allModel && (
        <Model
          header={"Records"}
          children={<AllRecordModel allHistory={allHistory} />}
          handelClose={myClick}
        />
      )}
    </div>
  );
};

export default Record;
