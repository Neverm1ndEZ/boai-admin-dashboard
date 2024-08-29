"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
	const [alert, setAlert] = React.useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const handleAdminCreation = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setAlert({
					type: "error",
					message: "No token found. Please log in first.",
				});
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
			setAlert({ type: "success", message: "Admin created successfully!" });
			// Clear form fields
			setUserEmail("");
			setPassword("");
			setIsSuperAdmin(false);
		} catch (error) {
			console.error("Failed to create admin:", error);
			setAlert({
				type: "error",
				message: "Failed to create admin. Please try again.",
			});
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-[#4c4c4c] p-8 rounded-lg shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">Create Admin</h1>
				{alert && (
					<Alert
						className={`mb-4 ${
							alert.type === "success" ? "bg-green-500" : "bg-red-500"
						}`}
					>
						<AlertTitle>
							{alert.type === "success" ? "Success" : "Error"}
						</AlertTitle>
						<AlertDescription>{alert.message}</AlertDescription>
					</Alert>
				)}
				<div className="space-y-4">
					<input
						type="email"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						className="bg-[#323231] p-3.5 w-full rounded-xl"
						placeholder="Enter user email"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-[#323231] p-3.5 w-full rounded-xl"
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
