import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios.js";
import requests from "../../axios/request";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Banner.css";

function Banner() {
	// Get banner API
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchTopRated);
			setMovie(request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))]);
		}
		fetchData();
	}, []);

	// navigate trendind movie
	const navigate = useNavigate();
	return (
		<div className="banner">
			<div className="banner__content">
				<div
					className="banner_bgr"
					style={{
						backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
					}}
				></div>
				<div className="banner__overlay" />
				<div className="banner__details">
					<div className="banner--name">{movie.title || movie.name || movie.original_name}</div>
					<div className="banner--btns">
						<button onClick={() => navigate(`/video/${movie.id}`)} className="banner--play">
							<span>Play</span>
						</button>
						<button>
							<span onClick={()=>{navigate("/myfavlist")}}>My list</span>
						</button>
					</div>
					<div className="banner--dsc">{movie?.overview}</div>
				</div>
			</div>
		</div>
	);
}

export default Banner;
