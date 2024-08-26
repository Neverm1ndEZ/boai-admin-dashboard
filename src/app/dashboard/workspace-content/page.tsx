"use client";
import axios from "axios";
import { useState } from "react";

interface Screenplay {
	id: string;
}

interface Lineup {
	id: string;
}

interface Workspace {
	workspace_id: string;
	name: string;
	screenplay_ids: string[];
	lineup_ids: string[];
}

export default function GetWorkspaceContent() {
	const [userEmail, setUserEmail] = useState("");
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

	const fetchUserWorkspaces = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${encodedEmail}/workspace-content`,
			);
			setWorkspaces(response.data.workspaces);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching user workspaces:", error);
		}
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">User Workspace Content</h1>
			<p>Welcome to the user workspace content page</p>
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
					onClick={fetchUserWorkspaces}
				>
					Get User Workspaces
				</button>
			</div>

			{workspaces.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold mt-4">Workspaces:</h2>
					<table className="min-w-full bg-[#3e3d3c] rounded-xl mt-2">
						<thead>
							<tr>
								<th className="px-4 py-2">Workspace ID</th>
								<th className="px-4 py-2">Name</th>
								<th className="px-4 py-2">Screenplay IDs</th>
								<th className="px-4 py-2">Lineup IDs</th>
							</tr>
						</thead>
						<tbody>
							{workspaces.map((workspace, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-[#4a4948]" : ""}
								>
									<td className="px-4 py-2 text-left">
										{workspace.workspace_id}
									</td>
									<td className="px-4 py-2 text-left">{workspace.name}</td>
									<td className="px-4 py-2 text-left">
										{workspace.screenplay_ids.join(", ")}
									</td>
									<td className="px-4 py-2 text-left">
										{workspace.lineup_ids.join(", ")}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
