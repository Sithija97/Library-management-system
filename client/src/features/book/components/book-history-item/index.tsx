import { useNavigate } from "react-router-dom";
import { LoanRecord } from "../../../../models/loan-record";
import { LoanTypes } from "../../../../enums";
import "./index.css";

type IProps = {
  record: LoanRecord;
};

export const BookHistoryItem = ({ record }: IProps) => {
  const navigate = useNavigate();

  const visitProfile = () => navigate(`/profile/${record.patron}`);

  return (
    <div className="book-history-item">
      <h4>
        Status:{" "}
        <span
          className={record.status === LoanTypes.AVAILABLE ? "green" : "red"}
        >
          {record.status}
        </span>
      </h4>
      <div className="book-history-item-group">
        <p style={{ cursor: "pointer" }} onClick={visitProfile}>
          Patron: {record.patron}
        </p>
        <p>Loan Date: {new Date(record.loanedDate).toDateString()}</p>
        {record.status === LoanTypes.AVAILABLE && record.returnedDate && (
          <p>Return Date: {new Date(record.returnedDate).toDateString()}</p>
        )}
      </div>
      <div className="book-history-item-group">
        <p>Loaner: {record.employeeOut}</p>
        <p>Return By Date: {new Date(record.dueDate).toDateString()}</p>
        {record.status === LoanTypes.AVAILABLE && record.employeeIn && (
          <p>Returner: {record.employeeIn}</p>
        )}
      </div>
    </div>
  );
};
