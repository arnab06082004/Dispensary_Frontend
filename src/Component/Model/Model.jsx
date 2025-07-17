import React from "react";
import "./Model.css";
import CloseIcon from "@mui/icons-material/Close";

const Model = (props) => {
  const onClose = () => {
    if (props.handelClose) {
      props.handelClose(props.value);
    }
  };
  return (
    <div className="model">
      <div className="model-card">
        <div className="m-c-header">
          <div className="m-c-h-title">{props.header}</div>
          <div className="m-c-h-icon">
            <CloseIcon sx={{ fontSize: 30 }} onClick={onClose} />
          </div>
        </div>
        <div className="m-c-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Model;
