import React, { useState } from 'react'
import './deleteGalleryModel.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteGalleryModel = (props) => {
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    if (!props.click) {
      toast.error("No item selected for deletion");
      return;
    }

    setDeleting(true);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/delete/${props.click}`,
        { withCredentials: true }
      );

      console.log("Delete response:", response.data); // Debug log
      toast.success(response.data.message || "Image deleted successfully");
      
      // Refresh the gallery data
      props.fetchData();
      
      // Close the modal
      props.onClose();

    } catch (err) {
      console.error("Delete error:", err); // Debug log
      console.error("Error response:", err.response); // Debug log
      
      // Fixed error path: err.response.data.error instead of err.data.response.error
      const errorMessage = err?.response?.data?.error || 
                          err?.response?.data?.message || 
                          "Failed to delete image";
      
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className='add-gallery-model'>
      <div className="a-g-container">
        <div className="a-g-header">Delete Image</div>
        <div className="a-g-btns">
          <div 
            className={`a-g-btn ${deleting ? 'disabled' : ''}`} 
            onClick={deleting ? undefined : handleClick}
          >
            <DeleteIcon /> {deleting ? 'Deleting...' : 'Delete'}
          </div>
          <div className="a-g-btn" onClick={props.onClose}>Cancel</div>
        </div>
      </div>
    </div>
  )
}

export default DeleteGalleryModel