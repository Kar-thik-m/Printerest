import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Authentication/Login/Login.jsx";
import Register from "../Authentication/Register/Register.jsx";
import Home from "./Home/Home.jsx";
import CreatePin from "./Create/CreatePin.jsx";
import Header from "../Components/Layouts/Header/Header.jsx";
import Pindetail from "../Components/Pindetails/Pindetails.jsx";
import ProtectRoute from "../Components/PrivateRoute/ProtectRoute.jsx";
import Profile from "./Profile/Profile.jsx";
import Updateprofile from "./Profile/Update/UpdateProfile.jsx";
import SearchPin from "../Components/SearchPins/SearchPin.jsx";

const MainPage = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/create" element={<ProtectRoute element={<CreatePin />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pin/:id" element={<ProtectRoute element={<Pindetail />} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<ProtectRoute element={<Profile />} />} />
                <Route path="/updateprofile/:id" element={<ProtectRoute element={<Updateprofile />} />} />
                <Route path="/search/:keyword" element={<ProtectRoute element={<SearchPin />} />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default MainPage;