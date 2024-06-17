document.addEventListener('DOMContentLoaded', () => {
	const hideBtn = document.querySelectorAll('#hide-btn')

	hideBtn.forEach(button =>{
		button.addEventListener('click', hideHandler)
	})
})


const hideHandler = async (event) => {
	event.preventDefault()
	const userId = await event.target.dataset.user
	const eventId = await event.target.dataset.id
	
	console.log(`hide button clicked${userId} ${eventId}`)
	
	try {
		if(userId && eventId){
			console.log(`userId: ${userId} eventId: ${eventId}`)
			const response = await fetch(`/api/users/hide/${eventId}`, {
				method: 'POST',
				body: JSON.stringify({event_id: eventId, user_id: userId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
				if(response.ok){
					console.log('successfully hid event')
					
					// redirect
					document.location.replace('/')
				}
				else{
					
					alert('Failed to hide event')
				}
			}else{
				console.log('No event found')
			}
		}catch (error) {
		console.log(`Error occured when trying to hide event`, error )
		}
	
} 


