const router = require('express').Router()
const User = require('../../models/User')
const Event = require('../../models/Event')
const UserEvent = require('../../models/UserEvent')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')

// sign up
router.post('/signup', async (req, res) => {
	
	try {
		let {name, username, email, password1, password2, bio, hobbies} = req.body
		name = name.toLowerCase().trim()

		if(!name || !username || !password1 || !password2 || !email){
			console.log('Please enter a username, email, and password.')
			return
		}
		if(password1 !== password2){
			console.log('Passwords do not match')
			return
		}

		const userValidate = await User.findOne({ where: 
			{
			username : username
			}
		})

		if(userValidate){
			throw new Error('Username already exists')
		}
		
		const password = password1
		const user = {
			name,
			username,
			password,
			email,
			bio,
			hobbies
		}
		
		const userData = await User.create(user)
		
		req.session.save(() => {
			req.session.user_id = userData.id
			req.session.username = userData.username
			req.session.logged_in = true
			console.log( `session: ${req.session.logged_in}`.cyan)
			res.redirect('/')
			})
			
	} catch (error) {
		console.log(`Error occured when trying to sign up`, error)
		res.status(500).json({message: 'Server Trouble signing up', error})	
	}
})

// login
router.post('/login', async (req, res) => {
	try {
		let { username, password } = req.body
		username = username.toLowerCase().trim()

		if(!username || !password){
			return res.status(400).json({ message: 'Please enter a username and password' })
		}

		const userData = await User.findOne({ 
			where: { 
				username 
			} 
		})


		if (!userData) {
			return res.status(404).json({ message: 'Username not found, please try again' })
			// *not specify if user/password
		}
		
		const validPassword = await userData.checkPassword(password, userData.password )
		
		if (!validPassword) {
			return res.status(400).json({ message: 'Incorrect password please try again' })
		}
		req.session.save(() => {
			req.session.user_id = userData.id
			req.session.username = userData.username
			req.session.logged_in = true
			console.log( `session: ${req.session.logged_in}`.cyan)
			res.redirect('/')
// *do on front end.

			console.log(`session data${req.session.username}`.blue)
		})
		
		
	} catch (error) {
		console.log(`Error occured when trying authenticate login`, error)
		res.status(500).json({ message: 'Error occured when trying to authenticate login, please try again.', error })
	}
})

// logout
router.post('/logout', (req, res) => {
	if(req.session.logged_in){
		req.session.destroy(() => {
			res.status(204).end()
		})
	}else{
		res.status(404).end()
	}
})

//Join event
router.post('/join/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const event = await Event.findByPk(eventId)
		const user = await User.findByPk(req.body.user_id)
		
		if(!event){
			return res.status(404).json({ message: 'Event not found' })
			// *prompt Error
		}

		if(!user){
			return res.status(404).json({ message: 'User not found' })
			// *prompt Error
		}

		await user.addParticipatingEvent(event)
		
		res.redirect('/')
		// res.status(200).json({ message: `successfully joined event ${event.title}` })
	} catch (error) {
		console.log(`Error occured when trying to join event`, error)
		res.status(500).json({ message: 'Error occured when trying to join event, please try again.', error })
	}
})

//leave event
router.post('/leave/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const userId = req.session.user_id
		const event = await Event.findByPk(eventId)
		const user = await User.findByPk(userId)

		if(!event){
			return res.status(404).json({ message: 'Event not found' })
			// *prompt Error
		}

		if(!user){
			return res.status(404).json({ message: 'User not found' })
			// *prompt Error
		}

		const userEvent = await UserEvent.findOne({
			where: {
				user_id: userId,
				event_id: eventId
			}
		})

		if(!userEvent){
			
		await UserEvent.upsert({
			user_id: userId,
			event_id: eventId,
			isHidden: true
		})

			await user.removeParticipatingEvent(event)
		}

		
		res.redirect('/profile')
		// res.status(200).json({ message: `successfully left event ${event.title}` })
	} catch (error) {
		console.log(`Error occured when trying to join event`, error)
		res.status(500).json({ message: 'Error occured when trying to join event, please try again.', error })
	}
})

// upcoming events
router.get('/upcoming', async (req, res) => {
	try {
		console.log('req.session.user_id'.green, req.session.user_id)
		const eventData = await User.findAll({
			include:[
				{
				model: Event,
				as: 'ParticipatingEvents',
				through: 'UserEvent'
			}
		],
			where:{
				id: req.session.user_id
			}
		})

	const events = eventData.map(event => event.get({ plain: true }))
	res.status(200).json(events)
	// res.render('profile', events )

	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Error occured when trying to get events', error })
	}
})

// friends
router.get('/friends', async (req, res) => {
		try {
		const friendData = await User.findAll({
			include:[
				{
					model: User,
					as: 'Friends',
					through: 'Network'
				}
			],
			where:{
				id: req.session.user_id
			}
		})
		const friends = friendData.map(friend => friend.get({ plain: true }))
		res.status(200).json(friends)

	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to get friends', error })	
	}
})

// hide event
router.post('/hide/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const event = await Event.findByPk(eventId)
		console.log(`event: ${event.id}`.yellow)

		if(!event){
			res.status(404).json({ message: 'Event not found' })
			return
		}
		
		const user = await User.findByPk(req.session.user_id)
		console.log(`user: ${user.id}`.yellow)	
		if(!user){
			res.status(404).json({ message: 'User not found' })
			return
		}
		
		await user.addHiddenEvent(event, {through: { isHidden: true }})
		console.log(`event hidden`.yellow)

		await user.removeParticipatingEvent(event)
		res.redirect('/')

	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to hide event', error })
	}
})

// add friend
router.post('/addfriend/:id', async (req, res) =>{
	try {
		const friendId = req.params.id
		const userId = req.session.user_id

		const friend = await User.findByPk(friendId)
		const user = await User.findByPk(userId)

		if(!friend){
			res.status(404).json({ message: 'Friend not found' })
			return
		}
		if(!user){
			res.status(404).json({ message: 'User not found' })
			return
		}

		await user.addFriend(friend)
		console.log(`friend added`.yellow)
		res.redirect('/profile')


	} catch (error) {
		console.log(`Error occured when trying to add friend`, error)
		res.status(500).json({ message: 'Error occured when trying to add friend', error })
	}
})

// remove friend
router.post('/removeFriend/:id', async (req, res) =>{
	try {
		const friendId = req.params.id
		const userId = req.session.user_id

		const friend = await User.findByPk(friendId)
		const user = await User.findByPk(userId)

		if(!friend){
			res.status(404).json({ message: 'Friend not found' })
			return
		}
		if(!user){
			res.status(404).json({ message: 'User not found' })
			return
		}

		await user.removeFriend(friend)
		console.log(`friend added`.yellow)
		res.redirect('/profile')

	} catch (error) {
		console.log(`Error occured when trying to remove friend`, error)
		res.status(500).json({ message: 'Error occured when trying to remove friend', error })
	}
})


// todo get user by id
// todo update logged in user
// todo add friend
// todo remove friend



// get all users-not needed, but for refrence
// router.get('/', async (req, res) => {
// 	try {
// 		const users = await User.findAll({
// 			include:[
// 				{
// 					model: Event,
// 					as: 'ParticipatingEvents',
// 					through: 'UserEvent'
// 				},
// 				{
// 					model: User,
// 					as: 'Friends',
// 					through: 'Network'
// 				}
// 			]
// 		})

// 		if(!users || users.length === 0){
// 			res.status(404).json({ message: 'No users found' })
// 			return
// 		}
// 		res.status(200).json(users)
// 	} catch (error) {
// 		console.log(`Error occured when trying to get all users`.red, error)
// 	}
// })

// router.get('/userevents', async (req, res) => {
// 	const userEventDetails = await UserEvent.findAll()
// 	const userEvents = userEventDetails.map(userEvent => userEvent.get({ plain: true }))
// 	res.status(200).json(userEvents)
// })
//
module.exports = router