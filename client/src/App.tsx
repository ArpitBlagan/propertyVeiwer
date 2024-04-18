import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";
import Property from "./components/Property";
import { Addform } from "./components/Addform";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Sent from "./components/Sent";
import Query from "./components/Query";
import Favc from "./components/Favc";
function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/property" element={<Property />} />
        <Route path="/add" element={<Addform />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/query" element={<Query />} />
        <Route path="/fav" element={<Favc />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
