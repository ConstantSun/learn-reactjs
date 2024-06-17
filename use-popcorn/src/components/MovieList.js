import Movie from "./Movie";

export default function MovieList({ movies, setMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} setMovieId={setMovieId} key={movie.imdbID} />
      ))}
    </ul>
  );
}
