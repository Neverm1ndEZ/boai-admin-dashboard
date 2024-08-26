"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-y-6 p-24">
			<h1 className="text-4xl font-bold">Welcome to BOAI - Dashboard</h1>
			<div className="flex items-center justify-center gap-6">
				<Link href={"/login"}>
					<Button className="">Log In</Button>
				</Link>
			</div>
		</main>
	);
}
