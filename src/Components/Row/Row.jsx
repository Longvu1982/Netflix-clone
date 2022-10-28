import axios from "../../axios/axios.js";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Row.css";

function Row({ title, request }) {
	// skeleton loading
	const [loading, setLoading] = useState(true);
	// Get Movie
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get(request);
			setMovie(data.data.results);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		};
		fetchData();
	}, [request]);

	// Slider button
	const rowRef = useRef();
	const HandleScroll = (type) => {
		type === "right" ? (rowRef.current.scrollLeft += 250) : (rowRef.current.scrollLeft -= 250);
	};

	// Route btn
	const navigate = useNavigate();
	return (
		<div className="main-row">
			<h1 className="main-row__title">{title}</h1>

			<button onClick={() => HandleScroll("left")} className="row__btn--left">
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<button onClick={() => HandleScroll("right")} className="row__btn--right">
				<FontAwesomeIcon icon={faAngleRight} />
			</button>

			<div ref={rowRef} className="row__movies">
				{movie.map((item, index) => {
					return loading ? (
						<div key={index} className="row__movie--item skeleton-box"></div>
					) : (
						<div
							onClick={() => {
								navigate(`/video/${item.id}`);
							}}
							className="row__movie--item"
							key={index}
						>
							<LazyLoadImage
								effect="blur"
								src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
								alt={item.title}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Row;
