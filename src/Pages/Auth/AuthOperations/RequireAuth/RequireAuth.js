import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/Loading";
import { Axios } from "../../../../Api/Axios";
import ForbiddenPage from "../../403/ForbiddenPage";

export default function RequireAuth({ allowedRole }) {
  const cookie = Cookie();
  const token = cookie.get("talent-space");
  // console.log(allowedRole);
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  //Get User
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <ForbiddenPage />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
