import React from 'react'
import TableComp from '../Table/TableComp'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const header = ["Sl.no", "Name", "Address", " Contact no."];


const NearByHospitals = (props) => {
const [rowData, setRowData] = useState([])
const formatData = (data) => {
 const newData= data.map((item,index) => {
    return {sl : index+1,name: item.name, address:item.address, contact : item.contact}
  })
  setRowData(newData)
  
}
  useEffect(()=>{
    props.showLoader()
    const fetchData = async() => {
      axios.get("http://localhost:4000/api/hospital/get").then((response) => {
        
        formatData(response.data.hospital)
      }).catch(err => {
         toast.error(err?.response?.data?.error)
      }).finally(() => {
          props.hideLoader()
        })
    }
     fetchData()
  },[])
  return (
    <div><TableComp header = {header}  data = {rowData} /></div>
  )
}

export default NearByHospitals