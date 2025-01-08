import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa"; // Import arrow icon
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import TravelNavbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <TravelNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/services" element={<Services />}></Route>
      </Routes>

      {/* Scroll-to-top button */}
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 cursor-pointer animate-bounce"
        >
          <FaArrowUp className="w-10 h-10 text-white bg-gray-900 p-2 rounded-full" />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
