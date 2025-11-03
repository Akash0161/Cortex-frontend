import React, { useState, useEffect } from 'react'
import "./Saved.css"
import Navbar from './FEED/Navbar';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import male from './assets/male.png';
import female from './assets/female.png'
import { FaRegBookmark, FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";


const Saved = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    
    const [savedBlogsIds, setSavedBlogsIds] = useState([])
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState(null); // filtered blogs


  const fetchSavedBlogs = async () => {
    try {
     const res = await axios.get(`https://cortex-backend-4h9k.onrender.com/user/getbyid/${userId}`);
     console.log(res.data.blogs) 
     setSavedBlogs(res.data.blogs);
        setSavedBlogsIds(() => res.data.blogs.map(i => i._id))
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUnsave = async (blogId) => {
    try {
      await axios.post("https://cortex-backend-4h9k.onrender.com/user/removesavedblog", {
        userId: userId,
        blogId: blogId,
      });

      // To Update UI immediately
      setSavedBlogs(prev => prev.filter(blog => blog._id !== blogId));
      setSavedBlogsIds(prev => prev.filter(id => id !== blogId));

    } catch (err) {
      console.error("Failed to unsave:", err.message);
    }
  };

  useEffect(() => {
    fetchSavedBlogs();
  }, []);

const handleSearch = () => {
  if (!searchQuery.trim()) {
    setSearchResults(null); // show all saved blogs if query empty
    return;
  }

  const filtered = savedBlogs.filter(blog => 
    blog.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.userId?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setSearchResults(filtered);
};


  return (
    <>
      <Navbar showSearch={false}/>
      <div className='SavedPage'>
        <h1>Saved Posts</h1>
        {!savedBlogs.length? (
          <p>No saved posts yet.</p>
        ) : (
               <Card className="blog-card">
        {(searchResults ?? savedBlogs)?.map((blog, i) => (
          // <section className={(i%2==0)?"even":'odd'} id='blg'> 
          <section className="even" > 
            <Card.Body className="blog-header" key={blog._id}>
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
                <div>
                  <h6 className="author-name">{blog.userId?.name}</h6>
                  <p className="post-date">
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
                </div>
              </div>
        
              <div className="header-icons">
                {/* <div 
                  className="like-icon" 
                  onClick={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
                  <span className="like-count">{likeCount}</span>
                </div> */}
               <div
                  className="save-icon"
                  onClick={() => handleUnsave(blog._id)} 
                >
                  {savedBlogsIds.includes(blog._id) ? <FaBookmark /> : <FaRegBookmark />}
                </div>
              </div>
            </Card.Body>
        
            <Card.Img variant="top" className="blog-img" src={`https://cortex-backend-4h9k.onrender.com/${blog.image}`} />
        
            <Card.Body className='Blog-content'>
              <Card.Title className="blog-title">
                {`${blog.Title}`}
              </Card.Title>
              <Card.Title className="blog-category">
                {`${blog.Category}`}
              </Card.Title>
              <Card.Text className="blog-text" style={{marginRight:"0px"}}>
                {isExpanded ? blog.Description : blog.Description.slice(0, 180) + "..."}{" "}
                <span
                  className="read-more"
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
              </Card.Text>
            </Card.Body>
          </section>
  
        ))}
          
      </Card>
        )}
      </div>
    </>
  );
};

export default Saved;