import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUpPage/SignUpPage";
import TimelinePage from "./pages/TimelinePage/index.js";
import TrendingPage from "./pages/TrendingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";

export default function App() {

  return (
    <Router className="App">
      <SearchBar/>
      <Routes>
        <Route path="/timeline/hashtag/:hashtag" element={<TrendingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </Router>

  );
}
