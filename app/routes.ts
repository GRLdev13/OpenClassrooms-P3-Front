import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "./routes/login-route.tsx"),
    route("register", "./routes/register-route.tsx"),
    route("dashboards", "./dashboard/dashboards.tsx"),
    route("profile", "./routes/profile-route.tsx"),
    route("settings", "./user/settings/menuSelector.tsx"),
        //, [
    // child routes
    // index("./home.tsx"),
    // route("settings", "./settings.tsx"),
//  ]

] satisfies RouteConfig;
