import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Categories.css'
import travel from '../assets/travel-emoji.png'
import tech from '../assets/tech-emoji.png'
import food from '../assets/food-emoji.png'
import movie from '../assets/movie-emoji.webp'
import book from '../assets/book-emoji.webp'




const Categories = ({
  selectedCategory,
  setSelectedCategory,
  setSearchResults
}) => {
  const categories = [
    { name: 'Travel', icon: travel },
    { name: 'Food', icon: food },
    { name: 'Tech', icon: tech },
    { name: 'Movie', icon: movie },
    
  ]
const [loading, setLoading] = useState(false);
  const handleSuggestionClick = (category) => {
    setSelectedCategory(category);
  }

  const handleSearch = async () => {
    try {
      if (!selectedCategory?.trim()) {
        setSearchResults?.(null);
        return;
      }
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/blog/search?query=${selectedCategory}`
      );
      setSearchResults?.(res.data.blogs);
    } catch (err) {
      console.log(err.message);
    }finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  return (
    <div className='categories'>
      <div className='sugg'>
        <h1 className='suggest'>Suggestions</h1>
      </div>

      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => handleSuggestionClick(category.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSuggestionClick(category.name) }}
          >
            <img src={category.icon} alt={`${category.name} icon`} className="category-icon" />
            <span className='category-name'>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
