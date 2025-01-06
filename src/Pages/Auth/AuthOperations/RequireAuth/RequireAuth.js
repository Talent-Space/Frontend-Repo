import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER, baseURL } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/Loading";

export default function RequireAuth() {
  const cookie = Cookie();
  const token = cookie.get("talent-space");

  const navigate = useNavigate();

  //Get User
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}/${USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => navigate("/login", {replace: true}));
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
