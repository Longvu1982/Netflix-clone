import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../../axios/axios";
import requests from "../../../axios/request";

import Nav from "../../../Components/Nav/Nav";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import timeConvert from "../../../features/timeConvert";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// redux
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";

import "./VideoDetails.css";

function VideoDetails() {
	// get user
	const user = useSelector(selectUser);
	// Get video Id
	const { id } = useParams();

	// request for movie details
	const [detail, setDetail] = useState();
	const [isAdded, setAdded] = useState(false);

	const userDocRef = db.collection("user").doc(user.email);

	useEffect(() => {
		const fetchDetail = async () => {
			const details = await axios.get(requests.fetchMovieDetails(id));
			console.log(details.data);
			setDetail(details.data);
		};
		fetchDetail();
	}, [id]);

	useEffect(() => {
		userDocRef.get().then((snapshot) => {
			if (snapshot.exists) {
				setAdded(snapshot.data().fav.includes(id));
			}
		});
	}, [isAdded, id, userDocRef]);
	// Add video id to database
	const favMovieHandler = () => {
		
		userDocRef.get().then((snapshot) => {
			if (snapshot.exists) {
				console.log(snapshot.data().fav);
				return db
					.collection("user")
					.doc(user.email)
					.update({
						fav: firebase.firestore.FieldValue.arrayUnion(id),
					}).then(() => setAdded(true));
			} else {
				setAdded(snapshot.data().fav.includes(id));
				return db
					.collection("user")
					.doc(user.email)
					.set({
						fav: [id],
					}).then(() => setAdded(true));
			}
		});
	};

	return (
		<>
			<Nav />
			{!detail ? (
				<h1 className="no_movie">This movie is no longer available!</h1>
			) : (
				<div className="video__container">
					<div className="detail__section">
						<div className="detail__poster">
							<img src={`https://image.tmdb.org/t/p/original${detail?.poster_path}`} alt="" />
						</div>
						<div className="detail__info">
							<div className="detail--header">
								<h1 className="">{detail?.title || detail?.name || detail?.original_name || detail?.original_title}</h1>
								<div className="rating">
									<span>{parseFloat(detail?.vote_average).toFixed(1)}</span>
									<FontAwesomeIcon icon={faStar} color="yellow" size="xl" />
								</div>
							</div>
							<div className="detail--time">
								<span>{detail?.release_date}</span>
								<span>{detail ? timeConvert(detail.runtime) : ""}</span>
							</div>
							<div className="detail--overview">
								<h1>Overview</h1>
								<p>{detail?.overview}</p>
								<div className="detail--humans">
									<div className="detail--human">
										<span className="field">Created by</span>
										<span className="value">{detail?.production_companies.map((item) => item.name).join(", ")}</span>
									</div>
									<div className="detail--human">
										<span className="field">Genres</span>
										<span className="value">{detail?.genres.map((item) => item.name).join(", ")}</span>
									</div>
								</div>
							</div>
							<div className={isAdded ? "fav__btn active" : "fav__btn"}>
								<button
									onClick={() => {
										favMovieHandler();
										// navigate("/myfavlist");
									}}
								>
									{isAdded ? "Added to favourite" : "Add to favourite"}
								</button>
							</div>
						</div>
					</div>
					<div className="main__video">
						<iframe
							allowFullScreen
							title={id}
							id="iframe"
							src={`https://2embed.org//embed/movie?tmdb=${id}`}
							width="100%"
							height="100%"
							frameBorder="0"
						></iframe>
					</div>
				</div>
			)}
		</>
	);
}

export default VideoDetails;
