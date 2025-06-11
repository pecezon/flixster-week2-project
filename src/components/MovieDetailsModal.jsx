export default function MovieDetailsModal({
  selectedMovie,
  setSelectedMovie,
  isModalOpen,
  setIsModalOpen,
  genresList,
}) {
  const className = `modal ${isModalOpen}`;
  let title,
    poster_path,
    release_date,
    overview = "";
  let genres = [];

  if (selectedMovie) {
    title = selectedMovie.title;
    poster_path = selectedMovie.poster_path;
    release_date = selectedMovie.release_date;
    overview = selectedMovie.overview;

    //Map genres ids with their respective names
    genres = selectedMovie.genre_ids.map((g) => {
      for (let genreObject of genresList) {
        if (genreObject.id === g) {
          return genreObject.name;
        }
      }
    });
  }

  return (
    <section className={className}>
      <div className="modal-content">
        <h2>{title}</h2>
        <img
          src={"https://image.tmdb.org/t/p/original" + poster_path}
          alt={title}
        />
        <h3>Release Date: {release_date}</h3>
        <h4>Overview: {overview}</h4>
        <h4>
          Genres:{" "}
          {genres.map((g) => (
            <h4>{g}</h4>
          ))}
        </h4>

        <button
          onClick={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }}
        >
          Close
        </button>
      </div>
    </section>
  );
}
