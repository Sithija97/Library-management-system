import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { User } from "../../../../models/user";
import { useNavigate } from "react-router-dom";
import {
  resetAuthState,
  resetUser,
  updateUser,
} from "../../../../store/slices/auth.slice";
import { UserTypes } from "../../../../enums";
import { ROOT } from "../../../../router";
import "./index.css";

export const UpdateUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState) => state.authentication);

  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(userState.profileUser);

  const handleUserDataChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDisplayUpdate(true);
    if (value && name && user) setUser({ ...user, [name]: value });
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) dispatch(updateUser(user));
    setDisplayUpdate(false);
  };

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    dispatch(resetUser(UserTypes.LOGGED_IN_USER));
    dispatch(resetUser(UserTypes.PROFILE_USER));
    dispatch(resetAuthState());
    navigate(ROOT);
  };

  useEffect(() => {
    if (!user) setUser(userState.profileUser);
  }, [user, userState.profileUser]);

  return (
    <form onSubmit={handleUpdateUser} className="update-user-form">
      <div className="update-user-input-group">
        <h4>First Name</h4>
        <input
          type="text"
          className="update-user-input"
          name="firstName"
          value={user?.firstName}
          onChange={handleUserDataChnage}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <i
            className="ri-pencil-fill"
            style={{ position: "absolute", top: "65%", right: "0" }}
          />
        )}
      </div>

      <div className="update-user-input-group">
        <h4>Last Name</h4>
        <input
          type="text"
          className="update-user-input"
          name="lastName"
          value={user?.lastName}
          onChange={handleUserDataChnage}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <i
            className="ri-pencil-fill"
            style={{ position: "absolute", top: "65%", right: "0" }}
          />
        )}
      </div>

      <div className="update-user-input-group">
        <h4>Email</h4>
        <input
          type="email"
          className="update-user-input"
          name="email"
          value={user?.email}
          onChange={handleUserDataChnage}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <i
            className="ri-pencil-fill"
            style={{ position: "absolute", top: "65%", right: "0" }}
          />
        )}
      </div>
      {displayUpdate && (
        <button className="profile-button" type="submit">
          Update Profile
        </button>
      )}
      {/* {userState.loggedInUser?._id === userState.profileUser?._id && ( */}
      <button className="profile-button" type="button" onClick={handleLogOut}>
        Logout from Account
      </button>
      {/* )} */}
    </form>
  );
};
