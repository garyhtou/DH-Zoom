import React from "react";
import { Tooltip } from "antd";

const updates = (
	<>
		<p>
			Link to{" "}
			<Tooltip title="Thanks Haashim!">
				<a
					href="https://drive.google.com/file/d/1J0qoGlGa9z6-8PUfcIH2fw7hTXcWktbZ/view"
					target="_blank"
					rel="noopener noreferrer"
				>
					Chapter 10 PDF
				</a>
				.
			</Tooltip>
		</p>
	</>
);

// epoch time
// dateOnly will not show the hours/minutes
const dates = [
	{
		task: "WAMAP - 10.7 Absolute Convergence and the Ratio Test",
		date: 1604811600,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Test #2 - 10.1-10.6 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Tests
				</a>
				)
			</p>
		),
		date: 1604417400,
		dateOnly: true,
	},
	{
		task: "WAMAP - 10.6 Alternating Sign Series",
		date: 1604293200,
		dateOnly: false,
	},
	{
		task: "WAMAP - 10.5 Comparison Tests",
		date: 1604203200,
		dateOnly: false,
	},
	{
		task: "WAMAP - 10.4 Integral Test and p-test",
		date: 1604030400,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Quiz #4 - 10.3 and 10.3.5 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Quizzes
				</a>
				)
			</p>
		),
		date: 1603817172,
		dateOnly: true,
	},
	{
		task: "WAMAP - 10.3 Geometric and Harmonic Series",
		date: 1603598400,
		dateOnly: false,
	},
	{
		task: "WAMAP - 10.2 Infinite Series",
		date: 1603252800,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Quiz #3 - 10.1 and some of 10.2 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Quizzes
				</a>
				)
			</p>
		),
		date: 1603322036,
		dateOnly: true,
	},
	{
		task: "WAMAP - 10.1 Sequences",
		date: 1602993600,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Test #1 - 9.1,9.2,9.3,9.4,9.6 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Tests
				</a>
				)
			</p>
		),
		date: 1602627311,
		dateOnly: true,
	},
	{
		task: "WAMAP - 9.6 Properties of Conic Sections",
		date: 1602388800,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Quiz #2 - 9.3-9.4 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Quizzes
				</a>
				)
			</p>
		),
		date: 1601994600,
		dateOnly: true,
	},
	{
		task: "WAMAP - 9.4 Calculus and Parametric Equations",
		date: 1601870400,
		dateOnly: false,
	},
	{
		task: "WAMAP - 9.3 Parametric Equations",
		date: 1601611200,
		dateOnly: false,
	},
	{
		task: (
			<p>
				Quiz #1 - 9.1-9.2 (
				<a href="http://scidiv.bellevuecollege.edu/dh/math153/math153tests.html">
					Practice Quizzes
				</a>
				)
			</p>
		),
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

export { dates, updates };
