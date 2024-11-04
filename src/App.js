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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Main Website Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />


        {/* Reduendent Pages */}
        <Route path="/homeInvestor" element={<HomeInvestor />} />

        {/* AuthOperations */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="newPassword" element={<NewPassword />} />
        <Route path="checkEmail" element={<CheckEmail />} />
      </Routes>
    </div>
  );
}

export default App;
