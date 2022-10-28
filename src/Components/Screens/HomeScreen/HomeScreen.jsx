import React from "react";
import Banner from "../../Banner/Banner";
import Nav from "../../Nav/Nav";
import Row from "../../Row/Row";
import requests from "../../../axios/request";
import "./HomeScreen.css";
function HomeScreen() {
	return (
		<div className="home">
			{/* Nav */}
			<Nav />

			{/* Banner */}
			<Banner />

			{/* Row */}
			<div className="row_container">
				<Row title="Original" request={requests.fetchNetflixOriginals} />
				<Row title="Top Rated" request={requests.fetchTopRated} />
				<Row title="Action" request={requests.fetchActionMovie} />
				<Row title="Comedy" request={requests.fetchComedyMovies} />
				<Row title="Horror" request={requests.fetchHorrorMovies} />
				<Row title="Romance" request={requests.fetchRomanceMovies} />
			</div>
		</div>
	);
}

export default HomeScreen;
