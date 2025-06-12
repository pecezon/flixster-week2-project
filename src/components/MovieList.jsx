import "./components.css";
import MovieCard from "./MovieCard";

function MovieList({
  movies,
  setSelectedMovie,
  setIsModalOpen,
  liked,
  setLiked,
  watched,
  setWatched,
}) {
  if (movies.length > 0) {
    return (
      <main>
        <div className="movie-list">
          {movies.map((item, index) => {
            return (
              <MovieCard
                key={index}
                movie={item}
                setSelectedMovie={setSelectedMovie}
                setIsModalOpen={setIsModalOpen}
                liked={liked}
                setLiked={setLiked}
                watched={watched}
                setWatched={setWatched}
              />
            );
          })}
        </div>
      </main>
    );
  } else {
    return <h1>Movies not found</h1>;
  }
}

export default MovieList;
