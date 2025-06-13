import { useState } from "react";
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
  const { title, poster_path, vote_average, id } = movie;

  function clickFlow() {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  let [watchID, setWatchID] = useState(undefined);

  function watchingProcess(id) {
    if (watched[id]) {
      delete watched[id];
      setWatchID(undefined);
    } else {
      let newWatched = {};
      setWatchID(id);
      newWatched[id] = movie;
      setWatched({ ...watched, ...newWatched });
    }
  }

  //Altough this varibles aren't being used to display anything I use them to refresh the component and be able to dislike the movie
  let [likeID, setLikeID] = useState(undefined);

  function likingProcess(id) {
    if (liked[id]) {
      delete liked[id];
      setLikeID(undefined);
    } else {
      let newLiked = {};
      setLikeID(id);
      newLiked[id] = movie;
      setLiked({ ...liked, ...newLiked });
    }
  }

  return (
    <div className="movie-card">
      <div onClick={clickFlow} className="clickeable-content">
        <img
          src={"https://image.tmdb.org/t/p/original" + poster_path}
          alt={title}
          onError={(e) =>
            (e.currentTarget.src = "src/assets/movie-template.png")
          }
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{vote_average}</p>
        </div>
      </div>
      <div className="movie-buttons">
        <i
          className={
            "favorite-button fa-heart " +
            (liked[id] ? "fa-solid" : "fa-regular")
          }
          onClick={() => {
            likingProcess(id);
          }}
        />

        <i
          className={
            "watched-button fa-eye " + (watched[id] ? "fa-solid" : "fa-regular")
          }
          onClick={() => {
            watchingProcess(id);
          }}
        />
      </div>
    </div>
  );
}

export default MovieCard;
