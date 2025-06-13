import { useEffect, useState } from "react";

export default function MovieDetailsModal({
  selectedMovie,
  setSelectedMovie,
  isModalOpen,
  setIsModalOpen,
  genresList,
  fetchVideoList,
}) {
  const className = `modal ${isModalOpen}`;
  let title,
    backdrop_path,
    release_date,
    overview,
    id = "";
  let genres = [];

  if (selectedMovie) {
    title = selectedMovie.title;
    backdrop_path = selectedMovie.backdrop_path;
    release_date = selectedMovie.release_date;
    overview = selectedMovie.overview;
    id = selectedMovie.id;

    //Map genres ids with their respective names
    genres = selectedMovie.genre_ids.map((g) => {
      for (let genreObject of genresList) {
        if (genreObject.id === g) {
          return genreObject.name;
        }
      }
    });
  }

  let [videoDisplaying, setVideoDisplaying] = useState("");

  async function selectDisplayVideo() {
    if (id) {
      let videoList = await fetchVideoList(id);
      for (let v of videoList) {
        if (v.type === "Trailer") {
          setVideoDisplaying(v.key);
          break;
        }
      }

      if (!videoDisplaying) {
        setVideoDisplaying(videoList[0].key || null);
      }
    }
  }

  useEffect(() => {
    selectDisplayVideo();
  }, [id]);

  return (
    <section className={className}>
      <div className="modal-content">
        <h2>{title}</h2>
        <img
          src={"https://image.tmdb.org/t/p/original" + backdrop_path}
          alt={title}
          onError={(e) =>
            (e.currentTarget.src = "src/assets/movie-template.png")
          }
        />
        <h3>Release Date: {release_date}</h3>
        <h4>Overview</h4>
        <p>{overview} </p>
        <h4>Genres</h4>
        {genres.map((g, id) => (
          <p key={id}>{g}</p>
        ))}
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + videoDisplaying}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

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
