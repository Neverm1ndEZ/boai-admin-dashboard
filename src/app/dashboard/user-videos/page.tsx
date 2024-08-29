"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from "@nextui-org/react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GetUserVideos() {
	const [userEmail, setUserEmail] = useState("");
	const router = useRouter();
	const [videos, setVideos] = useState<Video[]>([]);
	const [alert, setAlert] = useState<{
		type: "info" | "success" | "error";
		message: string;
	} | null>(null);
	const [loadingStates, setLoadingStates] = useState<{
		[key: string]: boolean;
	}>({});

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

	const fetchUserVideos = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/{email}/videos?user_email=${encodedEmail}`,
			);
			setVideos(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching user videos:", error);
		}
	};

	const handleRowClick = (video_id: string) => {
		router.push(`/dashboard/user-videos/${video_id}`);
	};

	const showAlert = (type: "info" | "success" | "error", message: string) => {
		setAlert({ type, message });
		setTimeout(() => setAlert(null), 5000); // Clear alert after 5 seconds
	};

	const setLoading = (key: string, isLoading: boolean) => {
		setLoadingStates((prev) => ({ ...prev, [key]: isLoading }));
	};

	const downloadAudio = async (audio_id: string, filename: string) => {
		const loadingKey = `audio_${audio_id}`;
		try {
			setLoading(loadingKey, true);
			showAlert("info", "Downloading audio, please wait...");
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/media/${audio_id}`,
				{ responseType: "blob" },
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.remove();
			showAlert("success", "Audio downloaded successfully!");
		} catch (error) {
			console.error("Error downloading audio:", error);
			showAlert("error", "Failed to download audio. Please try again.");
		} finally {
			setLoading(loadingKey, false);
		}
	};

	const downloadVideo = async (video_id: string) => {
		const loadingKey = `video_${video_id}`;
		try {
			setLoading(loadingKey, true);
			showAlert("info", "Downloading video, please wait...");
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/lineups/${video_id}/export_video`,
				{ responseType: "blob" },
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `video_${video_id}.mp4`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			showAlert("success", "Video downloaded successfully!");
		} catch (error) {
			console.error("Error downloading video:", error);
			showAlert("error", "Failed to download video. Please try again.");
		} finally {
			setLoading(loadingKey, false);
		}
	};

	const downloadXML = async (video_id: string) => {
		const loadingKey = `xml_${video_id}`;
		try {
			setLoading(loadingKey, true);
			showAlert("info", "Downloading XML, please wait...");
			const response = await axios.get(
				`https://dev.blinkofai.io/api/video/lineups/${video_id}/export_xml`,
				{ responseType: "blob" },
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `video_${video_id}.xml`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			showAlert("success", "XML downloaded successfully!");
		} catch (error) {
			console.error("Error downloading XML:", error);
			showAlert("error", "Failed to download XML. Please try again.");
		} finally {
			setLoading(loadingKey, false);
		}
	};

	return (
		<div className="space-y-4 p-4">
			<h1 className="text-2xl font-bold">User Videos</h1>
			<p>Welcome to the user videos page</p>
			{alert && (
				<Alert
					className={`mb-4 ${
						alert.type === "success"
							? "bg-green-500"
							: alert.type === "error"
							? "bg-red-500"
							: "bg-blue-500"
					}`}
				>
					<AlertDescription>{alert.message}</AlertDescription>
				</Alert>
			)}
			<div className="space-x-4">
				<input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					className="bg-[#3e3d3c] p-3.5 w-1/2 rounded-xl"
					placeholder="Enter user email"
				/>
				<Button onClick={fetchUserVideos}>Get User Videos</Button>
			</div>
			{videos.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold mt-4">Videos:</h2>
					<Table aria-label="User videos table">
						<TableHeader>
							<TableColumn>Video ID</TableColumn>
							<TableColumn>Workspace ID</TableColumn>
							<TableColumn>Creation Date</TableColumn>
							<TableColumn>User Location</TableColumn>
							<TableColumn>User Industry</TableColumn>
							<TableColumn>Clips</TableColumn>
							<TableColumn>Audio</TableColumn>
							<TableColumn>Video</TableColumn>
							<TableColumn>Speed</TableColumn>
							<TableColumn>Style</TableColumn>
							<TableColumn>XML</TableColumn>
						</TableHeader>
						<TableBody>
							{videos.map((video, index) => (
								<TableRow
									key={index}
									onClick={() => handleRowClick(video.video_id)}
									className="cursor-pointer"
								>
									<TableCell>{video.video_id}</TableCell>
									<TableCell>{video.workspace_id}</TableCell>
									<TableCell>
										{new Date(video.creation_date).toLocaleString()}
									</TableCell>
									<TableCell>{video.user_location}</TableCell>
									<TableCell>{video.user_industry}</TableCell>
									<TableCell>{video.clips.length}</TableCell>
									<TableCell>
										<Button
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												downloadAudio(video.audio.id, video.audio.filename);
											}}
											isLoading={loadingStates[`audio_${video.audio.id}`]}
										>
											Download Audio
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												downloadVideo(video.video_id);
											}}
											isLoading={loadingStates[`video_${video.video_id}`]}
										>
											Download Video
										</Button>
									</TableCell>
									<TableCell>{video.speed}</TableCell>
									<TableCell>{video.style}</TableCell>
									<TableCell>
										<Button
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												downloadXML(video.video_id);
											}}
											isLoading={loadingStates[`xml_${video.video_id}`]}
										>
											Download XML
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
