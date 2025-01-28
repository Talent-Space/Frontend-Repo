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
import EditProfile from "./Pages/Website/Profiles/Talent/EditProfile/EditProfile";
import Users from "./Pages/Website/Admin/Dashboard/Users/Users";
import RequireAuth from "./Pages/Auth/AuthOperations/RequireAuth/RequireAuth";
import Dashboard from "./Pages/Website/Admin/Dashboard/Dashboard";
import MyProfile from "./Pages/Website/Profiles/Talent/TalentProfile/MyProfile";
import SavedVideos from "./Pages/Website/Components/SavedVideos/SavedVideos";
import Profile from "./Pages/Website/Components/Profile/Profile";
import EditUser from "./Pages/Website/Admin/Dashboard/EditUser/EditUser";
import AddUser from "./Pages/Website/Admin/Dashboard/AddUser/AddUser";
import MentorProfile from "./Pages/Website/Profiles/Mentor/MentorProfile";
import Err404 from "./Pages/Auth/404/Err404";
import RequireBack from "./Pages/Auth/AuthOperations/RequireBack/RequireBack";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* AuthOperations */}
        <Route element={<RequireBack />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="checkEmail" element={<CheckEmail />} />
        </Route>

        {/* Main Website Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/*" element={<Err404 />} />

        {/* Reduendent Pages */}

        {/* Investor */}
        <Route path="/homeInvestor" element={<HomeInvestor />} />

        {/* Talent */}
        <Route element={<RequireAuth allowedRole={["Talent", "Mentor"]} />}>
          <Route path="/profile" element={<Profile />}>
            <Route element={<RequireAuth allowedRole={["Talent"]} />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="saved-videos" element={<SavedVideos />} />
              <Route path="edit-profile-talent" element={<EditProfile />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["Mentor"]} />}>
              <Route path="mentor" element={<MentorProfile />} />
            </Route>
          </Route>
        </Route>

        {/* Admin */}

        <Route element={<RequireAuth allowedRole={["Admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={"Admin"} />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="users" element={<Users />} />
              <Route path="user/add-user" element={<AddUser />} />
              <Route path="users/:id" element={<EditUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
