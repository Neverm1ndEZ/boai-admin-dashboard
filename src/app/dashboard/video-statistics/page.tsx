"use client";
import axios from "axios";
import { useState } from "react";

export default function VideoStatistics() {
	const [userEmail, setUserEmail] = useState("");
	const [videoStats, setVideoStats] = useState<{
		total_videos: number;
		daywise_video_creation: { date: string; count: number }[];
		hourwise_video_creation: { hour: number; count: number }[];
	} | null>(null);

	const fetchVideoStatistics = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/video-creation-stats/${encodedEmail}`,
			);
			setVideoStats(response.data);
			console.log(response.data); // Log the entire response data
		} catch (error) {
			console.error("Error fetching video creation trend:", error);
		}
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Video Creation Statistics</h1>
			<p>View the video statistics for the specified period</p>
			<div className="flex flex-col space-y-4">
				<input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					className="bg-[#3e3d3c] p-3.5 rounded-xl w-1/2"
					placeholder="Enter user email"
				/>

				<button
					className="bg-[#3e3d3c] p-2 rounded-xl w-1/2"
					onClick={fetchVideoStatistics}
				>
					Get Video Statistics
				</button>
			</div>

			{videoStats && (
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">
						Total Videos: {videoStats.total_videos}
					</h2>

					<div>
						<h3 className="text-lg font-semibold">Day-wise Video Creation:</h3>
						<table className="min-w-full  border border-gray-300">
							<thead>
								<tr>
									<th className="py-2 px-4 border-b">Date</th>
									<th className="py-2 px-4 border-b">Video Count</th>
								</tr>
							</thead>
							<tbody>
								{videoStats?.daywise_video_creation.map((item, index) => (
									<tr key={index} className="hover:bg-gray-700">
										<td className="py-2 px-4 border-b">{item.date}</td>
										<td className="py-2 px-4 border-b">{item.count}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div>
						<h3 className="text-lg font-semibold">Hour-wise Video Creation:</h3>
						<table className="min-w-full  border border-gray-300">
							<thead>
								<tr>
									<th className="py-2 px-4 border-b">Hour</th>
									<th className="py-2 px-4 border-b">Video Count</th>
								</tr>
							</thead>
							<tbody>
								{videoStats?.hourwise_video_creation.map((item, index) => (
									<tr key={index} className="hover:bg-gray-700">
										<td className="py-2 px-4 border-b">{item.hour}</td>
										<td className="py-2 px-4 border-b">{item.count}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}
