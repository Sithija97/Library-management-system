import { Modal } from "../../../../components";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { setDisplayLoan } from "../../../../store/slices/modal.slice";
import { determineLoanModakContent } from "../../utils";

export const LoanBookModal = () => {
  const dispatch = useAppDispatch();
  const { currentBook } = useAppSelector((state: RootState) => state.books);

  const closeModal = () => dispatch(setDisplayLoan(false));

  return (
    <Modal
      content={currentBook ? determineLoanModakContent(currentBook) : <></>}
      toggleModal={closeModal}
    />
  );
};
