import { Modal } from "../../../../components";
import { useAppDispatch } from "../../../../store";
import { setDisplayLibraryCard } from "../../../../store/slices/modal.slice";
import { RegisterLibraryCardForm } from "../register-library-card-form";
import "./index.css";

export const LibraryCardModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setDisplayLibraryCard(false));

  return (
    <Modal content={<RegisterLibraryCardForm />} toggleModal={closeModal} />
  );
};
