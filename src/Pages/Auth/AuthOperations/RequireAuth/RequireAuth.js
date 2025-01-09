import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/Loading";
import { Axios } from "../../../../Api/Axios";

export default function RequireAuth() {
  const cookie = Cookie();
  const token = cookie.get("talent-space");

  const navigate = useNavigate();

  //Get User
  const [user, setUser] = useState("");

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
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
