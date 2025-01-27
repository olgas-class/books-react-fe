function ReviewCard({ review }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4>Scritto da: {review.name}</h4>
        <p>{review.vote}</p>
        <p>{review.text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
