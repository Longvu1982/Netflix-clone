import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Routing from "./Route/Route";
import "./App.css";
import Help from "./Components/Help/Help";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/LoginForm/LoginForm";
import HomeScreen from "./Components/Screens/HomeScreen/HomeScreen";
import VideoDetails from "./Components/Screens/VideoDetials/VideoDetails";
import FavMovie from "./Components/Screens/FavMovie/FavMovie";
import { selectUser } from "./features/userSlice";

function App() {
	// get user from redux
	const user = useSelector(selectUser);

	console.log("user" + user);
	// listen to user login

	if (user) {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/video/:id" element={<VideoDetails />} />
					<Route path="/myfavlist" element={<FavMovie />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		);
	} else {
		return (
			<Router>
				<Routes>
					<Route
						path="/login"
						element={<LoginForm type="Sign In" extra={["New to NetFake?", "Register"]} navigateTo="/register" />}
					/>
					<Route
						path="/register"
						element={<RegisterForm type="Register" extra={["Have an account?", "Sign-in"]} navigateTo="/login" />}
					/>
					<Route path="/help" element={<Help />} />
					<Route path="*" element={<Navigate to="/login" />}></Route>
				</Routes>
			</Router>
		);
	}
}

export default App;
