"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/react";

export default function GetUsers() {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users`,
			);
			setUsers(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="space-y-3">
			<h1 className="text-2xl font-bold">Get Registered Users</h1>
			<Table aria-label="Registered users table">
				<TableHeader>
					<TableColumn>USERNAME</TableColumn>
					<TableColumn>EMAIL</TableColumn>
					<TableColumn>SIGNUP DATE</TableColumn>
				</TableHeader>
				<TableBody>
					{users.map((user, index) => (
						<TableRow key={index}>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								{new Date(user.signup_date).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
