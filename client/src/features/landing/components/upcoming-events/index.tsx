import "./index.css";

export const UpcomingEvents = () => {
  return (
    <div className="upcoming-events">
      <div className="upcoming-events-header-group">
        <i
          className="ri-calendar-event-fill"
          style={{ fontSize: "2.25rem", color: "#3626A7" }}
        />
        <h2>Upcoming Events</h2>
      </div>
      <h3>This Summer</h3>
      <h4>Tuesday's: 10 00 AM - Noon</h4>
      <ul className="upcoming-events-event">
        <li>
          <p>Who: Children to 6th grade</p>
        </li>
        <li>
          <p>Activities: Logic Puzzles, Scratch Programming</p>
        </li>
      </ul>
      <h4>Wednesday's: 10 00 AM - Noon</h4>
      <ul className="upcoming-events-event">
        <li>
          <p>Who: Adults</p>
        </li>
        <li>
          <p>Activities: Craft & Sip - Come enjoy nice beverage and craft</p>
        </li>
      </ul>
      <h4>Thursday's: 10 00 AM - Noon</h4>
      <ul className="upcoming-events-event">
        <li>
          <p>Who: Teens (7th to 12th grade)</p>
        </li>
        <li>
          <p>Activities: Web development Cource - Learn the MERN Stack</p>
        </li>
      </ul>
    </div>
  );
};
