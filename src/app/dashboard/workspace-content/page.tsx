"use client";
import axios from "axios";
import { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
} from "@nextui-org/react";

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
				`${process.env.NEXT_PUBLIC_API_URL}/users/{email}/workspaces?user_email=${encodedEmail}`,
			);
			setWorkspaces(response.data.workspaces);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching user workspaces:", error);
		}
	};

	return (
		<div className="space-y-4 p-4">
			<h1 className="text-2xl font-bold">User Workspace Content</h1>
			<p>Welcome to the user workspace content page</p>
			<div className="flex space-x-4">
				<Input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					placeholder="Enter user email"
				/>
				<Button onClick={fetchUserWorkspaces}>Get User Workspaces</Button>
			</div>

			{workspaces.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold mt-4">Workspaces:</h2>
					<Table aria-label="Workspaces table">
						<TableHeader>
							<TableColumn>Workspace ID</TableColumn>
							<TableColumn>Name</TableColumn>
							<TableColumn>Screenplay IDs</TableColumn>
							<TableColumn>Lineup IDs</TableColumn>
						</TableHeader>
						<TableBody>
							{workspaces.map((workspace, index) => (
								<TableRow key={index}>
									<TableCell>{workspace.workspace_id}</TableCell>
									<TableCell>{workspace.name}</TableCell>
									<TableCell>{workspace.screenplay_ids.join(", ")}</TableCell>
									<TableCell>{workspace.lineup_ids.join(", ")}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
