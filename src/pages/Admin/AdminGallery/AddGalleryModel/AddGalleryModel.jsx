import React, { useState } from "react";
import axios from "axios";
import "./addGalleryModel.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

const AddGalleryModel = (props) => {
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      
      const uploadedUrl = response.data.secure_url;
      setData(response.data.secure_url);

        props.showLoader()
        await axios
          .post(
            "http://localhost:4000/api/gallery/add",
            { link: uploadedUrl },
            { withCredentials: true }
          )
          .then((res) => {toast.success("Image added successfully")
            props.fetchData()
          })
          .catch((err) => {
            toast.error(err?.data?.response?.error);
          })
          .finally(() => {
            props.hideLoader();
          });
      

      // Small delay for UX
      setTimeout(() => {
        setUploading(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        props.onClose(); //
      }, 1000);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed! Try again.");
      setUploading(false);
    }
  };

  return (
    <div className="add-gallery-model">
      {uploading && (
        <div className="upload-overlay">
          <CircularProgress size={60} color="inherit" />
        </div>
      )}

      <div className="a-g-container">
        <div className="a-g-header">Add Image</div>

        {previewUrl && (
          <div className="a-g-preview">
            <img
              src={previewUrl}
              alt="Preview"
              className="preview-img"
              
            />
          </div>
        )}

        <div className="a-g-btns">
          <label htmlFor="fileInput" className="a-g-btn">
            <CloudUploadIcon /> Upload
          </label>
          <input
            accept="image/*"
            type="file"
            id="fileInput"
            className="hide"
            onChange={handleFileChange}
          />

          {selectedFile && !uploading && (
            <div className="a-g-btn" onClick={handleUpload}>
              Submit
            </div>
          )}

          <div className="a-g-btn" onClick={props.onClose}>
            Cancel
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AddGalleryModel;
