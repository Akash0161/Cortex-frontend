import React, { useState } from 'react';
import './NewPost.css';
import Navbar from './FEED/Navbar';
import imgupload from './assets/upload-icon.png';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const NewPost = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      const url = URL.createObjectURL(e.dataTransfer.files[0]);
      setImageUrl(url);
    }
  };



  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !category || !description) {
      alert('Please fill all fields and upload an image!');
      return;
    }

    try {
      // Upload the image
      const imageData = new FormData();
      imageData.append('image', file);

      const imageUploadResponse = await axios.post(
        'http://localhost:3000/blog/imageupload',
        imageData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const uploadedImagePath = imageUploadResponse.data.imageupload;

      let user_id = localStorage.getItem("user_id")
      console.log(user_id);
      

      // Submit the blog post
      const blogData = { 
        image: uploadedImagePath,
        Title: title,
        Category: category,
        Description: description,
        userId:user_id
        
      };

      const blogResponse = await axios.post(
        'http://localhost:3000/blog/newpost',
        blogData
      );

      if (blogResponse.data.Message === 'Posted Successfully') {
        alert('Blog posted successfully!');
        
        // Reset form
        setImageUrl(null);
        setFile(null);
        setTitle('');
        setCategory('');
        setDescription('');
        navigate('/Home')
      } else {
        alert(blogResponse.data.Message || 'Failed to post blog');
      }

    } catch (error) {
      console.error(error);
      alert('Error posting blog');
    }
  };

  return (
    <>
      <Navbar showSearch={false}/>
      <div className='newpost'>
        <div className='newpost-section'>
          <h2>Create a New Post</h2>
          <form onSubmit={handlesubmit}>
            <label
              htmlFor='input-file'
              id='drop-area'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type='file'
                accept='image/*'
                id='input-file'
                hidden
                onChange={handleFileChange}
              />
              <div
                id='img-view'
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                }}
              >
                {!imageUrl && (
                  <>
                    <img src={imgupload} alt='image' />
                    <p>
                      Drag and drop or click here <br />
                      to upload image
                    </p>
                    <span>Upload any images from desktop</span>
                  </>
                )}
              </div>
            </label>

            <div className='input-title'>
              <h3>Title</h3>
              <input
                type='text'
                className='inp-title'
                value={title}
                placeholder='Enter your title here...'
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className='input-categories'>
              <h3>Category</h3>
              <input
                type='text'
                className='inp-cat'
                value={category}
                placeholder='Enter your category here...'
                onChange={(e) => setCategory(e.target.value)}
                required
                />
              <div className='input-caption'>
                <h3>Description</h3>
                <textarea
                  className='inp-cap'
                  rows={4}
                  maxLength={5500}
                  value={description}
                  placeholder='Write your Content here...'
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <Button type='submit' className='newpost-submit'>
                Post
              </Button>
              
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default NewPost;
