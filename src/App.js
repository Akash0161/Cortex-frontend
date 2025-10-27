import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSignUp from './components/Login';
import HomePage from './components/FEED/HomePage';
import Profile from './components/Profile';
import NewPost from './components/NewPost';
import AboutPage from './components/AboutPage';
import Saved from './components/Saved';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSignUp />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Newpost" element={<NewPost />}></Route>
          <Route path="/Aboutpage" element={<AboutPage />}></Route>
          <Route path="/Saved" element={<Saved />}></Route>
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
