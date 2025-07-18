import React, { useEffect, useState, useCallback } from 'react'
import './adminGallery.css'
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddGalleryModel from './AddGalleryModel/AddGalleryModel';
import DeleteGalleryModel from './DeleteGalleryModel/DeleteGalleryModel';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';

const AdminGallery = (props) => {
  const [model, setModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false)
  const [data, setData] = useState([])
  const [click, setClick] = useState(null)

  const handelOnOff = () => {
    setModel(prev => !prev)
  }

  const handelDlt = (id) => {
    setClick(id)
    setDeleteModel(prev => !prev)
  }

  // Use useCallback to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      props?.showLoader?.();
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/get`);
      setData(response.data.gallery || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      toast.error(err?.response?.data?.error || "Failed to fetch gallery");
    } finally {
      props?.hideLoader?.();
    }
  }, [props]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='admin-gallery'>
      <div className="register-student">
        <Link className="go-back" to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      <div className="add-btn" onClick={handelOnOff}>Add</div>
      <div className='Gallery a-margin'>
        {data.map((item, index) => (
          <div className='G-img-block a-img' key={item._id || index}>
            <img 
              className='G-img' 
              onClick={() => handelDlt(item._id)} 
              src={item.link} 
              alt="img" 
            />
          </div>
        ))}
      </div>
      {model && (
        <AddGalleryModel 
          onClose={handelOnOff} 
          fetchData={fetchData} 
          showLoader={props?.showLoader} 
          hideLoader={props?.hideLoader} 
        />
      )}
      {deleteModel && (
        <DeleteGalleryModel 
          onClose={() => setDeleteModel(false)} 
          click={click} 
          fetchData={fetchData}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default AdminGallery