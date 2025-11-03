import { HashRouter, Route, Routes } from 'react-router-dom';
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
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Newpost" element={<NewPost />} />
          <Route path="/Aboutpage" element={<AboutPage />} />
          <Route path="/Saved" element={<Saved />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
