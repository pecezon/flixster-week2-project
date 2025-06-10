import './components.css'

function MovieCard ({title, img, voteAvg}){
    return (
        <div className="movie-card">
            <img src={img} alt={title} />
            <div className='movie-info'>
                <h3>{title}</h3>
                <p>{voteAvg}</p>
            </div> 
        </div>
    )
}   

export default MovieCard;