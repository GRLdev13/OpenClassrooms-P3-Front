import Profile from "~/user/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function SettingsRoute() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }

    setIsAuthenticated(true);
  }, [navigate]);

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
  }

  return <Profile />;
}
