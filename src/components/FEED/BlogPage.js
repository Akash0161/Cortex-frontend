import React, { useEffect, useState } from 'react';
import "./BlogPage.css";
import Card from 'react-bootstrap/Card';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from 'axios';
import male from '../assets/male.png';
import female from '../assets/female.png';

const BlogPage = ({ searchQuery, searchResults, setSearchResults }) => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const [Allblog, setAllblog] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const userId = localStorage.getItem('user_id');
  const gender = localStorage.getItem('gender')?.toLowerCase() || 'male';


  const toggleExpand = (blogId) => {
    setExpandedPosts(prev => ({ ...prev, [blogId]: !prev[blogId] }));
  }

  const handleSave = async (blogId) => {
    try {
      if (savedBlogs.includes(blogId)) {
        await axios.post("https://cortex-backend-4h9k.onrender.com/user/removesavedblog", { userId, blogId });
        setSavedBlogs(prev => prev.filter(id => id !== blogId));
      } else {
        await axios.post("https://cortex-backend-4h9k.onrender.com/user/saved", { userId, blogId });
        setSavedBlogs(prev => [...prev, blogId]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://cortex-backend-4h9k.onrender.com/blog/postgetall");
      setAllblog(res.data.blog);
      console.log(res.data.blog)
      console.log("Fetched blogs:", res.data.blog.map(b => ({
  name: b.userId?.name,
  gender: b.userId?.gender
})));
    } catch (err) {
      console.log(err.message);
    }
  };

  const bookmark = () => {
    axios.get(`https://cortex-backend-4h9k.onrender.com/user/getbyid/${userId}`)
      .then(res => setSavedBlogs(res.data.blogs.map(i => i._id)))
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    bookmark();
    fetchPosts();
  }, []);

  const blogsToDisplay = searchResults ?? Allblog;

  return (
    
    <div className='blog-page'>
      <Card className="blog-card">
        {blogsToDisplay && blogsToDisplay.map((blog, i) => (
          // <section className={(i % 2 === 0) ? "even" : ''} key={blog._id}>
                    <section className='even' key={blog._id}>

           <Card.Body className="blog-header">
            <div className="blog-author">
                          <div className='author-img'>
                    <img
                        className="author-pic"
                        src={
                          blog?.userId?.gender?.toLowerCase?.() === 'male'
                            ? male
                            : blog?.userId?.gender?.toLowerCase?.() === 'female'
                            ? female
                            : male // fallback (default to male if missing)
                        }
                        alt="profile"
                      />

                          </div>  
              <div>
                <h6 className="author-name">{blog.userId?.name || blog.author?.name}</h6>
                <p className="post-date">
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
              </div>
            </div>
            <div className="header-icons">
              <div className="save-icon" onClick={() => handleSave(blog._id)}>
                {savedBlogs.includes(blog._id) ? <FaBookmark /> : <FaRegBookmark />}
              </div>
            </div>
          </Card.Body>

            <Card.Img variant="top" className="blog-img" src={`https://cortex-backend-4h9k.onrender.com/${blog.image}`} />

            <Card.Body className='Blog-content'>
              <Card.Title className="blog-title">{blog.Title}</Card.Title>
              <Card.Title className="blog-category">{blog.Category}</Card.Title>
              <Card.Text className="blog-text">
                {expandedPosts[blog._id] ? blog.Description : blog.Description.slice(0, 180) + "..."}{" "}
                <span className="read-more" onClick={() => toggleExpand(blog._id)} style={{ color: "blue", cursor: "pointer" }}>
                  {expandedPosts[blog._id] ? "read less" : "read more"}
                </span>
              </Card.Text>
            </Card.Body>
            {/* <hr /> */}
          </section>
        ))}
      </Card>
    </div>
  );
};

export default BlogPage;