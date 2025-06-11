import "./components.css";

const SortDropdown = ({ sortMovies }) => {
  return (
    <div className="sorting-dropdown">
      <label>Sort By:</label>

      <select
        name="sorting-dropdown"
        id="sorting-dropdown"
        onChange={(e) => {
          sortMovies(e.target.value);
        }}
      >
        <option value="release_date">Release Date</option>
        <option value="original_title">Alphabetic Order</option>
        <option value="vote_average">Vote Average</option>
      </select>
    </div>
  );
};

export default SortDropdown;
