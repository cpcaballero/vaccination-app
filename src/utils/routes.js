import {lazy} from 'react'
const Landing = lazy(() => import("../pages/login/Landing"))
const MainComponent = lazy( () => import("../components/MainComponent"))
const Profile = lazy( () => import('../pages/Profile'))
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
    path: "/dashboard/profile",
    component: MainComponent,
    content: Profile,
    isPrivate: true,
  },
]
export default routes
