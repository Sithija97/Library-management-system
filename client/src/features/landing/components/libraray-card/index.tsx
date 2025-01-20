import { useAppDispatch } from "../../../../store";
import { setDisplayLibraryCard } from "../../../../store/slices/modal.slice";
import LibraryCardImg from "../../../../assets/librarycard.png";
import "./index.css";

export const LibraryCard = () => {
  const dispatch = useAppDispatch();

  const handleDisplayModal = () => dispatch(setDisplayLibraryCard(true));

  return (
    <div className="get-library-card">
      <h2>Get A Library Card</h2>
      <img
        src={LibraryCardImg}
        alt="library-card-img"
        className="get-library-card-img"
      />
      <p>
        Learn how to get your own Library card{" "}
        <span className="get-library-card-link" onClick={handleDisplayModal}>
          here.
        </span>
      </p>
    </div>
  );
};
