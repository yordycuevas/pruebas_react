import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";
import { useState } from "react";

function App() {
  const { movies: mappedMovies } = useMovies();
  const [query, setQuery] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ query });
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
          onChange={handleChange}
            value={query}
            name="query"
            placeholder="Avengers, Star Wars, the matrix, etc."
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  );
}

export default App;
