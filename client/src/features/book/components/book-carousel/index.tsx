import { useState } from "react";
import { Book } from "../../../../models";
import { BookCard } from "../book-card";
import "./index.css";

type IProps = {
  books: Book[];
};

export const BookCarousel = ({ books }: IProps) => {
  const [order, setOrder] = useState<Book[]>(books);

  const moveLeft = () => {
    const item = order[0];
    const reordered = order.slice(1, order.length);
    reordered.push(item);
    setOrder(reordered);
  };

  const moveRight = () => {
    const item = order[order.length - 1];
    let reordered = order.slice(0, order.length - 1);
    reordered = [item, ...reordered];
    setOrder(reordered);
  };

  return (
    <div className="book-carousel">
      <div className="book-carousel-left-button" onClick={moveLeft}>
        {"<"}
      </div>
      <div className="book-carousel-right-button" onClick={moveRight}>
        {">"}
      </div>
      {order.map((item) => (
        <BookCard key={item.barcode} book={item} />
      ))}
    </div>
  );
};
