import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section>
        <h1>Benvenuto nella nostra app di libri!</h1>
        <p>
          Qui puoi lasciare la tua recensione e vedere le recensioni degli altri
        </p>
        <Link to="/books" className="btn btn-primary">Vedi tutti i libri</Link>
      </section>
    </>
  );
}

export default HomePage;
