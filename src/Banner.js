import React, { useEffect, useState } from "react";
import axios from "./axios";
import request from "./request";
import "./banner.css";

export default function Banner() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchToprated);
      console.log(response.data.results);
      setMovies(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }

    fetchData();
  }, []);

  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
          backgroundPosition: "center center"
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movies?.title || movies?.name || movies?.original_name}
          </h1>

          <div className="banner_buttons">
            <button className="banner_button"> Play </button>
            <button className="banner_button"> My List</button>
          </div>

          <h1 className="banner_discription">
            {truncate(`${movies?.overview}`, 150)}
          </h1>
        </div>
        <div className="fade_banner"> </div>
      </header>
    </>
  );
}
