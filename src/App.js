import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUpPage/SignUpPage";
import TimelinePage from "./pages/TimelinePage/index.js";
import TrendingPage from "./pages/TrendingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import UserProfilePage from "./pages/UserProfilePage";

export const UserContext = createContext();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storageUserInfo) setUserInfo(storageUserInfo);
  }, []);

  return (
    <Router className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/hashtag/:hashtag" element={<TrendingPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />

        </Routes>
      </UserContext.Provider>
    </Router>

  );
}
