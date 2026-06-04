
import Dashboards from "~/dashboard/dashboards";
import MenuSelector from "~/user/settings/menuSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {

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

  return (
      <Dashboards />
  );
}
