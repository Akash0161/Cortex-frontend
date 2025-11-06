import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaHome, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  setSearchResults,
  showSearch = true, // controls visibility of search bar
}) => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery?.trim()) {
        setSearchResults?.(null); 
        return;
      }
      const res = await axios.get(
        `https://cortex-backend-4h9k.onrender.com/blog/search?query=${searchQuery}`
      );
      setSearchResults?.(res.data.blogs);
      console.log(res.data.blogs);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <nav className="navbar">
      <Link to={"/Home"} style={{ textDecoration: "none", color: "white" }}>
        <div className="navbar-title">
          <h1>Cortex</h1>
        </div>
      </Link>

      <div className="navbar-items">
        <Link to="/Home">
          <button className="nav-btn">
            <FaHome className="icon" />
            <span className="nav-text">Home</span>
          </button>
        </Link>

        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <span className="search-icon" onClick={handleSearch}>
              <IoSearchOutline />
            </span>
          </div>
        )}

        <button className="profile-btn" onClick={handleLogout}>
          <FaUser className="icon" />
          <p>Logout</p>
        </button>

        <button
          onClick={handleShow}
          className="hamburger-btn"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      <Offcanvas show={show} onHide={handleShow} placement="end" className="m11">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="offcanvas-menu">
            <li>
              <Link to="/Home" onClick={handleClose} style={{color:"white"}}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Newpost" onClick={handleClose} style={{color:"white"}}>
                New Post
              </Link>
            </li>
            <li>
              <Link to="/Profile" onClick={handleClose} style={{color:"white"}}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Saved" onClick={handleClose} style={{color:"white"}}>
                Saved
              </Link>
            </li>
            <li>
              <Link to="/Aboutpage" onClick={handleClose} style={{color:"white"}}>
                About
              </Link>
            </li>   
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;