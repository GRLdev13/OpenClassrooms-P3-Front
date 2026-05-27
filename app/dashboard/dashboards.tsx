import routes from "~/routes";
// import { Route } from "react-router";
import type { Route } from "./+types/team";
import DashboardDTO from "~/DTO/*";
export default function Dashboards() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <h1>test</h1>
    </main>
  );
}

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`back.test/dashboarding/`);
  const dashboard = await res.json();
  return dashboard;
}

const array = ({ array : DashboardDTO }) => {
  return (
    <ul>
      {array.map((note, index) => (
        <li key={index}>
          {note.content} - Priority: {note.priority}
        </li>
      ))}
    </ul>
  );
};

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}
