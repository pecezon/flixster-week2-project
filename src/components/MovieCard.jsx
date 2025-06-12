import "./components.css";

function MovieCard({
  movie,
  setSelectedMovie,
  setIsModalOpen,
  liked,
  setLiked,
  watched,
  setWatched,
}) {
  const { title, poster_path, vote_average } = movie;

  function clickFlow() {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  function checkLiked(id) {}

  function checkWatched(id) {}

  return (
    <div className="movie-card">
      <div onClick={clickFlow} className="clickeable-content">
        <img
          src={"https://image.tmdb.org/t/p/original" + poster_path}
          alt={title}
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{vote_average}</p>
        </div>
      </div>
      <div className="movie-buttons">
        <i className={"favorite-button fa-solid fa-heart"} />
        <i className={"watched-button fa-solid fa-eye"} />
      </div>
    </div>
  );
}

export default MovieCard;
