document.addEventListener('DOMContentLoaded', () => {
	const leaveButtons = document.querySelectorAll('#leave-btn')

	leaveButtons.forEach(button =>{
		button.addEventListener('click', leaveHandler)
	})
})


const leaveHandler = async (event) => {
	event.preventDefault()
	const userId = await event.target.dataset.user
	const eventId = await event.target.dataset.id
	
	console.log(`leave button clicked${userId} ${eventId}`)
	
	try {
		if(userId && eventId){
			console.log(`userId: ${userId} eventId: ${eventId}`)
			const response = await fetch(`/api/users/leave/${eventId}`, {
				method: 'POST',
				body: JSON.stringify({event_id: eventId, user_id: userId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
				if(response.ok){
					console.log('successfully left event')
					
					// redirect
					document.location.replace('/profile')
				}
				else{
					
					alert('Failed to leave event')
				}
			}else{
				console.log('No event found')
			}
		}catch (error) {
		console.log(`Error occured when trying to leave event`)
		}
	
} 


