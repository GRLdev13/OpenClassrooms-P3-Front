import MenuSelector from "~/user/settings/menuSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Settings" },
    { name: "description", content: "Manage your account settings" },
  ];
}

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
    return null;
  }

  return <MenuSelector />;
}
