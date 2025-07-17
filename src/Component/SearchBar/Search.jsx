import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./search.css";

const Search = (props) => {
  const value = props.value || "";

  const handleOnChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const handelClick = () => {
    if(props.handelClick)
      props.handelClick()
  }

  return (
    <div className={`search-bar ${props.className || ""}`}>
      <input
        className="s-inp"
        type="text"
        placeholder={props.placeholder}
        value={value}
        onChange={handleOnChange}
      />
      <div className="s-btn" onClick={handelClick}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
