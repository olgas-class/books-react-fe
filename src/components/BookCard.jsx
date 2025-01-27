import { Link } from "react-router-dom";

function BookCard({ book }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="card h-100">
      <img
        src={
          book.image
            ? `${backendUrl}/images/${book.image}`
            : "https://placeholder.pics/svg/300"
        }
        className="card-img-top"
        alt={`Immagine di ${book.title}`}
      />
      <div className="card-body">
        <h5 className="card-title">
          {book.title} <br /> {book.author}
        </h5>
        <p className="card-text">${book.abstract}</p>
        <Link className="btn btn-primary" to={`/books/${book.id}`}>
          Mostra dettagli
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
