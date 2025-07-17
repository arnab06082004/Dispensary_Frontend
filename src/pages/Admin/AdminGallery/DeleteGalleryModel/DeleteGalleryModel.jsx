import React from 'react'
import './deleteGalleryModel.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const DeleteGalleryModel = (props) => {
const handleClick = async() =>{
  axios.delete(`http://localhost:4000/api/gallery/delete/${props.click}`,{withCredentials:true}).then((res) => {
    props.fetchData()
    props.onClose()
  }).catch((err) => {
            toast.error(err?.data?.response?.error);
          })
}
  return (
    <div className='add-gallery-model'>
        <div className="a-g-container">
            <div className="a-g-header">Delete Image</div>
            <div className="a-g-btns">
                <div className="a-g-btn" onClick={handleClick}><DeleteIcon/></div>
                <div className="a-g-btn" onClick={props.onClose}>Cancel</div>
            </div>
        </div>
       
        </div>
  )
}

export default DeleteGalleryModel