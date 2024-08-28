"use client";
import React, { useState } from "react";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
	DateRangePicker,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { Select as NextUISelect, SelectItem } from "@nextui-org/react";
import axios from "axios";

interface WorkspaceData {
	start_date: string;
	end_date: string;
	granularity: string;
	total_workspaces: number;
	total_videos: number;
	workspace_summary: {
		workspace_id: string;
		workspace_name: string;
		total_videos: number;
		active_periods: number;
	}[];
	trend_data: {
		date: string;
		count: number;
	}[];
	avg_videos_per_hour: number;
	max_videos_in_period: number;
	min_videos_in_period: number;
	total_active_hours: number;
	workspace_utilization: number;
}

export default function GetWorkspaceUsage() {
	const [dateRange, setDateRange] = useState({
		start: parseDate("2024-07-01"),
		end: parseDate("2024-07-15"),
	});
	const [granularity, setGranularity] = useState("daily");
	const [workspaceData, setWorkspaceData] = useState<WorkspaceData | null>(
		null,
	);

	const fetchWorkspaceUsage = async () => {
		try {
			const formattedStartDate = dateRange.start.toString();
			const formattedEndDate = dateRange.end.toString();
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/workspace-usage/?start_date=${formattedStartDate}&end_date=${formattedEndDate}&granularity=${granularity}`,
			);
			setWorkspaceData(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching workspace usage:", error);
		}
	};

	const params = {
		label: "Select Period",
		data: [
			{ id: "daily", label: "Daily" },
			{ id: "weekly", label: "Weekly" },
			{ id: "monthly", label: "Monthly" },
		],
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">User Workspace Usage For All Users</h1>
			<p>Welcome to the User Workspace Usage For All Users page</p>
			<div className="flex items-start justify-center gap-4">
				<DateRangeCalender value={dateRange} onChange={setDateRange} />
				<DropDown params={params} setGranularity={setGranularity} />
				<Button onClick={fetchWorkspaceUsage} size="lg" className="text-xs">
					Get Workspace Usage
				</Button>
			</div>
			{workspaceData && (
				<div className="mt-8">
					<h2 className="text-xl font-bold mb-4">Workspace Usage Summary</h2>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p>
								<strong>Start Date:</strong> {workspaceData.start_date}
							</p>
							<p>
								<strong>End Date:</strong> {workspaceData.end_date}
							</p>
							<p>
								<strong>Granularity:</strong> {workspaceData.granularity}
							</p>
						</div>
						<div>
							<p>
								<strong>Total Workspaces:</strong>{" "}
								{workspaceData.total_workspaces}
							</p>
							<p>
								<strong>Total Videos:</strong> {workspaceData.total_videos}
							</p>
							<p>
								<strong>Avg Videos Per Hour:</strong>{" "}
								{workspaceData.avg_videos_per_hour.toFixed(2)}
							</p>
						</div>
					</div>

					<h3 className="text-lg font-bold mb-2">Workspace Summary</h3>
					<Table aria-label="Workspace summary table">
						<TableHeader>
							<TableColumn>Workspace ID</TableColumn>
							<TableColumn>Workspace Name</TableColumn>
							<TableColumn>Total Videos</TableColumn>
							<TableColumn>Active Periods</TableColumn>
						</TableHeader>
						<TableBody>
							{workspaceData.workspace_summary.map((workspace) => (
								<TableRow key={workspace.workspace_id}>
									<TableCell>{workspace.workspace_id}</TableCell>
									<TableCell>{workspace.workspace_name}</TableCell>
									<TableCell>{workspace.total_videos}</TableCell>
									<TableCell>{workspace.active_periods}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<h3 className="text-lg font-bold mt-4 mb-2">Trend Data</h3>
					<Table aria-label="Trend data table">
						<TableHeader>
							<TableColumn>Date</TableColumn>
							<TableColumn>Count</TableColumn>
						</TableHeader>
						<TableBody>
							{workspaceData.trend_data.map((trend) => (
								<TableRow key={trend.date}>
									<TableCell>{trend.date}</TableCell>
									<TableCell>{trend.count}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<div className="mt-4">
						<p>
							<strong>Max Videos in Period:</strong>{" "}
							{workspaceData.max_videos_in_period}
						</p>
						<p>
							<strong>Min Videos in Period:</strong>{" "}
							{workspaceData.min_videos_in_period}
						</p>
						<p>
							<strong>Total Active Hours:</strong>{" "}
							{workspaceData.total_active_hours}
						</p>
						<p>
							<strong>Workspace Utilization:</strong>{" "}
							{workspaceData.workspace_utilization.toFixed(2)}%
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
const DateRangeCalender = ({
	value,
	onChange,
}: {
	value: any;
	onChange: any;
}) => {
	let formatter = useDateFormatter({ dateStyle: "long" });

	return (
		<div className="flex flex-row gap-2">
			<div className="w-full flex flex-col gap-y-2">
				<DateRangePicker label="Date range" value={value} onChange={onChange} />
				<p className="text-default-500 text-sm">
					Selected date:{" "}
					{value
						? formatter.formatRange(
								value.start.toDate(getLocalTimeZone()),
								value.end.toDate(getLocalTimeZone()),
						  )
						: "--"}
				</p>
			</div>
		</div>
	);
};

interface DropDownProps {
	params: {
		label: string;
		data: Array<{ id: string; label: string }>;
	};
	setGranularity: React.Dispatch<React.SetStateAction<string>>;
}

const DropDown: React.FC<DropDownProps> = ({ params, setGranularity }) => {
	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGranularity(e.target.value.toLowerCase());
	};

	return (
		<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
			<NextUISelect
				label={params.label}
				className="max-w-xs"
				onChange={handleSelectionChange}
			>
				{params.data.map((item) => (
					<SelectItem key={item.id} value={item.id}>
						{item.label}
					</SelectItem>
				))}
			</NextUISelect>
		</div>
	);
};
