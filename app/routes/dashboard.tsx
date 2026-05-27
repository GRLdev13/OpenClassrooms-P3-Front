import Dashboards from "~/dashboard/dashboards";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return <Dashboards/>;
  // return <h1>Dashboards</h1>;
}

