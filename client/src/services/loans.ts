import axios from "axios";

const createLoan = async (record: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/loan`,
    record
  );
  return response.data.createdRecord;
};

const updateLoan = async (record: any) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/loan`,
    record
  );
  return response.data.updatedRecord;
};

const loanService = {
  createLoan,
  updateLoan,
};
export default loanService;
