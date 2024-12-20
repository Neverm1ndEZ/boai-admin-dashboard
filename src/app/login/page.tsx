"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default function Login() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [alert, setAlert] = React.useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);
	const router = useRouter();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new URLSearchParams();
			formData.append("username", email);
			formData.append("password", password);
			formData.append("grant_type", "");
			formData.append("scope", "");
			formData.append("client_id", "");
			formData.append("client_secret", "");

			const response = await api.post("/admin/login", formData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			const { access_token } = response.data;

			localStorage.setItem("token", access_token);
			setAlert({
				type: "success",
				message: "Login successful! Redirecting...",
			});

			// Delay redirect to show success message
			setTimeout(() => {
				router.push("/dashboard");
			}, 1500);
		} catch (error) {
			setAlert({
				type: "error",
				message: "Login failed. Please check your credentials and try again.",
			});
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="bg-[#242424] rounded-lg w-1/2 h-1/2 p-8 flex flex-col items-center justify-center gap-6">
				<h1 className="text-4xl font-bold text-center">
					Sign In to Our Dashboard
				</h1>
				{alert && (
					<Alert
						variant={alert.type === "success" ? "default" : "destructive"}
						className="mb-4"
					>
						<AlertTitle>
							{alert.type === "success" ? "Success" : "Error"}
						</AlertTitle>
						<AlertDescription>{alert.message}</AlertDescription>
					</Alert>
				)}
				<form
					onSubmit={handleLogin}
					className="flex flex-col justify-center items-center gap-5 w-full"
				>
					<input
						value={email}
						onChange={handleEmailChange}
						type="email"
						className="bg-[#3e3d3c] p-3.5 rounded-xl"
						placeholder="Email"
					/>
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						className="bg-[#3e3d3c] p-3.5 rounded-xl"
						placeholder="Password"
					/>
					<Button type="submit">Log In</Button>
				</form>
			</div>
		</div>
	);
}
