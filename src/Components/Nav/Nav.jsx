import React from "react";
import "./Nav.css";
import Image from "../../Images/Image";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";

function Nav() {
	// user
	const user = useSelector(selectUser);
	// dispatch action
	const dispatch = useDispatch();
	// Home navigate
	const navigate = useNavigate();
	const [showNav, setShowNav] = useState(true);

	const NavShow = () => {
		window.scrollY > 100 ? setShowNav(false) : setShowNav(true);
	};

	// profile show
	const [profile, setProfile] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", NavShow);
		return () => {
			window.removeEventListener("scroll", NavShow);
		};
	}, []);

	return (
		<div className={`nav ${!showNav && "nav__black"}`}>
			<div className="nav__contents">
				<img onClick={() => navigate("/")} className="nav__logo" src={Image.fake_logo} alt="main logo" />
				<div className="nav__avat">
					<img onClick={() => setProfile(!profile)} src={Image.avatLogo} alt="" />
					{profile && (
						<div className="profile-menu">
							<h1>{user.email}</h1>
							<div className="profile_btns">
								<button>
									<span
										onClick={() => {
											navigate("/myfavlist");
										}}
									>
										My list
									</span>
								</button>
								<button className="profile-logout" onClick={() => dispatch(logout())}>
									<span>Log out</span>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
