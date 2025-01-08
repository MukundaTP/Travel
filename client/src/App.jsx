import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TravelNavbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <TravelNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
