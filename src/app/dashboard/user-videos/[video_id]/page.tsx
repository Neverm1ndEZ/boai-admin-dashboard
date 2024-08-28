"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import {
	Button,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/react";

interface Video {
	video_id: string;
	workspace_id: string;
	creation_date: string;
	user_location: string;
	user_industry: string;
	clips: any[];
	audio: {
		id: string;
		filename: string;
	};
	output: string;
	speed: string;
	style: string;
	xml: string;
}

export default function VideoDetails() {
	const [video, setVideo] = useState<Video | null>(null);
	const { video_id } = useParams();
	const searchParams = useSearchParams();

	useEffect(() => {
		const videoDataString = searchParams.get("video_id");
		if (videoDataString) {
			try {
				const videoData = JSON.parse(videoDataString);
				setVideo(videoData);
			} catch (error) {
				console.error("Error parsing video data:", error);
			}
		}
	}, [searchParams]);

	const downloadAudio = async (audio_id: string, filename: string) => {
		try {
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/media/${audio_id}`,
				{
					responseType: "blob",
				},
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading audio:", error);
		}
	};

	const downloadVideo = async (video_id: string) => {
		try {
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/lineups/${video_id}/export_video`,
				{
					responseType: "blob",
				},
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `video_${video_id}.mp4`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading video:", error);
		}
	};

	const downloadXML = async (video_id: string) => {
		try {
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/lineups/${video_id}/export_xml`,
				{
					responseType: "blob",
				},
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `video_${video_id}.xml`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading XML:", error);
		}
	};

	if (!video) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-4 p-4">
			<h1 className="text-2xl font-bold">Video Details</h1>
			<Table aria-label="Video details table">
				<TableHeader>
					<TableColumn>Property</TableColumn>
					<TableColumn>Value</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Video ID</TableCell>
						<TableCell>{video.video_id}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Workspace ID</TableCell>
						<TableCell>{video.workspace_id}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Creation Date</TableCell>
						<TableCell>
							{new Date(video.creation_date).toLocaleString()}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>User Location</TableCell>
						<TableCell>{video.user_location}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>User Industry</TableCell>
						<TableCell>{video.user_industry}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Clips</TableCell>
						<TableCell>{video.clips.length}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Audio</TableCell>
						<TableCell>
							<Button
								size="sm"
								onClick={() =>
									downloadAudio(video.audio.id, video.audio.filename)
								}
							>
								Download Audio
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Video</TableCell>
						<TableCell>
							<Button size="sm" onClick={() => downloadVideo(video.video_id)}>
								Download Video
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Speed</TableCell>
						<TableCell>{video.speed}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Style</TableCell>
						<TableCell>{video.style}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>XML</TableCell>
						<TableCell>
							<Button size="sm" onClick={() => downloadXML(video.video_id)}>
								Download XML
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
