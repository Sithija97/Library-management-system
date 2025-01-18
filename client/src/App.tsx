import { RootState, useAppDispatch, useAppSelector } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "remixicon/fonts/remixicon.css";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(
    (state: RootState) => state.authentication
  );

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");

  //   if (userId && !loggedInUser)
  //     dispatch(fetchUser({ userId, property: UserTypes.LOGGED_IN_USER }));
  // }, [loggedInUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
