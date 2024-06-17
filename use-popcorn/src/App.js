import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import WatchedSummary from "./components/WatchedSummary";

const omdbKEY = "9e4ceed";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function (){
    const watched_ = JSON.parse(localStorage.getItem("watched"));
    return watched_ || [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tempQuery, setTempQuery] = useState("");
  const [movieDetailId, setMovieDetailId] = useState(null);
  console.log("watched APP: ", watched)
  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies() {
        try {
          setIsLoading(true);
          setErr("");
          if (tempQuery === "") {
            throw new ErrorMessage("Please enter movie name");
          }
          let res = await fetch(
            `http://www.omdbapi.com/?apikey=${omdbKEY}&s=${tempQuery}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new ErrorMessage("Fetching error");

          console.log("RESPONSE: ");
          console.log(res);
          let moviesRes = await res.json();
          console.log("movies Res: ", moviesRes);

          if (moviesRes.Response === "False")
            throw new ErrorMessage("Movie not found");

          setMovies(moviesRes.Search);
        } catch (error) {
          console.log("err ...", error);
          // console.error(error.message);
          // setErr(error.message);
          if (error.name !== "AbortError") {
            setErr(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      getMovies();
      return function () {
        controller.abort();
      };
    },
    [tempQuery]
  );
  function deleteMovieHandler(movieId) {
    setWatched(watched.filter((movie) => movie.imdbID !== movieId));
  }
    useEffect(() => {
      localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

  return (
    <>
      <NavBar>
        <Search tempQuery={tempQuery} setTempQuery={setTempQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && err && <ErrorMessage message={err} />}
          {!isLoading && !err && (
            <MovieList movies={movies} setMovieId={setMovieDetailId} />
          )}
        </Box>

        <Box>
          {movieDetailId && (
            <MovieDetails
              movieId={movieDetailId}
              setMovieID={setMovieDetailId}
              setWatchedMovies={setWatched}
              watchedMovies={watched}
            />
          )}
          {!movieDetailId && (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                deleteMovieHandler={deleteMovieHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Search({ tempQuery, setTempQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={tempQuery}
      onChange={(e) => {
        setTempQuery(e.target.value);
      }}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function WatchedMoviesList({ watched, deleteMovieHandler }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          deleteMovieHandler={deleteMovieHandler}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, deleteMovieHandler }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        {/* <p>
          <StarRating />
        </p> */}
        <button
          className="btn-delete"
          onClick={() => deleteMovieHandler(movie.imdbID)}
        >
          {" "}
          Delete
        </button>
      </div>
    </li>
  );
}
