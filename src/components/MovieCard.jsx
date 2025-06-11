import "./components.css";

function MovieCard({ movie, setSelectedMovie, setIsModalOpen }) {
  const { title, poster_path, vote_average } = movie;

  function clickFlow() {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    //todo make genre list of strings
  }

  return (
    <div className="movie-card" onClick={clickFlow}>
      <img
        src={"https://image.tmdb.org/t/p/original" + poster_path}
        alt={title}
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;
