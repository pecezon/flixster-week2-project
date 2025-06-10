import './components.css'
import MovieCard from "./MovieCard";
import { useEffect, useState } from 'react';

function MovieList(){
    //List of movies fetched
    const [movies, setMovies] = useState([])

    //API request info
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const options = {
        method: 'GET',
        headers: {
            accept:'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const fetchMovies = async (page) => {
            try {
                let apiURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
                const res = await fetch(apiURL, options)
                if(!res.ok){
                    throw new Error("Something wrong happened fetching the data: " + res.status)
                }
                const parsedMovies = await res.json();
                setMovies([...movies, ...parsedMovies.results]);
            } catch (error) {
                console.error(error)
            }
        }

    const [currentPage, setCurrentPage] = useState(1);
    async function loadMoreMovies(){
        await fetchMovies(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }
    
    useEffect(() => {
        fetchMovies(currentPage);
    }, [])

    return (
        <main>
            <div className="movie-list">
                {movies.map((item, index) => {
                    return <MovieCard key={index} title={item.title} img={"https://image.tmdb.org/t/p/original"+item.poster_path} voteAvg={item.vote_average}/>
                })}
            </div>
            <button onClick={loadMoreMovies}>Load More</button>
        </main>
    )
}

export default MovieList;