import "./components.css";
import SortDropdown from "./SortDropdown";

export default function NavBar({
  fetchMovies,
  setCurrentMode,
  setCurrentSearchWord,
  currentSearchWord,
  setCurrentPage,
  sortMovies,
  sortingType,
}) {
  return (
    <nav>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentSearchWord.length > 0) {
            setCurrentPage(1);
            setCurrentMode("search");
            fetchMovies(sortingType, 1, "search", currentSearchWord);
          } else {
            setCurrentSearchWord("");
            setCurrentMode("all");
            fetchMovies(sortingType, 1, "all");
            setCurrentPage(1);
          }
        }}
      >
        <input
          type="text"
          value={currentSearchWord}
          placeholder="Search"
          onChange={(e) => setCurrentSearchWord(e.target.value)}
        />
        <input type="submit" placeholder="Search" />
        <button
          onClick={() => {
            setCurrentSearchWord("");
            setCurrentMode("all");
            fetchMovies(sortingType, 1, "all");
            setCurrentPage(1);
          }}
        >
          Clear
        </button>
      </form>
      <SortDropdown sortMovies={sortMovies}></SortDropdown>
      <p>hola</p>
    </nav>
  );
}
