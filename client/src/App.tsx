import { useEffect } from "react";
import { RootState, useAppSelector } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "remixicon/fonts/remixicon.css";
import "./App.css";

function App() {
  const loggedInUser = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
