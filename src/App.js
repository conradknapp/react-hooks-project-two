import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react hooks");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=redux"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          ref={searchEl}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div>Something went wrong...</div>}
    </>
  );
}

export default App;
