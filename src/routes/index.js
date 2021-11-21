import Login from "../pages/login";
import Home from "../pages/home/index";
import PageNotFound from "../pages/pageNotFound";
import UserInfo from "../pages/userInfo";
import ChatRoom from "../pages/chatRoom";
import ManageHome from "../pages/manageHome";
import BookUpdate from "../components/bookUpdate";

export const mainRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/404",
    component: PageNotFound
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/profile",
    component: UserInfo
  },
  {
    path:"/chatRoom",
    component: ChatRoom
  },
  {
    path:"/manage",
    component:ManageHome
  },
  {
    path:"/update",
    component:BookUpdate
  }
];

export const adminRoutes = [
  {

  }
];
