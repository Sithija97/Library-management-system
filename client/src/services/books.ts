import axios from "axios";

const fetchAll = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/book`);
  return response.data.books;
};

const BookService = { fetchAll };
export default BookService;
