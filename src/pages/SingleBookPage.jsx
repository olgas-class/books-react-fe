import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

function SingleBookPage() {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/books/${id}`).then((resp) => {
      setBook(resp.data.data);
    });
  }, []);

  return (
    <>
      {book && (
        <>
          <section>
            <img
              className="w-50"
              src={`${backendUrl}/images/${book.image}`}
              alt=""
            />
            <h1>{book.title}</h1>
            <h2 className="text-primary">{book.author}</h2>
            <p>Voto: {book.vote_avg}</p>
            <p>Genre: {book.genre}</p>
            <p>{book.abstract}</p>
          </section>
          <section>
            <div className="row row-cols-1 g-3">
              {book.reviews.map(curReview => <ReviewCard key={curReview.id} review={curReview} />)}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SingleBookPage;
