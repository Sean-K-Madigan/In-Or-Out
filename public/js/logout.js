document.getElementById("logoutBtn").addEventListener("click", function(event) {
	event.preventDefault()

	fetch("/api/users/logout", {
		method: "POST"
	})
	.then(response => {
		window.location.href = "/"
	})
	.catch(error => {
		console.error("Error:", error)
	})
})
