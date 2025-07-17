import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Header = (props) => {
  const [helplinePopup, setHelplinePopup] = useState(false);
  const [eventPopup, setEventpopup] = useState(false);
  const [helpline, setHelpline] = useState(false);
  const [events, setEvents] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenDropdown = (type) => {
    if (type === "event") setEventPopup(true);
    else if (type === "helpline") setHelplinePopup(true);
  };

  const handleCloseDropdown = (type) => {
    if (type === "event") setEventPopup(false);
    else if (type === "helpline") setHelplinePopup(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // Also close any open dropdowns when closing mobile menu
    setEventpopup(false);
    setHelplinePopup(false);
  };

  // Check if we're on mobile (you can adjust the breakpoint as needed)
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  // Mobile-specific handlers for event and helpline
  const handleMobileEventClick = () => {
    if (isMobile()) {
      setEventpopup(!eventPopup);
    }
  };

  const handleMobileHelplineClick = () => {
    if (isMobile()) {
      setHelplinePopup(!helplinePopup);
    }
  };

  // Mobile-specific handlers for dropdown items
  const handleMobileDropdownItemClick = () => {
    if (isMobile()) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/notification/get`)

        .then((response) => {
          setEvents(response.data.notif);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        });
    };
    fetchData();
  }, [eventPopup]);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const handleOpenPopup = (popup) => {
    if (popup === "event") {
      setEventpopup(true);
    } else {
      setHelpline(true);
    }
  };
  const handleClosePopup = (popup) => {
    if (popup === "event") {
      setEventpopup(false);
    } else {
      setHelpline(false);
    }
  };
  const handleLogin = () => {
    navigate("/login");
    closeMobileMenu();
  };

  const handleLogout = async () => {
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("isLogin", false);
        props.handelLogin(false);
        navigate("/");
        closeMobileMenu();
      })

      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className="header">
      <div className="header-college-details">
        <div className="header-college-details-left">
          <img
            src="https://careers.kreeti.com/assets/new_images/college-logos/HIT_logo-b923901ba30ab8ff6768134270a257eb6277d9751abe587ad2989c3d36e6c5e7.png"
            alt="logo"
            className="header-college-details-left-logo"
          />
          <div>
            <div className="header-college-details-name">
              Haldia Institute of Technology
            </div>
            <div className="header-college-details-place">Haldia</div>
            <div className="header-college-details-name">
              हाल्दिया प्रौद्योगिकी संस्थान
            </div>
            <div className="header-college-details-place">हाल्दिया</div>
          </div>
        </div>

        <div className="header-college-details-right">
          <div className="header-college-social-media">
            <a
              target="_blank"
              className="header-social-media-image1"
              href="https://www.instagram.com/hithaldiaofficial/"
            >
              <img
                src="https://th.bing.com/th/id/OIP.5RwXPrWqv58MznvrOo3_xAHaHw?w=171&h=180"
                alt=""
              />
            </a>
            <a
              target="_blank"
              className="header-social-media-image2"
              href="https://www.youtube.com/@haldiainstituteoftechnolog9046"
            >
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.VuHOUeGFSC77MQo86lQ0wgHaHa?r=0&w=512&h=512&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
            <a
              target="_blank"
              className="header-social-media-image3"
              href="https://www.facebook.com/hithaldiapage/about/"
            >
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.tkUWV6h-KefH5AGFoSqtMgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
            <a
              target="_blank"
              className="header-social-media-image4"
              href="https://x.com/hithaldia"
            >
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.2sCQHLnz7YjsueYw8eZkVAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <div className="navbar">
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <div
          className={`navbar-container ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
        >
          <Link
            to={"/"}
            className={`navbar-links ${location.pathname === "/" ? "active-link" : null}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <div
            onClick={props.isLogin ? handleLogout : handleLogin}
            className={`navbar-links ${location.pathname === "/login" ? "active-link" : null}`}
          >
            {props.isLogin ? "Logout" : "Login"}
          </div>
          <Link
            to={"/stock"}
            className={`navbar-links ${location.pathname === "/stock" ? "active-link" : null}`}
            onClick={closeMobileMenu}
          >
            Stock View
          </Link>
          <div
            className="navbar-links event-link"
            onMouseEnter={() => {
              if (!isMobile()) {
                handleOpenPopup("event");
              }
            }}
            onMouseLeave={() => {
              if (!isMobile()) {
                handleClosePopup("event");
              }
            }}
            onClick={handleMobileEventClick}
          >
            <div className="navbar-link-opt">
              New Events <ArrowDropDownIcon />
            </div>
            {eventPopup && (
              <div className="navbar-dropdown-popup event-pop">
                {events.map((item, index) => (
                  <div
                    className="popup-notification"
                    key={index}
                    onClick={handleMobileDropdownItemClick}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="navbar-links event-link"
            onMouseEnter={() => {
              if (!isMobile()) {
                handleOpenDropdown("helpline");
              }
            }}
            onMouseLeave={() => {
              if (!isMobile()) {
                handleCloseDropdown("helpline");
              }
            }}
            onClick={handleMobileHelplineClick}
          >
            <div className="navbar-link-opt">
              Help Line <ArrowDropDownIcon />
            </div>
            {helplinePopup && (
              <div className="navbar-dropdown-popup event-pop">
                <div
                  className="popup-notification"
                  onClick={handleMobileDropdownItemClick}
                >
                  Ambulance Call - 102
                </div>
                <div
                  className="popup-notification"
                  onClick={handleMobileDropdownItemClick}
                >
                  Women Helpline - 1091
                </div>
                <div
                  className="popup-notification"
                  onClick={handleMobileDropdownItemClick}
                >
                  Child Helpline - 1098
                </div>
                <div
                  className="popup-notification"
                  onClick={handleMobileDropdownItemClick}
                >
                  Police - 100
                </div>
                <div
                  className="popup-notification"
                  onClick={handleMobileDropdownItemClick}
                >
                  Disaster Management - 108
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentPath === "/" && (
        <div className="header-banner">
          <img
            src="https://ishubhamprakash.github.io/it-hit-haldia/static/media/hit-home-l.ed4218e8.jpg"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Header;
