import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import data from "./data.json";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function App() {
	const [viewport, setViewport] = useState({
		latitude: 35.6751,
		longitude: 71.543,
		width: "100vw",
		height: "100vh",
		zoom: 2,
	});

	const navControlStyle = {
		right: 10,
		top: 10,
	};

	const [selected, setSelected] = useState(null);
	const [isclose, setIsClose] = useState(false);

	useEffect(() => {
		const listener = (e) => {
			if (e.key === "Escape") {
				setSelected(null);
			}
		};
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, []);

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={
				"pk.eyJ1IjoiYWxvZ2FjeSIsImEiOiJja3h0NmFmNTgxZWhvMndwNHBvd3NzOTFvIn0.91lhh0jIwv0ib-q4yhSRcQ"
			}
			mapStyle="mapbox://styles/mapbox/satellite-v9"
			onViewportChange={(v) => setViewport(v)}
			width="100vw"
			height="100vh"
		>
			<div className="sidebar">
				Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom:
				{viewport.zoom}
			</div>
			<NavigationControl style={navControlStyle} />
			{data.plates.map((plate, i) => {
				return (
					<Marker key={i} latitude={plate.latitude} longitude={plate.longitude}>
						<FaMapMarkerAlt
							className="marker-btn"
							onClick={(e) => {
								setSelected(plate);
							}}
						/>
					</Marker>
				);
			})}
			{selected && (
				<Popup
					latitude={selected.latitude}
					longitude={selected.longitude}
					onClose={() => setSelected(null)}
					className="popup"
				>
					<div className="container">
						<div>
							<h3>{selected.title}</h3>
							<h4>{selected.subTitle}</h4>
							<p>{selected.info1}</p>
							<p>{selected?.info2}</p>
						</div>
						<div className="img-container">
							<img src={selected.img} alt="earthquake" />
							<img src={selected.gif} alt="" />
						</div>
					</div>
				</Popup>
			)}
			<footer>
				<div>
					<p> &copy; {new Date().getFullYear()} by Jim All rights reserved</p>
				</div>
				<ul>
					<li>Michael</li>
					<li>Lavi</li>
					<li>Cid</li>
					<li>Aira</li>
					<li>Railee</li>
				</ul>
			</footer>
			<div
				className={`${!isclose ? "info" : "info-close"}`}
				onClick={() => {
					if (isclose) {
						return setIsClose(false);
					}
					return;
				}}
			>
				<div className="info-head">
					{!isclose && (
						<>
							<h3>GOOD DAY! Welcome to our MAPlatecto model</h3>
							<AiOutlineClose
								className="close"
								onClick={() => setIsClose(true)}
							/>
						</>
					)}
				</div>
				{!isclose && (
					<>
						<p>
							Our model represents the 7 different plates which are the North
							American Plate, Pacific Plate, South American Plate, African
							Plate, Antarctic Plate, Indo-Australian Plate, Eurasian Plate.{" "}
						</p>
						<p>
							There are various types of events on each plate. This occurrence
							symbolizes plate tectonic movements (large earthquakes) and
							mountain ranges creation in that particular plate. The markers
							will provide you with a description of the occurrence as well as a
							demonstration of the type of movement that occurred.{" "}
						</p>
						<img src="plates.png" alt="" />
					</>
				)}
			</div>
		</ReactMapGL>
	);
}
