"use client";
import axios from "axios";
import { useState } from "react";

export default function GetUserVideos() {
	const [userEmail, setUserEmail] = useState("");
	interface Video {
		video_id: string;
		workspace_id: string;
		creation_date: string;
		user_location: string;
		user_industry: string;
	}

	const [videos, setVideos] = useState<Video[]>([]);

	const fetchUserVideos = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${encodedEmail}/videos`,
			);
			setVideos(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching user videos:", error);
		}
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">User Videos</h1>
			<p>Welcome to the user videos page</p>
			<div className="space-x-4">
				<input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					className="bg-[#3e3d3c] p-3.5 rounded-xl"
					placeholder="Enter user email"
				/>
				<button
					className="bg-[#3e3d3c] p-2 rounded-xl"
					onClick={fetchUserVideos}
				>
					Get User Videos
				</button>
			</div>
			{videos.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold mt-4">Videos:</h2>
					<table className="min-w-full bg-[#3e3d3c] rounded-xl mt-2">
						<thead>
							<tr>
								<th className="px-4 py-2">Video ID</th>
								<th className="px-4 py-2">Workspace ID</th>
								<th className="px-4 py-2">Creation Date</th>
								<th className="px-4 py-2">User Location</th>
								<th className="px-4 py-2">User Industry</th>
							</tr>
						</thead>
						<tbody>
							{videos.map((video, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-[#4a4948]" : ""}
								>
									<td className="px-4 py-2 text-left">{video.video_id}</td>
									<td className="px-4 py-2 text-left">{video.workspace_id}</td>
									<td className="px-4 py-2 text-left">
										{new Date(video.creation_date).toLocaleString()}
									</td>
									<td className="px-4 py-2 text-left">{video.user_location}</td>
									<td className="px-4 py-2 text-left">{video.user_industry}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
