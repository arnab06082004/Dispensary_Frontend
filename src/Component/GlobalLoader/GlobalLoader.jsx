import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";
import "./globalLoader.css";

const GlobalLoader = () => {
  return (
    <div className="global-loader">
      <Box className="loader-box">
        <CircularProgress className="loader" />
      </Box>
    </div>
  );
};

export default GlobalLoader;
