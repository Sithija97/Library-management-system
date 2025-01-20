import {
  BookOfTheWeek,
  ContactUs,
  LibraryCard,
  LibraryHours,
  UpcomingEvents,
} from "../../features/landing";
import "./index.css";

export const HomePage = () => {
  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <BookOfTheWeek />
          <UpcomingEvents />
          <LibraryCard />
        </div>
        <div className="home-page-right">
          <LibraryHours />
          <ContactUs />
        </div>
      </div>
    </div>
  );
};
