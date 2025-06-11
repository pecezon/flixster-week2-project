import "./App.css";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import LoadMoreButton from "./components/LoadMoreButton";
import MovieDetailsModal from "./components/MovieDetailsModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  //List of movies fetched and genres list array
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [sortingType, setSortingType] = useState("release_date");

  //API request info
  const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  //Sort by funtion
  const sort = (arr, type) => {
    if (type === "original_title") {
      //Sort by alphabetical order
      arr.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else if (type === "vote_average") {
      arr.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      arr.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB - dateA;
      });
    }
    return arr;
  };

  //Fetch movies giving the page
  //If the page is the first one reset the list
  const fetchMovies = async (sorting, page, type, query) => {
    // Testing log to see the page, mode and search query value of the fetching call
    // console.log(
    //   `Fetching from page ${page} of the type of ${type} and the query value ${query}`
    // );

    try {
      //If the fetching type is a search you change the endpoint to use
      let apiURL;
      if (type === "search") {
        apiURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
      } else {
        apiURL = `https://api.themoviedb.org/3/movie/now_playing?include_adult=false&include_video=false&language=en-US&page=${page}`;
      }

      //You await the response giving an specified apiurl
      const res = await fetch(apiURL, options);

      //Throw error if the fetching was not successful
      if (!res.ok) {
        throw new Error(
          "Something wrong happened fetching the movies: " + res.status
        );
      }

      //Parse the movies in a Json format
      const parsedMovies = await res.json();
      //If its the first page reload everything
      if (page === 1) {
        setMovies(sort(parsedMovies.results, sorting));
      } else {
        //If its loading more stuff just append it
        setMovies(sort([...movies, ...parsedMovies.results], sorting));
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Gets an array of ids and returns a string array with the genres
  async function fetchGenres() {
    try {
      let res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );

      //Throw error if the fetching was not successful
      if (!res.ok) {
        throw new Error(
          "Something wrong happened fetching the genres: " + res.status
        );
      }

      res = await res.json();
      setGenresList(res.genres);
    } catch (error) {
      console.error(error);
    }
  }

  //Setting default movie fetching mode, current page, and current search word
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMode, setCurrentMode] = useState("all");
  const [currentSearchWord, setCurrentSearchWord] = useState("");

  //Load more movies button functionality
  async function loadMoreMovies() {
    await fetchMovies(
      sortingType,
      currentPage + 1,
      currentMode,
      currentSearchWord
    );
    setCurrentPage(currentPage + 1);
  }

  //Fetch movies given a sorting preferencex
  async function sortMovies(sortT) {
    await fetchMovies(sortT, 1, currentMode, currentSearchWord);
    setSortingType(sortT);
  }

  //Fetch Default movies at loading the page
  useEffect(() => {
    fetchMovies(sortingType, currentPage, currentMode);
    fetchGenres();
  }, []);

  //Movie Modal
  const [selectedMovie, setSelectedMovie] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <Header />
      <NavBar
        fetchMovies={fetchMovies}
        setCurrentMode={setCurrentMode}
        setCurrentSearchWord={setCurrentSearchWord}
        currentSearchWord={currentSearchWord}
        setCurrentPage={setCurrentPage}
        sortingType={sortingType}
        sortMovies={sortMovies}
      />
      <MovieList
        movies={movies}
        setIsModalOpen={setIsModalOpen}
        setSelectedMovie={setSelectedMovie}
      />
      <LoadMoreButton loadMoreMovies={loadMoreMovies}></LoadMoreButton>
      <MovieDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        genresList={genresList}
        sortingType={sortingType}
      />
      <Footer />
    </div>
  );
}

export default App;
