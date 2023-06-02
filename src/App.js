import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUpPage/SignUpPage";
import TimelinePage from "./pages/TimelinePage/index.js";
import TrendingPage from "./pages/TrendingPage";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export default function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
  }, []);

  return (
    <Router className="App">
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Routes>
          <Route path="/timeline/hashtag/:hashtag" element={<TrendingPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </UserContext.Provider>
    </Router>

  );
}
