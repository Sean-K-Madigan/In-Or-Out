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
	// return
	//// just trying to see if i get info first
	
	try {
		// const userEvents = userData.event_id || []
		if(userId && eventId){
			const response = await fetch(`/api/join/${eventId}`, {
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
					alert('Failed to join event', response.statusText)
				}
			}
		}catch (error) {
		console.log(`Error occured when trying to join event`, error)
		}
	
} 
// document.addEventListener('DOMContentLoaded', () =>{
// 	document.querySelector('#join-button')
// // if(!#join-button)
// 	.addEventListener('click', joinHandler)
// })




