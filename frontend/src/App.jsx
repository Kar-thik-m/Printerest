
import Register from "./Authentication/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";
import CreatePin from "./Components/Create/CreatePin.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
function App() {


  return (
    <div>
      <Router>

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="pin" >
            <Route path="home" element={<Home />} />
            <Route path="create" element={<ProtectedRoute> <CreatePin/> </ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
