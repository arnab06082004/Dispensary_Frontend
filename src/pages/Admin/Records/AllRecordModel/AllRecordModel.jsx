import React from 'react'

const AllRecordModel = (props) => {
  return (
    
     <div className="record-model">
      <div className="r-m-header">
       
        <div>{props.allHistory[0]?.student?.name}</div>
        <div>{props.allHistory[0]?.student?.email}</div>
        <div>{props.allHistory[0]?.roll}</div>
      </div>
       <div className="r-m-scroll" >
     {props.allHistory.map((item,index) => ( <div key={index}>
        <div className="r-m-date"> {item.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
        <div className="r-m-table">
          <div className="r-m-table-header">
            <div>Medicine Name</div>
            <div>Quantity</div>
          </div>
          <div >
          {item.medicines.map((item, index) => (<div className="r-m-table-data"  key={index}>
            <div>{item.name}</div>
            <div>{item.requiredQuantity}</div>
          </div>))}
          </div>
        </div>
      </div>))}
      </div>
    </div>
  )
}

export default AllRecordModel