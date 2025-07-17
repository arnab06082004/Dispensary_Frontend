import React, { useState, useEffect } from "react";
import "./manageEvent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ManageEvent = (props) => {
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState([]);

  // Fetch all events
  const fetchData = async () => {
    try {
      props.showLoader();
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notification/get`);

      setEvents(response.data.notif);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to fetch events");
    } finally {
      props.hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add new event
  const addEvent = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Event name is required");
      return;
    }

    try {
      props.showLoader();

await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notification/add`, { title });

      toast.success("Event added successfully!");
      setTitle("");
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to add event");
    } finally {
      props.hideLoader();
    }
  };
  const handleDelete = async(id) => {
    props.showLoader()
axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notification/delete/${id}`).then((res) => {
      toast.success("Event deleted Successfully")
      fetchData()
    }).catch(err => {
      toast.error(err?.response?.data?.error);
    }).finally(() => props.hideLoader())
  }

  return (
    <div>
      <form className="from" onSubmit={addEvent}>
        <div className="from-div">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="from-input mngBtn"
            placeholder="Event Name"
          />
        </div>
        <button type="submit" className="btn">
          Add
        </button>
      </form>

      <div className="list-staffs">
        {events.length > 0 ? (
          events.map((item, index) => (
            <div className="list-staff" key={index}>
              <div>{item.title}</div>
              <div className="l-s-btns" onClick={() => handleDelete(item._id)}>
                <DeleteIcon />
              </div>
            </div>
          ))
        ) : (
          <div>No Events Found</div>
        )}
      </div>

     
    </div>
  );
};

export default ManageEvent;
