import React, { useState } from "react";
import axios from "axios";
import "./addGalleryModel.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const AddGalleryModel = (props) => {
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
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);
    props?.showLoader?.();

    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      console.log("Uploading to Cloudinary..."); // Debug log
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedUrl = cloudinaryResponse.data.secure_url;
      console.log("Cloudinary upload successful:", uploadedUrl); // Debug log

      // Step 2: Save to your backend
      console.log("Saving to backend..."); // Debug log
      const backendResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/add`,
        { link: uploadedUrl },
        { withCredentials: true }
      );

      console.log("Backend save successful:", backendResponse.data); // Debug log
      toast.success("Image added successfully");

      // Step 3: Refresh the gallery data
      await props.fetchData();

      // Step 4: Close the modal after a short delay
      setTimeout(() => {
        setUploading(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        props.onClose();
      }, 1000);

    } catch (error) {
      console.error("Upload error:", error); // Debug log
      console.error("Error response:", error.response); // Debug log

      setUploading(false);

      // Check if it's a Cloudinary error or backend error
      if (error.response) {
        // Server responded with error status
        const errorMessage = error?.response?.data?.error || 
                            error?.response?.data?.message || 
                            `Upload failed: ${error.response.status}`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        toast.error("Upload failed. Please try again.");
      }
    } finally {
      props?.hideLoader?.();
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
            <img src={previewUrl} alt="Preview" className="preview-img" />
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