// Icon Imports
import { MdHome, } from "react-icons/md";

import MainDashboard from "./page/Home";


const routes: RoutesType[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  }
];
export default routes;
