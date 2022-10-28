import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
import { auth } from "../../firebase";
import "./LoginForm.css";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function LoginForm({ type, extra, navigateTo }) {
	// handle navigate
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// authentication

	// login and register
	const emailRef = useRef();
	const passRef = useRef();

	const logIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)
			.then((user) => {
				dispatch(
					login({
						email: user.user._delegate.email,
						uid: user.user._delegate.uid,
					})
				);
			})
			.catch((err) => alert(err));
	};
	const register = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(emailRef.current.value, passRef.current.value)
			.then(() => {
				navigate("/login");
			})
			.catch((er) => {
				alert(er);
			});
	};
	return (
		<div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="login__form">
			<div className="form__container">
				<form action="">
					<h1 className="title">{type}</h1>
					<input ref={emailRef} className="user_email" type="email" placeholder="Email" />
					<input ref={passRef} className="user_password" type="password" placeholder="Password" />

					<div className="submit__btn--container">
						<button type="submit" onClick={navigateTo !== "/login" ? logIn : register}>
							{type}
						</button>
					</div>
					<div className="form__extra">
						<span>
							{extra[0]} <a href="#" onClick={() => navigate(navigateTo)}>{extra[1]}</a>
						</span>
						<span>
							<a href="#" onClick={() => navigate("/help")}>Need help?</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
