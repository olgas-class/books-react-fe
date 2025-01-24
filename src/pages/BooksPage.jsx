import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getBooks = () => {
    const params = {};
    if (search.length > 0) {
      params.search = search;
    }

    axios.get(`${backendUrl}/books`, { params }).then((resp) => {
      setBooks(resp.data.data);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <section>
        <h1>Tutti i libri del mondo!</h1>
        <p>Vedi i libri che abbiamo preparato per te</p>
      </section>
      <section>
        <h2>Elenco di libri</h2>
        <div className="my-4 d-flex">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="form-control"
            type="search"
            aria-label="Cerca libri per parola chiave"
            placeholder="Cerca libro"
          />
          <button onClick={getBooks} className="btn btn-primary ms-2">
            Cerca
          </button>
        </div>
        {books.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {books.map((curBook) => (
              <div className="col" key={curBook.id}>
                <BookCard book={curBook} />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning">
            Non abbiamo trovato nulla. Riprova
          </div>
        )}
      </section>
    </>
  );
}

export default BooksPage;
