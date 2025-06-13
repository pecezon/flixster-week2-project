const LoadMoreButton = ({ loadMoreMovies }) => {
  return (
    <button className="load-more" onClick={loadMoreMovies}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
