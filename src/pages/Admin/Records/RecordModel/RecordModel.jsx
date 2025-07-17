import React from "react";
import "./recordModel.css";

const RecordModel = (props) => {
  return (
    <div className="record-model">
      <div className="r-m-header">
        <div>{props.selectedHistory?.student?.name}</div>
        <div>{props.selectedHistory?.student?.email}</div>
        <div>{props.selectedHistory?.roll}</div>
      </div>
      <div className="r-m-scroll">
        <div className="r-m-date"> {props.selectedHistory.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
        <div className="r-m-table">
          <div className="r-m-table-header">
            <div>Medicine Name</div>
            <div>Quantity</div>
          </div>
          <div  >
          {props.selectedHistory.medicines.map((item, index) => (<div className="r-m-table-data" key={index}>
            <div>{item.name}</div>
            <div>{item.requiredQuantity}</div>
          </div>))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordModel;
