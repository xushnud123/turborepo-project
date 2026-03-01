import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("login", "routes/auth/login/login.tsx"),
    route("forgot-password", "routes/auth/forgot-password/forgot-password.tsx"),
    route("register", "routes/auth/register/register.tsx"),
  ]),
  layout("./routes/dashboard/private-route.tsx", [
    layout("./routes/dashboard/layouts.tsx", [
      route("dashboard", "routes/dashboard/dashboard.tsx", [
        route("personal", "routes/dashboard/profile/profile.tsx"),
        route("add-product", "routes/dashboard/add-product/add-product.tsx"),
        route("product", "routes/dashboard/table-data/table-data.tsx"),
      ]),
    ]),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
