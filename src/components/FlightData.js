import React from 'react';

export default ({ row, update, index }) => {
	let date = new Date(Date.parse(row.dateOld));
	let delayedDate = new Date(Date.parse(row.dateNew));
	
	const optionsDate = {
		hour: "numeric",
		minute: "numeric",
		month: "short",
		day: "numeric"
	}
	
	return (
		<tr onClick={() => update({ active: index })}>
			<td>{date.toLocaleString("ru", optionsDate)}</td>
			<td className="index_td_delay">{row.delayed ? delayedDate.toLocaleString("ru", optionsDate) : ''}</td>
			<td>{row.cityName}</td>
			<td>{row.airlineName} {row.airlineFlightNumber}</td>
			<td>{row.terminal}</td>
			<td>{row.status}</td>
		</tr>
	);
};