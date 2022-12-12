import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import React from "react";
import Footer from "./components/footer";

function App() {
  const [user, setUser] = React.useState(sessionStorage.getItem('user_id'));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
