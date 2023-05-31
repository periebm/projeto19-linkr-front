import TrendingPage from "./pages/TrendingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/timeline/hashtag/:hashtag" element={<TrendingPage />} />
      </Routes>
    </Router>
  );
}