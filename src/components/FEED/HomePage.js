import React, { useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import BlogPage from "./BlogPage";
import Categories from "./Categories";
import "./HomePage.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // shared state
  const [searchResults, setSearchResults] = useState(null); // blogs from search
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="home-layout">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setSearchResults={setSearchResults} 
      />
      <div className="content-layout">
        <Menu />
        <BlogPage 
          searchQuery={searchQuery} 
          searchResults={searchResults} 
          setSearchResults={setSearchResults} 
        />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSearchResults={setSearchResults}
         />
      </div>
    </div>
  );
};

export default HomePage;
