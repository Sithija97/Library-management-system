import axios from "axios";

const getCard = async (card: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/card/${card}`
  );
  return response.data.card;
};

const libraryCardService = {
  getCard,
};
export default libraryCardService;
