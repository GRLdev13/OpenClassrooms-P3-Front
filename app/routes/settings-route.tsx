import Profile from "~/user/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import SideBar from "~/dashboard/side-bar";
import { clearUser } from "~/stores/userSlice";

export default function SettingsRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }

    setIsAuthenticated(true);
  }, [navigate]);

  if (!isAuthenticated) {
       return null;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      <SideBar onLogout={logout} />
      <Profile />
    </div>
  );
}
