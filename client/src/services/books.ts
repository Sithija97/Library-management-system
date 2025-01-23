import axios from "axios";

const fetchAll = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/book`);
  return response.data.books;
};

const query = async (payload: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/book/query${payload}`
  );
  return response.data.page;
};

const BookService = { fetchAll, query };
export default BookService;
