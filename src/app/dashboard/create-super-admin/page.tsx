"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import React from "react";

// Create an axios instance
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function AdminCreationPage() {
	const [userEmail, setUserEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);

	const handleAdminCreation = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("No token found. Please log in first.");
				return;
			}

			const payload = {
				email: userEmail,
				password: password,
				is_super_admin: isSuperAdmin,
			};

			const response = await api.post(`/admin/create?token=${token}`, payload, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log("Admin created successfully:", response.data);
			// Handle successful creation (e.g., show success message, clear form, etc.)
		} catch (error) {
			console.error("Failed to create admin:", error);
			// Handle error (e.g., show error message to user)
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<div className="bg- p-8 rounded-lg shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">Create Admin</h1>
				<div className="space-y-4">
					<input
						type="email"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						className="bg-gray-700 p-3 rounded-xl w-full"
						placeholder="Enter user email"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-gray-700 p-3 rounded-xl w-full"
						placeholder="Enter password"
					/>
					<Select
						label="Super Admin"
						className="w-full"
						onChange={(e) => setIsSuperAdmin(e.target.value === "true")}
					>
						<SelectItem key="true" value="true">
							Yes
						</SelectItem>
						<SelectItem key="false" value="false">
							No
						</SelectItem>
					</Select>
					<Button
						color="primary"
						className="w-full"
						onClick={handleAdminCreation}
					>
						Create Admin
					</Button>
				</div>
			</div>
		</div>
	);
}
