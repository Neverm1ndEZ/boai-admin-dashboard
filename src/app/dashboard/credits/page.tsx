"use client";
import axios from "axios";
import { useState } from "react";

export default function GetUserCredits() {
	const [userEmail, setUserEmail] = useState("");
	const [credits, setCredits] = useState<number | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [creditRecharge, setCreditRecharge] = useState<number | null>(null);

	// Function to fetch user credits
	const fetchUserCredits = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${encodedEmail}/credits`,
			);
			setCredits(response.data.credits);
			setEmail(response.data.user_email);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching user credits:", error);
		}
	};

	// Function to recharge user credits
	const rechargeUserCredits = async () => {
		try {
			const encodedEmail = userEmail.replace("@", "%40");
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${encodedEmail}/credits`,
				{
					credits: creditRecharge,
				},
			);
			console.log(response.data);
			// Fetch updated credits after recharging
			await fetchUserCredits();
		} catch (error) {
			console.error("Error recharging user credits:", error);
		}
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">User Credits</h1>
			<p>Welcome to the user credits page</p>
			<div className="space-x-4">
				<input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					className="bg-[#3e3d3c] p-3.5 w-1/3 rounded-xl"
					placeholder="Enter user email"
				/>
				<button
					className="bg-[#3e3d3c] p-2 rounded-xl"
					onClick={fetchUserCredits}
				>
					Get User Credits
				</button>
			</div>
			<div className="space-x-4">
				<input
					type="number"
					value={creditRecharge?.toString()}
					onChange={(e) => setCreditRecharge(Number(e.target.value))}
					className="bg-[#3e3d3c] p-3.5 w-1/3 rounded-xl"
					placeholder="Enter Credits to be added"
				/>
				<button
					className="bg-[#3e3d3c] p-2 rounded-xl"
					onClick={rechargeUserCredits}
				>
					Recharge User Credits
				</button>
			</div>

			{credits !== null && email !== null && (
				<div className="mt-4">
					<h2 className="text-xl font-semibold">User Information:</h2>
					<p>
						<strong>Email:</strong> {email}
					</p>
					<p>
						<strong>Credits:</strong> {credits}
					</p>
				</div>
			)}
		</div>
	);
}
