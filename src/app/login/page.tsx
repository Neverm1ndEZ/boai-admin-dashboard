import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Login() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="bg-[#242424] rounded-lg w-1/2 h-1/2 p-8 flex flex-col items-center justify-center gap-6">
				<h1 className="text-4xl font-bold text-center">
					Sign In to Our Dashboard
				</h1>
				<div className="flex flex-col justify-center items-center gap-5 w-full">
					<input
						type="email"
						className="bg-[#3e3d3c] p-3.5 rounded-xl"
						placeholder="Email"
					/>
					<input
						type="password"
						className="bg-[#3e3d3c] p-3.5 rounded-xl"
						placeholder="Password"
					/>
					<Link href={"/dashboard"}>
						<Button>Log In</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
