import TimelinePage from "./pages/TimelinePage/index.js";
import TrendingPage from "./pages/TrendingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    <Router className="App">
      <Routes>
<<<<<<< HEAD
        <Route path="/timeline/hashtag/:hashtag" element={<TrendingPage />} />
=======
        <Route path="/" element={<TrendingPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
>>>>>>> main
      </Routes>
    </Router>
  );
}