import React from "react";
import "./App.css";

import firebase from "./firebase";
import moment from "moment-timezone";
import { Helmet } from "react-helmet";

import { Layout, Button, notification, Table, Tooltip } from "antd";
import { GithubOutlined, BookOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			home: window.location.pathname.split("/")[1] === "",
			links: {
				sectionA: "#",
				sectionB: "#",
				officeHours: "#",
			},
			randomEmoji: this.randomEmoji(),
		};
	}

	randomEmojisList = [
		"👋",
		"😆",
		"😎",
		"🤩",
		"🥳",
		"✨",
		"🌟",
		"🚀",
		"😜",
		"😝",
		"🐳",
		"🌊",
		"🔥",
		"🍍",
		"🎯",
		"🏝️",
		"🗿",
		"🗽",
		"🌄",
		"🏜️",
		"🌋",
	];
	randomEmoji = function () {
		return this.randomEmojisList[
			Math.floor(Math.random() * this.randomEmojisList.length)
		];
	};

	componentDidMount() {
		this.getZoomLinks();
		this.checkZoomLinks = setInterval(this.getZoomLinks, 1000 * 60 * 60 * 6);
	}

	componentWillUnmount() {
		this.checkZoomLinks && clearInterval(this.checkZoomLinks);
		this.checkZoomLinks = undefined;
	}

	getZoomLinks() {
		const today = moment().tz("America/Los_Angeles").format("YYYYMMDD");
		console.log(today);

		firebase
			.database()
			.ref("links/" + today)
			.once("value", (snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					this.setState({
						links: {
							sectionA: snapshot.val().sectionA,
							sectionB: snapshot.val().sectionB,
							officeHours: snapshot.val().officeHours,
						},
					});
				} else {
					notification.info({
						message:
							"Whoops! We forgot to add the zoom links for today... rip :(",
					});
				}
			})
			.catch((err) => {
				notification.error({
					message: "Error!",
					description: err.message,
				});
			});
	}

	render() {
		return (
			<Layout
				style={{ minHeight: "100vh" }}
				className={true ? "dark-mode" : "light-mode"}
			>
				<Content
					style={{
						padding: "2vw",
						position: "relative",
					}}
				>
					{this.state.home ? (
						<div className="user-container">
							<h1 className="user-welcome">
								Math 153 Zoom Links!
								<span
									className="user-welcomeEmoji"
									role="img"
									aria-label="emoji"
									style={{ cursor: "default", userSelect: "none" }}
									onClick={function () {
										this.setState({
											randomEmoji: this.randomEmoji(),
										});
									}.bind(this)}
								>
									{this.state.randomEmoji}
								</span>
							</h1>
							<p>Dale Hoffman, Fall 2020</p>
							<div className="user-flex">
								<div className="user-flexSide user-flexLeft">
									<div className="user-leftSection ">
										<div className="user-leftSection-titleContainer">
											<h2 className="user-leftSection-title">
												WAMAP Due Dates
											</h2>
										</div>
										<p>9.1 - Yesterday</p>
									</div>
									<div className="user-leftSection ">
										<div className="user-leftSection-titleContainer">
											<h2 className="user-leftSection-title">
												Important Dates
											</h2>
										</div>
										<p>First day - Sept 21st</p>
									</div>
								</div>

								<div className="user-flexSide user-flexRight">
									<a
										href={this.state.links.sectionA}
										onClick={() => {
											firebase.analytics().logEvent("join_button", {
												section: "A",
											});
										}}
										className="user-classItem"
										style={{
											background:
												"linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
										}}
									>
										<div>
											<h3>
												<strong>7:30 (Section A)</strong>
											</h3>
											<p style={{ fontWeight: "600" }}>Join Zoom</p>
										</div>
									</a>

									<a
										href={this.state.links.sectionB}
										onClick={() => {
											firebase.analytics().logEvent("join_button", {
												section: "A",
											});
										}}
										className="user-classItem"
										style={{
											background:
												"linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
										}}
									>
										<div>
											<h3>
												<strong>9:30 (Section B)</strong>
											</h3>
											<p style={{ fontWeight: "600" }}>Join Zoom</p>
										</div>
									</a>
									<a
										href={this.state.links.officeHours}
										onClick={() => {
											firebase.analytics().logEvent("join_button", {
												section: "A",
											});
										}}
										className="user-classItem"
										style={{
											background:
												"linear-gradient(90deg, #d53369 0%, #daae51 100%)",
										}}
									>
										<div>
											<h3>
												<strong>8:30 (Office Hours)</strong>
											</h3>
											<p style={{ fontWeight: "600" }}>Join Zoom</p>
										</div>
									</a>
								</div>
							</div>
						</div>
					) : (
						<p>Admin?!</p>
					)}
				</Content>
				<Footer style={{ textAlign: "center" }}>
					<a
						className="gh-link"
						href="https://github.com/garytou2/DH-Zoom"
						onClick={function () {
							firebase.analytics().logEvent("visit_github_repo");
						}}
					>
						DH Zoom <GithubOutlined />
					</a>
					<span className="credit-sep">|</span>
					Developed by{" "}
					<a
						href="https://garytou.com"
						onClick={function () {
							firebase.analytics().logEvent("visit_garytou_com");
						}}
					>
						Gary Tou
					</a>
				</Footer>
			</Layout>
		);
	}
}

export default App;
