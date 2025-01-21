import { createBrowserRouter } from "react-router-dom";
import { CatalogPage, HomePage, LayoutPage, ProfilePage } from "../pages";

export const ROOT = "/";
export const CATELOG = "/catalog";
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
        path: CATELOG,
        element: <CatalogPage />,
      },
      {
        path: RESOURCE,
        element: <CatalogPage />,
      },
      {
        path: PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);
