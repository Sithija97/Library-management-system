import "./index.css";

type IProps = {
  subjects: string[];
};

export const BookSubjects = ({ subjects }: IProps) => {
  return (
    <div className="book-subjects">
      <h3>Book Subjects: </h3>
      <div className="book-info-subjects-box">
        {subjects.map((subject, index) => {
          if (index !== subject.length - 1) {
            return (
              <p className="book-info-subject" key={subject}>
                {subject}
              </p>
            );
          } else {
            <p className="book-info-subject" key={subject}>
              {subject}
            </p>;
          }
        })}
      </div>
    </div>
  );
};
