"use client";
import axios from "axios";
import { useState } from "react";

export default function VideoCreationTrend() {
	const [userEmail, setUserEmail] = useState("");
	const [days, setDays] = useState(30);
	const [videoCreationTrend, setVideoCreationTrend] = useState<
		{ date: string; video_count: number }[]
	>([]);

	const fetchUserVideoCreationTrend = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/video-trend?user_email=${encodedEmail}&days=${days}`,
			);

			setVideoCreationTrend(response.data.video_creation_trend);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching video creation trend:", error);
		}
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Video Creation Trend</h1>
			<p>View the video creation trend for the specified period</p>
			<div className="flex flex-col space-y-4">
				<input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					className="bg-[#3e3d3c] p-3.5 rounded-xl w-1/2"
					placeholder="Enter user email"
				/>
				<input
					type="number"
					value={days}
					onChange={(e) => setDays(Number(e.target.value))}
					className="bg-[#3e3d3c] p-3.5 rounded-xl w-1/2"
					placeholder="Enter Days"
				/>
				<button
					className="bg-[#3e3d3c] p-2 rounded-xl w-1/2"
					onClick={fetchUserVideoCreationTrend}
				>
					Get Video Creation Trends
				</button>
			</div>
			{videoCreationTrend.length > 0 && (
				<div className="mt-4">
					<h2 className="text-xl font-semibold">Video Creation Trend:</h2>
					<table className="min-w-full bg-[#3e3d3c] rounded-xl mt-2">
						<thead>
							<tr>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">Video Count</th>
							</tr>
						</thead>
						<tbody>
							{videoCreationTrend.map((trend, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-[#4a4948]" : ""}
								>
									<td className="px-4 py-2 text-left">{trend.date}</td>
									<td className="px-4 py-2 text-left">{trend.video_count}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
