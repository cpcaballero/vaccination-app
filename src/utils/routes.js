import {lazy} from 'react'
const Landing = lazy(() => import("../pages/login/Landing"))
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))

const routes = [
  {
    path: "/login",
    component: Landing,
    isPrivate: false,
  },
  {
    path: "/register",
    component: Landing,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
]
export default routes
