import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import {
  getProfileUserRecords,
  resetProfileUserRecords,
} from "../../../../store/slices/auth.slice";
import { ProfileLoanRecord } from "../profile-loan-record";
import "./index.css";

export const ProfileLoanHistory = () => {
  const dispatch = useAppDispatch();

  const { profileUser, profileUserRecords } = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    if (profileUser) {
      dispatch(getProfileUserRecords(profileUser._id));
    }
    return () => {
      dispatch(resetProfileUserRecords());
    };
  }, [profileUser]);

  return (
    <div className="profile-loan-history">
      <h3 className="profile-loan-header">
        {profileUser?.firstName}'s Item Loan History:
      </h3>
      {profileUserRecords &&
        profileUserRecords.map((record) => (
          <ProfileLoanRecord key={record._id} record={record} />
        ))}
    </div>
  );
};
