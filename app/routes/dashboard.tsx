import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { Dashboards } from "~/dashboard/dashboards";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  // let team = await fetchTeam(params.teamId);
  return { name: "toto" };
}

export default function Component({
  loaderData,
}: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}

// export default function Home() {
//   return <Dashboards />;
// }

// export default function MyRouteComponent({
//   loaderData,
//   actionData,
//   params,
//   matches,
// }: Route.ComponentProps) {
//   return (
//     <div>
//       <h1>Welcome to My Route with Props!</h1>
//       <p>Loader Data: {JSON.stringify(loaderData)}</p>
//       <p>Action Data: {JSON.stringify(actionData)}</p>
//       <p>Route Parameters: {JSON.stringify(params)}</p>
//       <p>Matched Routes: {JSON.stringify(matches)}</p>
      
//     </div>
//   );
// }

