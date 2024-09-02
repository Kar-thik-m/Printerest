
import Register from "./Authentication/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";
import CreatePin from "./Components/Create/CreatePin.jsx";
import Header from "./Components/Layouts/Header/Header.jsx";
import { Loaduser } from "./Action/Users.jsx";
import Pindetails from "./Components/Pindetails/Pindetails.jsx";
import { useEffect } from "react";
import store from "./Slice/Store.js";
function App() {
useEffect(()=>{
store.dispatch(Loaduser);
},[])

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/create" element={<CreatePin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pin/:id" element={<Pindetails/>} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      
      </Router>
    </div>
  )
}

export default App
