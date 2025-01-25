import axios from "axios";

const fetchAll = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/book`);
  return response.data.books;
};

const fetchByBarcode = async (payload: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/book/query?barcode=${payload}`
  );

  console.log(response);

  const book = response.data.page.items[0];
  console.log(book);
  if (!book || book.barcode !== payload) {
    throw new Error(
      "Something went wrong, Cannot fetch book by barcode at this moment"
    );
  }
  return book;
};

const query = async (payload: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/book/query${payload}`
  );
  return response.data.page;
};

const BookService = { fetchAll, fetchByBarcode, query };
export default BookService;
