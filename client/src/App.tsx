import { useEffect, useState } from "react";
import { HomePage } from "./page/home-page/home-page";
import { RootState, useAppSelector } from "./store";
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
      <HomePage />
    </>
  );
}

export default App;
