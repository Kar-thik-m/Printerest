
import Register from "./Authentication/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePin from "./Components/Create/Create";

function App() {


  return (
    <div>
      <Router>

        <Routes>
          <Route index path="/" element={<Register/>} />
          <Route path="pin" >
            <Route path="home" element={"Home"} />
            <Route path="create" element={<CreatePin />} />
            <Route path="explore" element={"Explore"} />
            <Route path="profile" element={"profile"} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
