"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./DashboardNavbar.module.css";
import { LowerMenuIcons, MenuIcons } from "./MenuIcons";
import Image from "next/image";
import logo from "../../public/boai.svg";
import { useRouter } from "next/navigation";

const Sidebar = () => {
	const [selectedButton, setSelectedButton] = useState(0);
	const router = useRouter();

	const MenuData = [
		{
			id: 0,
			href: "/dashboard",
			spantag: "Home",
		},
		{
			id: 1,
			href: "/dashboard/user-videos",
			spantag: "Get User Videos",
		},
		{
			id: 2,
			href: "/dashboard/workspace-content",
			spantag: "User Workspace Content",
		},
		{
			id: 3,
			href: "/dashboard/credits",
			spantag: "User Credits",
		},
		{
			id: 4,
			href: "/dashboard/video-creation-trend",
			spantag: "Video Creation Trend",
		},
		{
			id: 5,
			href: "/dashboard/workspace-usage",
			spantag: "Workspace Usage",
		},
		{
			id: 6,
			href: "/dashboard/create-super-admin",
			spantag: "Admin Settings",
		},
	];

	const handleButtonClick = (id: number) => {
		setSelectedButton(id);
	};

	const handleLogout = () => {
		// Clear the authentication token from localStorage
		localStorage.removeItem("token");
		// Redirect to the login page
		router.push("/login");
	};

	return (
		<div className="block font-semibold fixed z-50">
			<nav className="flex w-48 bg-[#242424] h-screen fixed text-darkText dark:bg-darkBackgroundSecondary dark:text-white top-0 shadow bg-color flex-col items-center justify-between py-2">
				<ul className="flex flex-col gap-5 items-center w-full py-3">
					<figure className="w-20 mb-5 mr-2">
						<Image
							src={logo}
							className="logo"
							alt="Logo"
							width={100}
							height={100}
						/>
					</figure>
					{MenuData.map((menuData) => (
						<Link
							key={menuData.id}
							href={menuData.href}
							className=" w-full px-4"
						>
							<button
								color="inherit"
								className={` w-full p-2 rounded-lg text-[14px] capitalize transition-all duration-200 ${
									selectedButton === menuData.id
										? "bg-gradientPrimary "
										: `${styles.link}`
								}`}
								onClick={() => handleButtonClick(menuData.id)}
							>
								<div className="flex gap-4 text-left items-center">
									{MenuIcons[menuData.id]}
									<span>{menuData.spantag}</span>
								</div>
							</button>
						</Link>
					))}
				</ul>
				<ul className="flex flex-col gap-5 items-center w-full text-[14px]">
					<div className="flex w-full px-4">
						<button
							onClick={handleLogout}
							className="flex p-2 rounded-lg w-full gap-2 hover:bg-gradient-to-br from-orange-500 to-orange-800"
						>
							{LowerMenuIcons[1]}
							<span>Log Out</span>
						</button>
					</div>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
