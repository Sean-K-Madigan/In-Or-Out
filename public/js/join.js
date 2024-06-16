document.addEventListener('DOMContentLoaded', () => {
	const joinButtons = document.querySelectorAll('#join-button')

	joinButtons.forEach(button =>{
		button.addEventListener('click', joinHandler)
	})
})


const joinHandler = async (event) => {
	event.preventDefault()
	const userId = await event.target.dataset.user
	const eventId = await event.target.dataset.id
	
	console.log(`join button clicked${userId} ${eventId}`)
	
	try {
		if(userId && eventId){
			console.log(`userId: ${userId} eventId: ${eventId}`)
			const response = await fetch(`/api/users/join/${eventId}`, {
				method: 'POST',
				body: JSON.stringify({event_id: eventId, user_id: userId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
				if(response.ok){
					console.log('successfully joined event')
					
					// redirect
					document.location.replace('/profile')
				}
				else{
				
					alert('Failed to join event')
				}
			}else{
				console.log('No event found')
			}
		}catch (error) {
		console.log(`Error occured when trying to join event`)
		}
	
} 


