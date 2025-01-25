import { UserRoles } from "../../enums";
import {
  BookOfTheWeek,
  ContactUs,
  LibraryCard,
  LibraryHours,
  UpcomingEvents,
} from "../../features/landing";
import { RootState, useAppSelector } from "../../store";
import "./index.css";

export const HomePage = () => {
  const { loggedInUser } = useAppSelector(
    (state: RootState) => state.authentication
  );
  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <BookOfTheWeek />
          <UpcomingEvents />
          {loggedInUser?.type === UserRoles.PATRON && <LibraryCard />}
        </div>
        <div className="home-page-right">
          <LibraryHours />
          <ContactUs />
        </div>
      </div>
    </div>
  );
};
