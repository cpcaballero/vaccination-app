import {lazy} from 'react'
const Landing = lazy(() => import("../pages/login/Landing"))
const MainComponent = lazy( () => import("../components/MainComponent"))
const Profile = lazy( () => import('../pages/Profile'))
const Schedules = lazy( () => import('../pages/Schedules'))
const Booking = lazy( () => import('../pages/Booking'))
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
  {
    path: "/dashboard/schedules",
    component: MainComponent,
    content: Schedules,
    isPrivate: true,
  },
  {
    path: "/dashboard/schedules/book",
    component: MainComponent,
    content: Booking,
    isPrivate: true,
  },

]
export default routes
