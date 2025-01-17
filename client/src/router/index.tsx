import { createBrowserRouter } from "react-router-dom";
import { HomePage, LayoutPage } from "../pages";

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
        element: <p>catelog</p>,
      },
      {
        path: RESOURCE,
        element: <p>resource</p>,
      },
      {
        path: PROFILE,
        element: <p>profile</p>,
      },
    ],
  },
]);
