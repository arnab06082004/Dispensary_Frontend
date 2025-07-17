import React, { useEffect, useState } from 'react'
import './adminGallery.css'
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddGalleryModel from './AddGalleryModel/AddGalleryModel';
import DeleteGalleryModel from './DeleteGalleryModel/DeleteGalleryModel';
import {ToastContainer ,toast} from 'react-toastify'
import axios from 'axios';
const AdminGallery = (props) => {
  const [model, setModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false)
  const [data , setData] = useState([])
const [click, setClick] = useState(null)

const handelOnOff = () => {
  setModel(prev => !prev)
}
const handelDlt = (id) => {
  setClick(id)
  setDeleteModel(prev => !prev)
}

const fetchData = async() => {
  props.showLoader()
  axios.get("http://localhost:4000/api/gallery/get").then((res) => {
    setData(res.data.gallery)
  }) .catch((err) => {
          toast.error(err?.data?.response?.error);
        })
        .finally(() => {
          props.hideLoader();
        });
}

useEffect(() => {
  fetchData()
}, [])

  return (
    <div className='admin-gallery'>
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      <div className="add-btn" onClick={handelOnOff}>Add</div>
      <div className='Gallery a-margin'>
      {data.map((item, index) => ( <div className='G-img-block a-img' key={index}>
        <img className= 'G-img' onClick={() => handelDlt(item._id)} src={item.link} alt="img" />
      </div>))}

      
    </div>
     {model && <AddGalleryModel onClose = {handelOnOff} fetchData= {fetchData} showLoader= {props.showLoader} hideLoader= {props.hideLoader} />}
     {deleteModel && <DeleteGalleryModel onClose = {handelDlt} click =  {click} fetchData= {fetchData}/>}
    
    </div>
  )
}

export default AdminGallery