import "./index.css";

type IProps = {
  toggleModal(): void;
  content: JSX.Element;
};

export const Modal = ({ toggleModal, content }: IProps) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h5 className="modal-exit" onClick={toggleModal}>
          x
        </h5>
        {content}
      </div>
    </div>
  );
};
