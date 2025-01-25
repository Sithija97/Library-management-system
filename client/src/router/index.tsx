import { createBrowserRouter } from "react-router-dom";
import {
  CatalogPage,
  HomePage,
  LayoutPage,
  ProfilePage,
  ResourcePage,
} from "../pages";

export const ROOT = "/";
export const CATALOG = "/catalog";
export const RESOURCE = "/resource/:barcode";
export const PROFILE = "/profile/:userId";

export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: CATALOG,
        element: <CatalogPage />,
      },
      {
        path: RESOURCE,
        element: <ResourcePage />,
      },
      {
        path: PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);
