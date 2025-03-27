import { Navigate, Route, Routes } from "react-router-dom";
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
import EditProfile from "./Pages/Website/Users/Talent/EditProfile/EditProfile";
import RequireAuth from "./Pages/Auth/AuthOperations/RequireAuth/RequireAuth";
import SavedVideos from "./Pages/Website/Components/SavedVideos/SavedVideos";
import Profile from "./Pages/Website/Components/Profile/Profile";
import MentorProfile from "./Pages/Website/Users/Mentor/MentorProfile";
import Err404 from "./Pages/Auth/404/Err404";
import RequireBack from "./Pages/Auth/AuthOperations/RequireBack/RequireBack";
import AddUser from "./Pages/Website/Users/Admin/Dashboard/AddUser/AddUser";
import EditUser from "./Pages/Website/Users/Admin/Dashboard/EditUser/EditUser";
import Users from "./Pages/Website/Users/Admin/Dashboard/Users/Users";
import Dashboard from "./Pages/Website/Users/Admin/Dashboard/Dashboard";
import MyProfile from "./Pages/Website/Users/Talent/TalentProfile/MyProfile";
import UploadPage from "./Pages/Website/Components/UploadVideo/UploadPage";
import GoogleAuthCallback from "./Pages/Auth/AuthOperations/GoogleAuthCallback/GoogleAuthCallback";
import Feedbacks from "./Pages/Website/Components/Feedbacks/Feedbacks";
import PeopleTrains from "./Pages/Website/Components/PeopleTrains/PeopleTrains";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* AuthOperations */}
        <Route element={<RequireBack />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/callback" element={<GoogleAuthCallback />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="checkEmail" element={<CheckEmail />} />
        </Route>

        {/* Main Website Pages */}
        <Route element={<RequireAuth allowedRole={["Investor"]} />}>
          <Route path="/homeInvestor" element={<HomeInvestor />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/*" element={<Err404 />} />

        {/* Reduendent Pages */}

        {/* Talent */}
        <Route element={<RequireAuth allowedRole={["Talent", "Mentor", "Investor"]} />}>
          <Route path="/profile" element={<Profile />}>
            <Route element={<RequireAuth allowedRole={["Talent"]} />}>
              <Route path="talent-profile" element={<MyProfile />} />
              <Route path="saved-videos" element={<SavedVideos />} />
              <Route path="edit-profile-talent" element={<EditProfile />} />
              <Route path="upload" element={<UploadPage />} />
            </Route>
            {/* Mentor */}
            <Route element={<RequireAuth allowedRole={["Mentor"]} />}>
              <Route path="mentor-profile" element={<MentorProfile />} />
              <Route path="feedbacks" element={<Feedbacks />} />
              <Route path="people-trains" element={<PeopleTrains />} />
              <Route path="edit-profile-mentor" element={<EditProfile />} />
            </Route>
            {/* Investor */}
            <Route element={<RequireAuth allowedRole={["Investor"]} />}>
              <Route path="investor-profile" element={<MentorProfile />} /> {/* create InvestorProfile component */}
              <Route path="my-investments" element={<Feedbacks />} /> {/* create my investments component */}
              <Route path="edit-profile-investor" element={<EditProfile />} />
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
