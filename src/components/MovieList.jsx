import "./components.css";
import MovieCard from "./MovieCard";

function MovieList({ movies, setSelectedMovie, setIsModalOpen }) {
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
