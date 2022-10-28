import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { db } from "../../../firebase";
import axios from "../../../axios/axios";
import requests from "../../../axios/request";
import Nav from "../../Nav/Nav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import timeConvert from "../../../features/timeConvert";
import "./FavMovie.css";
import { useNavigate } from "react-router-dom";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

function FavMovie() {
	const [favID, setFavID] = useState([]);
	const [favList, setFavList] = useState([]);
	const user = useSelector(selectUser);
    const navigate = useNavigate()
	// Get collection from database
	useEffect(() => {
		const userDocRef = db.collection("user").doc(user.email);
		userDocRef.get().then((snapshot) => {
			if (snapshot.exists) setFavID(snapshot.data().fav);
		});
	}, [user.email]);

	// Get movie from id
	useEffect(() => {
		favID.forEach((item) => {
			console.log("item", item);
			const fetchDetails = async () => {
				const details = await axios.get(requests.fetchMovieDetails(item));
				console.log(details.data);
				setFavList((prev) => {
					const tempArr = [...prev, details.data];
					return tempArr;
				});
			};
			fetchDetails();
		});
	}, [favID]);

	console.log(favList);
	console.log(favID);
	return (
		<div className="fav-movie">
			<Nav />
			<h1>Explore your favourite movies here!</h1>
			{favList.length !== 0 ? (
				<div className="fav-list">
					{favList.map((item, index) => (
						<div key={index} className="fav-item" onClick ={()=>{
                            navigate(`/video/${item.id}`)
                        }}>
							<div className="img-container">
								<LazyLoadImage
									effect="blur"
									src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
									alt={item.title}
								/>
							</div>
							<div className="fav-detail">
								<h1 className="">{item?.title || item?.name || item?.original_name || item?.original_title}</h1>
								<h2>{item?.overview}</h2>
								<div className="extra">
									<span className="time">{item ? timeConvert(item.runtime) : ""}</span>
									<span>{parseFloat(item?.vote_average).toFixed(1)}</span>
									<FontAwesomeIcon className="icon" icon={faStar} color="yellow" size="xl" />
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<h1>No movie added to favourite yet!</h1>
			)}
		</div>
	);
}

export default FavMovie;
