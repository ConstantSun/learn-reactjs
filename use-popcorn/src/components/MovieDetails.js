import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

export default function MovieDetails({
  movieId,
  setMovieID,
  watchedMovies,
  setWatchedMovies,
}) {
  const omdbKEY = "9e4ceed";

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(1);
  // const [watchedMovies] = useState(function (){
  //   let watched = JSON.parse(localStorage.getItem("watched"));
  //   return watched
  // })
  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const [tabTitle, setTabTitle] = useState("Use popcorn");

  // if(year > 2024){
  //   return <div> Year is greater than 2024 </div>
  // }
  useEffect(
    function () {
      async function getDetails() {
        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${omdbKEY}&i=${movieId}`
        );
        res = await res.json();
        console.log("Movie details: \n", res);
        setMovieDetails(res);
        setLoading(false);
        console.log("watched movies: ", watchedMovies);
        let temp = watchedMovies.find((movie) => movie.imdbID === movieId);
        temp = temp ? temp.userRating : 0;
        console.log("temp: ", temp);
        setUserRating(temp);
        setTabTitle(res.Title);
      }
      getDetails();
    },
    [movieId, watchedMovies]
  );

  useEffect(() => {
    document.title = tabTitle;
    console.log("document title needs changing");
  }, [tabTitle]);

  useEffect(() => {
    setLoading(true);
  }, [movieId]);

  function onCloseMovie() {
    // document.title = "use popcorn";
    setMovieID(null);
  }

  useEffect(() => {
    return function () {
      document.title = "Use Popcorn";
    };
  }, [movieId]);

  useEffect(()=>{
    localStorage.setItem("watched", JSON.stringify(watchedMovies))
  }, [watchedMovies]  )

  function handleAddWatched() {
    let checkRated = watchedMovies.find((movie) => movie.imdbID === movieId);
    let id = checkRated ? checkRated.imdbID : null;
    if (id) {
      // I want to replace the old watch movie's user rating with the new userRating value using setWatchedMovies
      const updatedWatched = watchedMovies.map((movie) => {
        if (movie.imdbID === id) {
          return { ...movie, userRating: userRating };
        }
        return movie;
      });
      setWatchedMovies(updatedWatched);
      // localStorage.setItem("watched", JSON.stringify(updatedWatched));
    } else {
      let newWatched = [
        ...watchedMovies,
        {
          imdbID: imdbID,
          Poster: poster,
          Title: title,
          imdbRating,
          userRating,
          runtime: runtime,
        },
      ];
      setWatchedMovies(() => newWatched);
      // localStorage.setItem("watched", JSON.stringify(newWatched) );
    }
  }
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                setRatingStar={setUserRating}
                ratingStar={userRating}
              />

              <button className="button" onClick={handleAddWatched}>
                Add to watched list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
