import React, { useState, useEffect } from 'react';
import Navbar from './FEED/Navbar';
import './Profile.css';
import axios from 'axios';
import male from './assets/male.png';
import Card from 'react-bootstrap/Card';
import female from './assets/female.png';
import { FaRegBookmark, FaBookmark, FaEdit } from "react-icons/fa";


const Profile = () => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const [savedBlogsIds, setSavedBlogsIds] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userData, setUserData] = useState({
  gender: localStorage.getItem('gender') || 'male',
  description: "Write something about yourself..."
});

  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");




  const userId = localStorage.getItem('user_id');

  // Fetch user details + blogs
  const fetchUser = async () => {
  try {
    const res = await axios.get(`https://cortex-backend-4h9k.onrender.com/user/getUserByIdSimple/${userId}`);
    setUserData(res.data.user || {});
    setNewDescription(res.data.user?.description || "");
  } catch (err) {
    console.log(err.message);
  }
};

  const profileBlogs = async () => {
    try {
      const res = await axios.post("https://cortex-backend-4h9k.onrender.com/blog/user", { userId });
      setUserBlogs(res.data.blogs || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
    profileBlogs();
  }, []);

  // Handle Save / Unsave blogs
  const handleSave = async (blogId) => {
    try {
      const idStr = String(blogId);
      if (savedBlogsIds.includes(idStr)) {
        await axios.post("https://cortex-backend-4h9k.onrender.com/user/removesavedblog", { userId, blogId: idStr });
        setSavedBlogsIds(prev => prev.filter(id => id !== idStr));
      } else {
        await axios.post("https://cortex-backend-4h9k.onrender.com/user/saved", { userId, blogId: idStr });
        setSavedBlogsIds(prev => [...prev, idStr]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Update user description
 const handleDescriptionSave = async () => {
  try {
    const res = await axios.post("https://cortex-backend-4h9k.onrender.com/user/updateDescription", {
      userId,
      description: newDescription
    });
    setUserData(res.data.user);
    setEditing(false);
  } catch (err) {
    console.log(err.message);
  }
};

  return (
    <>
      <Navbar showSearch={false}/>
      <div className="profile-container">
        <div className='profile-side'>
          <div className='profile-left'>
            <div className='profile-img'>
                <img
                  className="profile-pic"
                  src={
                    (userData?.gender?.trim().toLowerCase() || localStorage.getItem('gender')?.toLowerCase() || 'male') === "female"
                      ? female
                      : male
                  }
                  alt="profile"
                />

            </div>

            <div className='profile-name'>
              <h3>{localStorage.getItem("name") || "Unknown User"}</h3>
              <p className='email'>{localStorage.getItem("email") || "No email"}</p>

             <div className='profile-descrip'>
  {editing ? (
    <div className="edit-description">
      <textarea
        value={newDescription}
        placeholder='Write a description about yourself...'
        onChange={(e) => {
          const words = e.target.value.split(/\s+/).filter(Boolean); // split by space
          if (words.length <= 20) {
            setNewDescription(e.target.value);
          }
        }}
        className="description-input"
      />
      <div className="description-buttons">
        <button
          onClick={() => {
            const wordCount = newDescription.split(/\s+/).filter(Boolean).length;
            if (wordCount < 5) {
              alert("Description must have at least 5 words");
            } else {
              handleDescriptionSave();
            }
          }}
          className="save-btn"
        >
          Save
        </button>
        <button onClick={() => setEditing(false)} className="cancel-btn">
          Cancel
        </button>
      </div>
      <p>{`Words: ${newDescription.split(/\s+/).filter(Boolean).length}/20`}</p>
    </div>
  ) : (
    <div className="description-view">
      <p>{userData?.description || "Write a description about yourself..."}</p>
      <button className="edit-btn" onClick={() => setEditing(true)}>
        <FaEdit /> Edit
      </button>
    </div>
  )}
</div>

            </div>
          </div>

          <div className='profile-right'>
            <div className='personal-info'>
              <h3>Personal Information</h3>
            </div>

            <div className='personal-details'>
              <div className='user-info'>
                <p>Name: {localStorage.getItem('name') || "Unknown User"}</p>
                <p>Email: {localStorage.getItem('email') || "Unknown email"}</p>
                <p>Posts: {userBlogs.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='profilePost'>
          <div className='profile-post-nav'>
            <h1>Your Blogs</h1>
            <hr />
          </div>

          <Card className="blog-card">
            {userBlogs.map((blog, i) => (
               <section className='even' key={blog._id}>
                <Card.Body className="blog-header">
                     <div className="blog-author">
                         <div className='author-img'>
                      <img
                      className="author-pic"
                      src={
                        blog.userId?.gender?.toLowerCase() === 'male'
                          ? male
                          : female
                      }
                      alt="profile"
                    />

            </div>  
                    </div>
                  <div className="blog-author">
                    <div>
                      <h6 className="author-name">{blog.userId?.name || "unknown"}</h6>
                      <p className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="header-icons" onClick={() => handleSave(blog._id)}>
                    {savedBlogsIds.includes(String(blog._id)) ? <FaBookmark /> : <FaRegBookmark />}
                  </div>
                </Card.Body>

                <Card.Img variant="top" className="blog-img" src={`https://cortex-backend-4h9k.onrender.com/${blog.image}`} />

                <Card.Body className='Blog-content'>
                  <Card.Title className="blog-title">{blog.Title}</Card.Title>
                  <Card.Title className="blog-category">{blog.Category}</Card.Title>
                  <Card.Text className="blog-text">
                    {expandedPosts[blog._id] ? blog.Description : (blog.Description?.slice(0, 180) || "") + "..."}{" "}
                    <span
                      className="read-more"
                      onClick={() =>
                        setExpandedPosts(prev => ({ ...prev, [blog._id]: !prev[blog._id] }))
                      }
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      {expandedPosts[blog._id] ? "Read Less" : "Read More"}
                    </span>
                  </Card.Text>
                </Card.Body>
              </section>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
