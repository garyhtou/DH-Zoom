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

	// epoch time
	// dateOnly will not show the hours/minutes
	dates = [
		{
			task: "Quiz #1 - 9.1-9.2",
			date: 1601427600,
			dateOnly: true,
		},
		{
			task: "WAMAP - 9.2 Calculus with Polar Coordinates",
			date: 1601168400,
			dateOnly: false,
		},
		{
			task: "WAMAP - 9.1 Polar Coordinates",
			date: 1600909200,
			dateOnly: false,
		},
		{
			task: "Quarter Begins",
			date: 1600736400,
			dateOnly: true,
		},
	];

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
					notification.open({
						type: "warning",
						message:
							"Whoops! I forgot to update the zoom links for today... rip :(",
						duration: 0,
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
							<h3>Dale Hoffman, Fall 2020</h3>
							<div className="user-flex">
								<div className="user-flexSide user-flexLeft">
									<div className="user-leftSection ">
										<div className="user-leftSection-titleContainer">
											<h2 className="user-leftSection-title">Updates</h2>
										</div>
										<p>No class on Monday, Sept 28th!</p>
										<p>
											Join{" "}
											<a
												href="https://teams.microsoft.com/l/team/19%3a38107697e64a4db19413516d66555784%40thread.tacv2/conversations?groupId=eafa15db-2c87-4434-add2-0b3702f4f5d3&tenantId=f94c251c-1347-422e-b3ea-8ac56befd6cb "
												target="_blank"
											>
												Microsoft Teams
											</a>{" "}
											if you haven't already. This is where all the class
											recordings are located.
										</p>
									</div>
									<div className="user-leftSection ">
										<div className="user-leftSection-titleContainer">
											<h2 className="user-leftSection-title">
												Important Dates
											</h2>
										</div>
										{function () {
											const columns = [
												{
													title: "Task",
													dataIndex: "task",
													key: "task",
												},
												{
													title: "Date",
													dataIndex: "date",
													key: "date",
												},
											];

											const data = [];
											for (let item of this.dates) {
												var itemDate = moment(item.date, "X");
												const inDays = Math.abs(
													Math.round(
														moment
															.duration(moment().startOf("day") - itemDate)
															.asDays()
													)
												);
												data.push({
													task: item.task,
													date: item.dateOnly
														? itemDate.format("MMMM Do") +
														  " (" +
														  (inDays === 0
																? "today"
																: itemDate.isBefore(moment())
																? inDays + " days ago"
																: "in " + inDays + " days") +
														  ")"
														: itemDate.format("MMM DD[,] h:mm a") +
														  " (" +
														  itemDate.fromNow() +
														  ")",
												});
											}

											return (
												<Table
													columns={columns}
													dataSource={data}
													pagination={{
														pageSize: 10,
														hideOnSinglePage: true,
													}}
													scroll={{ x: 575 }}
												/>
											);
										}.bind(this)()}
									</div>
									<div className="user-leftSection ">
										<div className="user-leftSection-titleContainer">
											<h2 className="user-leftSection-title">Quick Links</h2>
										</div>
										<p>
											<a
												href="http://scidiv.bellevuecollege.edu/dh/Calculus_all/Calculus_all.html"
												target="_blank"
											>
												Contemporary Calculus (Textbook)
											</a>
										</p>
										<p>
											<a
												href="https://bc.instructure.com/courses/1950323"
												target="_blank"
											>
												Canvas
											</a>
										</p>
										<p>
											{" "}
											<a
												href="http://scidiv.bellevuecollege.edu/dh/math153/math153.html"
												target="_blank"
											>
												Dale Hoffman's Website
											</a>
										</p>
										<p>
											<a href="https://discord.gg/Kg9sjtA" target="_blank">
												Join Discord Server (Organized by <em>Ki#6883</em>)
											</a>
										</p>
										<p>
											<a
												href="https://teams.microsoft.com/l/team/19%3a38107697e64a4db19413516d66555784%40thread.tacv2/conversations?groupId=eafa15db-2c87-4434-add2-0b3702f4f5d3&tenantId=f94c251c-1347-422e-b3ea-8ac56befd6cb "
												target="_blank"
											>
												Join Microsoft Teams (Class Recordings)
											</a>
										</p>
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
											color: "black",
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
												section: "B",
											});
										}}
										className="user-classItem"
										style={{
											background:
												"linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
											color: "black",
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
												section: "OfficeHours",
											});
										}}
										className="user-classItem"
										style={{
											background:
												"linear-gradient(90deg, #d53369 0%, #daae51 100%)",
											color: "black",
										}}
									>
										<div>
											<h3>
												<strong>8:30 (Office Hours)</strong>
											</h3>
											<p style={{ fontWeight: "600" }}>Join Zoom</p>
										</div>
									</a>
									<p style={{ textAlign: "right", width: "100%" }}>
										Zoom links updated daily
									</p>
								</div>
							</div>
						</div>
					) : (
						<p>Admin?! or 404</p>
					)}
				</Content>
				<Footer style={{ textAlign: "center" }}>
					<p style={{ marginBottom: "2px" }}>
						<em>
							There may be bugs. I'm not responsible if you're late to class :)
						</em>
					</p>
					<div>
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
					</div>
				</Footer>
			</Layout>
		);
	}
}

export default App;
