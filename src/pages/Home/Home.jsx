import React, { useState } from "react";
import "./home.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ImageIcon from "@mui/icons-material/Image";
import AboutUs from "../../Component/AboutUs/AboutUs";
import Staffs from "../../Component/Staffs/Staffs";
import Facilities from "../../Component/Facilities/Facilities";
import NearByHospitals from "../../Component/NearByHospitals/NearByHospitals";
import Gallery from "../../Component/Gallery/Gallery";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
const Home = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

   const [hover, setHover] = useState(false);
  const [page, setPage] = useState("About");
  const [rightSideHeader, setRightSideHeader] = useState("About Us");
  const handelChangeTab = (pageName) => {
    setPage(pageName);
    switch (pageName) {
      case "About":
        setRightSideHeader("About Us");
        break;
      case "Staffs":
        setRightSideHeader("Our Staffs");
        break;
      case "Facilities":
        setRightSideHeader("Facilities");
        break;
      case "NearByHospitals":
        setRightSideHeader("Near By Hospitals");
        break;
      case "Gallery":
        setRightSideHeader("Gallery");
        break;
    }
  };

  const getComponent = () => {
    switch (page) {
      case "About":
        return <AboutUs />;
      case "Staffs":
        return <Staffs showLoader = {props.showLoader} hideLoader = {props.hideLoader} />;
      case "Facilities":
        return <Facilities showLoader = {props.showLoader} hideLoader = {props.hideLoader}/>;
      case "NearByHospitals":
        return <NearByHospitals showLoader = {props.showLoader} hideLoader = {props.hideLoader}/>;
      case "Gallery":
        return <Gallery showLoader = {props.showLoader} hideLoader = {props.hideLoader}/>;

      default:
        return null;
    }
  };

  return (
    <div className="home">
      <div className="home-block">
        <div className="home-left">
          {user && user?.role !== "student" && <Link
      to="/admin/dashboard"
      className="home-left-option"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "white" : "black",
        textDecoration: 'none',
        
      }}
    >
      <DashboardIcon /> Dashboard
    </Link>}
    {user && user?.role === "student" && <Link
      to={`student/${user._id}`}
      className="home-left-option"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "white" : "black",
        textDecoration: 'none',
        
      }}
    >
      <AccountCircleIcon /> Profile
    </Link>}
          <div
            className={`home-left-option ${
              page === "About" ? "active-opt" : null
            }`}
            onClick={() => {
              handelChangeTab("About");
            }}
          >
            <HomeIcon /> About Us
          </div>
          <div
            className={`home-left-option ${
              page === "Staffs" ? "active-opt" : null
            }`}
            onClick={() => {
              handelChangeTab("Staffs");
            }}
          >
            <PeopleAltIcon /> Staffs
          </div>
          <div
            className={`home-left-option ${
              page === "Facilities" ? "active-opt" : null
            }`}
            onClick={() => {
              handelChangeTab("Facilities");
            }}
          >
            <Diversity3Icon /> Facilities
          </div>
          <div
            className={`home-left-option ${
              page === "NearByHospitals" ? "active-opt" : null
            }`}
            onClick={() => {
              handelChangeTab("NearByHospitals");
            }}
          >
            <LocalHospitalIcon /> Near By Hospitals
          </div>
          <div
            className={`home-left-option ${
              page === "Gallery" ? "active-opt" : null
            }`}
            onClick={() => {
              handelChangeTab("Gallery");
            }}
          >
            <ImageIcon /> Gallery
          </div>
        </div>
        <div className="home-right">
          <div className="home-right-header">{rightSideHeader}</div>
          <div className="home-right-section">{getComponent()}</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
