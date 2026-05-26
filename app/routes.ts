import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("dashboards", "./dashboard/dashboards.tsx"
        //, [
    // child routes
    // index("./home.tsx"),
    // route("settings", "./settings.tsx"),
//  ]
),

] satisfies RouteConfig;
