import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import "./index.css";
import { useEffect } from "react";
import { UserRoles, UserTypes } from "../../enums";
import { fetchUser } from "../../store/slices/auth.slice";
import { ROOT } from "../../router";
import { UpdateUserForm } from "../../features/profile";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loggedInUser, profileUser } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    if (
      loggedInUser?._id === userId ||
      loggedInUser?.type === UserRoles.EMPLOYEE
    ) {
      dispatch(
        fetchUser({
          userId,
          property: UserTypes.PROFILE_USER,
        })
      );
    } else {
      navigate(ROOT);
    }
  }, [userId]);

  return (
    <div className="page">
      <div className="page-container">
        <h1>{`${profileUser?.firstName} ${profileUser?.lastName}'s Profile`}</h1>
        <div className="profile-page-cols">
          <div className="profile-page-left-column">
            <UpdateUserForm />
          </div>
          <div className="profile-page-right-column"></div>
        </div>
      </div>
    </div>
  );
};
