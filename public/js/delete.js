document.addEventListener('DOMContentLoaded', () => {
	const deleteButtons = document.querySelectorAll('#delete-btn')


deleteButtons.forEach(button =>{
	button.addEventListener('click', deleteHandler)
})
})

const deleteHandler = async (event) =>{
	event.preventDefault()
	
	const eventId = event.target.dataset.id
	console.log(`delete button clicked ${eventId}`)
	
	try {
		if(eventId){
			const response = await fetch(`/api/events/delete/${eventId}`,{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(response.ok){
				console.log('successfully deleted event')
				document.location.replace('/profile')
			}
			else(
				alert('Failed to delete event')
			)
		}
		else{
			alert ('No event found')
		}
		
	} catch (error) {
		alert ('Error in deleting event', error.message)
	}
}
