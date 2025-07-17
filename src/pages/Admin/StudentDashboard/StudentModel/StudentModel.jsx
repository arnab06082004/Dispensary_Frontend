import React from "react";
import "./StudentModel.css";
const StudentModel = (props) => {
  
  return (
    <div className="record-model">
      <div className="r-m-scroll">
        {props.history.medicines.map((item, index) => (
          <div key={index}>
            {" "}
            <div className="r-m-date">{props.history.createdAt
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}</div>
            <div className="r-m-table">
              <div className="r-m-table-header">
                <div>Medicine Name</div>
                <div>Quantity</div>
              </div>
              <div className="r-m-table-data">
                <div>{item.name}</div>
                <div>{item.requiredQuantity}</div>
              </div>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentModel;
