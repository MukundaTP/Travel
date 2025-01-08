import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TravelNavbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

const App = () => {
  return (
    <BrowserRouter>
      <TravelNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/services" element={<Services />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
