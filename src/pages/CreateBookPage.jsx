import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBookPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const defalutForm = {
    title: "",
    author: "",
    genre: "",
    abstract: "",
    image: "",
  };

  const [bookData, setBookData] = useState(defalutForm);

  const navigate = useNavigate();

  const handelInputChange = (event) => {
    // console.log(event.target.name, event.target.files[0]);
    const inputName = event.target.name;
    if (inputName === "image") {
      // La gestione separata per il tipo file
      const imageFile = event.target.files[0];
      const newObject = { ...bookData, image: imageFile };
      setBookData(newObject);
    } else {
      const value = event.target.value;
      const newObject = {
        ...bookData,
        [inputName]: value,
      };
      setBookData(newObject);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Non possiamo inviare il file tramite JSON, quindi creiamo l'oggetto FormData
    const dataToSend = new FormData();

    // dataToSend.append("title", bookData.title);
    // dataToSend.append("author", bookData.author);
    // dataToSend.append("abstract", bookData.abstract);
    for (let key in bookData) {
      dataToSend.append(key, bookData[key]);
    }

    axios
      .post(`${backendUrl}/books`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Serve per dire al server che i dati contengono anche i file
        },
      })
      .then((resp) => {
        // Quando arriva il messaggio di conferma facciamo redirect alla pagina di libri
        navigate("/books");
      });
  };

  return (
    <>
      <h1>aggiungi qui il nuovo libro</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title">titolo:</label>
          <input
            required
            minLength="3"
            type="text"
            className="form-control"
            name="title"
            id="title"
            value={bookData.title}
            onChange={handelInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author">autore:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            id="author"
            value={bookData.author}
            onChange={handelInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre">genere:</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            id="genre"
            value={bookData.genre}
            onChange={handelInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="abstract">descrizione:</label>
          <textarea
            className="form-control"
            name="abstract"
            id="abstract"
            value={bookData.abstract}
            onChange={handelInputChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image">copertina del libro:</label>
          {/* Non mettiamo attributo value per il tipo di input file */}
          <input
            type="file"
            className="form-control"
            name="image"
            id="image"
            onChange={handelInputChange}
          />
        </div>
        <button className="btn btn-primary">AGGIUNGI!</button>
      </form>
    </>
  );
};

export default CreateBookPage;
