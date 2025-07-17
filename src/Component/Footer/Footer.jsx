import React from "react";
import "./footer.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CloudIcon from '@mui/icons-material/Cloud';

const Footer = () => {
  return (
    <div className="footer">
      <div className="f-left">
        <img
          className="f-logo"
          src="https://img.jagranjosh.com/images/2022/June/662022/HITHaldia.png"
          alt=""
        />
        <div className="f-text">Haldia Institute of Technology</div>
        <div className="f-text">Haldia</div>
        <div className="f-text-sm">Haldia, Purba-Medinipur,721657</div>
        <div className="f-text-sm">
          <PhoneIcon /> (+91324)252900
        </div>
        <div className="f-text-sm">
          <EmailIcon /> admin@hithaldia.in
        </div>
      </div>
      <div className="f-center">
        <div className="f-links">
          <div className="f-text">Important Links</div>
          <a href="https://hithaldia.ac.in/" className="f-link" target="_blank">
            Official Website
          </a>
          <a href="https://hitadmission.in/" className="f-link" target="_blank">
            Admission
          </a>
          <a
            href="https://hithaldia.ac.in/anti-ragging-cell/"
            className="f-link"
            target="_blank"
          >
            Anti Ragging
          </a>
          <a
            href="https://hithaldia.ac.in/placement/"
            className="f-link"
            target="_blank"
          >
            Placement Cell
          </a>
        </div>
      </div>
      <div className="f-right">
        <div className="f-r-name"><CloudIcon/> Haldia Institute of Technology</div>
        <div className="f-r-date">{new Date().toDateString()}</div>
      </div>
    </div>
  );
};

export default Footer;
