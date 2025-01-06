import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/AuthOperations/Login/Login";
import Register from "./Pages/Auth/AuthOperations/Register/Register";
import HomePage from "./Pages/Website/HomePage/HomePage";
import ResetPassword from "./Pages/Auth/AuthOperations/RestPassword/RestPassword";
import NewPassword from "./Pages/Auth/AuthOperations/ForgetPassword/NewPassword";
import CheckEmail from "./Pages/Auth/AuthOperations/CheckEmail/CheckEmail";
import About from "./Pages/Website/About/About";
import HomeInvestor from "./Pages/Website/HomeInvestor/HomeInvestor";
import Categories from "./Pages/Website/Categories/Categories";
import Profile from "./Pages/Website/Profiles/TalentProfile/Profile";
import EditProfile from "./Pages/Website/Profiles/TalentEditProfile/EditProfile";
import Users from "./Pages/Website/Admin/Dashboard/Users/Users";
import RequireAuth from "./Pages/Auth/AuthOperations/RequireAuth/RequireAuth";
import Dashboard from "./Pages/Website/Admin/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* AuthOperations */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="newPassword" element={<NewPassword />} />
        <Route path="checkEmail" element={<CheckEmail />} />

        <Route element={<RequireAuth />}>
          {/* Main Website Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />

          {/* Reduendent Pages */}
          {/* Investor */}
          <Route path="/homeInvestor" element={<HomeInvestor />} />

          {/* Talent */}
          <Route path="/profileTalent" element={<Profile />}>
            <Route path="editProfileTalent" element={<EditProfile />} />
          </Route>

          {/* Admin */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
