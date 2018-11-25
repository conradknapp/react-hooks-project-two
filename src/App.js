import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react hooks");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=redux"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchEl = useRef(null);

  useEffect(
    () => {
      getData();
    },
    [url]
  );

  const getData = async () => {
    setLoading(true);

    try {
      const { data } = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
  };

  const handleClearSearch = () => {
    setQuery("");
    // `current` points to the mounted text input element
    searchEl.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={query}
          ref={searchEl}
          onChange={event => setQuery(event.target.value)}
          className="border p-1 rounded"
        />
        <button type="submit" className="m-1 p-1 bg-orange rounded">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="p-1 bg-teal text-white rounded"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a
                href={item.url}
                className="text-indigo-dark hover:text-indigo-darkest"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
