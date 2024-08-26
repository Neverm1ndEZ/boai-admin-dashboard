import GetUsers from "@/components/GetUsers";
import React from "react";

export default function DashboardHome() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Dashboard Home</h1>
			<p>Welcome to the dashboard home page</p>
			<GetUsers />
		</div>
	);
}
