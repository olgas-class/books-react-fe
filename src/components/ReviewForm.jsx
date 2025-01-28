import { useState } from "react";

function ReviewForm({ onSubmitFunction, formData, setFormData }) {
  const [error, setError] = useState(false);

  const availableVotes = Array.from(Array(6).keys());

  const setFieldValue = (event) => {
    // Prendere value e il nome del campo da cambiare
    const value = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData };
    newFormData[fieldName] = value;
    setFormData(newFormData);
  };

  const isDataValid = () => {
    if (
      formData.name.length <= 3 ||
      formData.vote < 0 ||
      formData.vote > 5 ||
      (formData.text.length > 0 && formData.length < 5)
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    if (!isDataValid()) {
      setError(true);
    } else {
      onSubmitFunction(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Nome utente
        </label>
        <input
          value={formData.name}
          name="name"
          type="text"
          className="form-control"
          id="username"
          onChange={setFieldValue}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="vote">Seleziona il voto</label>
        <select
          name="vote"
          className="form-select"
          id="vote"
          onChange={setFieldValue}
          value={formData.vote}
        >
          {availableVotes.map((curVote) => (
            <option key={curVote} value={curVote}>
              {curVote}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="text">Testo della recensione</label>
        <textarea
          value={formData.text}
          className="form-control"
          name="text"
          id="text"
          onChange={setFieldValue}
        ></textarea>
      </div>

      {error && (
        <div className="alert alert-danger">Valori errati</div>
      )}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
