import Issue from "@/pages/issue";
import NoAccess from "@/layouts/admin/NoAccess";
import AI from "@/pages/ai";
import { lazy } from "react";

const Admin = lazy(() => import("@/pages/admin"));
const Home = lazy(() => import("@/components/admin/Home"));
const User = lazy(() => import("@/components/admin/User"));
const Administrator = lazy(() => import("@/components/admin/Administrator"));
const UserTable = lazy(() => import("@/components/admin/GeneralUser"));

export const router = [
  {
    path: "/",
    element: <AI />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "User",
        element: <User />,
        children: [
          {
            index: true,
            element: <UserTable />,
          },
          {
            path: "administrator",
            element: <Administrator />,
          },
        ],
      },
      {
        path: "*",
        element: <NoAccess />,
      },
    ],
  },
  {
    path: "/issue",
    element: <Issue />,
  },
];
