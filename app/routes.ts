import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    //TODO: check middleware for auth routing
    route("login", "./routes/login-route.tsx"),
    route("register", "./routes/register-route.tsx"),
    route("dashboards", "./routes/dashboard-route.tsx"),
    route("settings", "./routes/settings-route.tsx"),
    // route("settings", "./routes/profile-route.tsx"),
        //, [
    // child routes
    // index("./home.tsx"),
    // route("settings", "./settings.tsx"),
//  ]

] satisfies RouteConfig;
