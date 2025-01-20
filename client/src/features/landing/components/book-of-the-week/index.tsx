import { BookInformation } from "../../../book";
import "./index.css";

export const BookOfTheWeek = () => {
  return (
    <div className="book-of-the-week">
      <h1>Book of the Week:</h1>
      <BookInformation
        book={{
          _id: "678d42f53fdc72de32a3327b",
          barcode: "1646468456",
          cover: "https://m.media-amazon.com/images/I/718a74M1FNL._SY466_.jpg",
          title:
            "Make Epic Money: More than one lakh copies sold by Ankur Warikoo",
          authors: ["Ankur Warikoo"],
          description:
            "In his groundbreaking book Do Epic Shit, Warikoo dropped this truth bomb: ‘Three relationships determine our life's course - time, money, and ourselves.’ Now, in his third book, Make Epic Money, he dives deep into the complex world of money to provide you with the ultimate personal-finance blueprint. Drawing on a lifetime of experience of financial highs and lows, he shares everything he has learnt about money that he wishes someone had taught him when he was young. Prepare to unlock the secrets to financial well-being with this no-nonsense guide. Say goodbye to confusing jargon and hello to practical advice. Discover how to earn, spend and make your money work just as hard for you as you do for it.",
          subjects: ["personal finance", "self-growth", "finance", "learning"],
          publicationDate: new Date("2024-01-24"),
          publisher: "Penguin Random House India",
          pages: 340,
          genre: "finance",
          records: [],
        }}
      />
    </div>
  );
};
