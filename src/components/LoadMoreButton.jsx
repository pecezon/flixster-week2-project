const LoadMoreButton = ({onclick, newPage}) => {
    return (
        <button onClick={onclick(newPage)}>
            Load More
        </button>
    )
}

export default LoadMoreButton;