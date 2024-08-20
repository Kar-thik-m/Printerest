
import Register from "./Authentication/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePin from "./Components/Create/Create";
import Login from "./Authentication/Login/Login";

function App() {


  return (
    <div>
      <Router>

        <Routes>
          <Route index path="/" element={<Register />} />
          <Route path="pin" >
            <Route path="home" element={"Home"} />
            <Route path="create" element={<CreatePin />} />
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
