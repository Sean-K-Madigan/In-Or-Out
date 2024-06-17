document.addEventListener('DOMContentLoaded', () => {
	const addFriendBtn = document.querySelectorAll('#add-friend-btn')

	addFriendBtn.forEach(button =>{
		button.addEventListener('click', addFriendHandler)
	})
})


const addFriendHandler = async (event) => {
	event.preventDefault()
	const userId = await event.target.dataset.user
	const friendId = await event.target.dataset.id
	
	console.log(`addFriend button clicked${userId} ${friendId}`)
	
	try {
		if(userId && friendId){
			console.log(`userId: ${userId} eventId: ${friendId}`)
			const response = await fetch(`/api/users/addfriend/${friendId}`, {
				method: 'POST',
				body: JSON.stringify({friend_id: friendId, user_id: userId}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

				if(response.ok){
					console.log('successfully added friend')
					
					// redirect
					document.location.replace('/profile')
				}
				else{
				
					alert('Failed to add friend')
				}
			}else{
				console.log('No friend found')
			}
		}catch (error) {
		console.log(`Error occured when trying to add friend`)
		}
	
} 


