module.exports = {
	format_date: (date) => {
	return date.toLocaleDateString()
	},
	// format_time: (time) => {
	// 	if (!time) {
	// 		return "TBD"
	// 	}
	
	// 	let parsedTime = new Date(time)
	
	// 	if (isNaN(parsedTime.getTime())) {
	// 		return "Not a valid time"
	// 	}
	
	// 	return parsedTime.toLocaleTimeString()
	// }
	
}