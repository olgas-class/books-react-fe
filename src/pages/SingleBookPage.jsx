import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

// // Dati iniziali del form non compilato
const initialValues = {
  name: "",
  text: "",
  vote: 0,
};

function SingleBookPage() {
  const { slug } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [book, setBook] = useState(null);
  // Stato di campi del form
  const [formData, setFormData] = useState(initialValues);

  const getBook = () => {
    axios.get(`${backendUrl}/books/${slug}`).then((resp) => {
      setBook(resp.data.data);
    });
  };

  useEffect(() => {
    getBook();
  }, []);

  // funzione che invia i dati del form al server quando viene premuto submit
  const storeReview = (formData) => {
    console.log("Submit review", book.id, formData);
    axios
      .post(`${backendUrl}/books/${book.id}/reviews`, formData)
      .then((resp) => {
        console.log(resp);
        // Azzeriamo i campi del form
        setFormData(initialValues);
        // Se il salvataggio della review è andata a buon fine richiediamo i dati aggiornati del libro dal server
        getBook();
      });
  };

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
              {book.reviews.map((curReview) => (
                <ReviewCard key={curReview.id} review={curReview} />
              ))}
            </div>
          </section>
          <section className="mt-5">
            <div className="row justify-content-center">
              <div className="col-8">
                <h2 className="text-center">Invia una nuova recensione</h2>
                <ReviewForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmitFunction={storeReview}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SingleBookPage;
