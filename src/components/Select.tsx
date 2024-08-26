import React from "react";
import { Select as NextUISelect, SelectItem } from "@nextui-org/react";

export default function Select({ params }: { params: any }) {
	return (
		<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
			<NextUISelect label={params.label} className="max-w-xs">
				{params.data.map((item: any) => (
					<SelectItem key={item.id} value={item.id}>
						{item.label}
					</SelectItem>
				))}
			</NextUISelect>
		</div>
	);
}
