import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Summary from "./components/Summary";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="w-[500px] min-h-[600px]">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
