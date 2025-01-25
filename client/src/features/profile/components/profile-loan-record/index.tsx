import { LoanTypes } from "../../../../enums";
import { LoanRecord } from "../../../../models/loan-record";
import "./index.css";

type IProps = {
  record: LoanRecord;
};

export const ProfileLoanRecord = ({ record }: IProps) => {
  return (
    <div className="profile-record">
      <h6>Title: {record.item.title}</h6>
      <h6>
        Status: {record.status === LoanTypes.AVAILABLE ? "RETURNED" : "LOANED"}
      </h6>
      <p>Loan Date: {new Date(record.loanedDate).toDateString()}</p>
      {record.returnedDate && (
        <p>Return by Date: {new Date(record.returnedDate).toDateString()}</p>
      )}
    </div>
  );
};
