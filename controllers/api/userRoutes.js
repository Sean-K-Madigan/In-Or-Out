const router = require('express').Router()
const User = require('../../models/User')
const Event = require('../../models/Event')
const Sequelize = require('sequelize')

// sign up
router.post('/signup', async (req, res) => {
	
	try {
		let {name, username, email, password1, password2, bio, hobbies} = req.body
		name = name.toLowerCase().trim()
		console.log(`name: ${name}, username: ${username}, password1: ${password1}, password2: ${password2} bio: ${bio}, hobbies:${hobbies}`.yellow)
		if(!name || !username || !password1 || !password2 || !email){
			console.log('Please enter a username, email, and password.')
			return
		}
		if(password1 !== password2){
			console.log('Passwords do not match')
			// *prompt Error
			return
		}

		const userValidate = await User.findOne({ where: 
			{
			username : username
			}
		})

		if(userValidate){
			// console.log('Username already exists')
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
		console.log(`username: ${username}, password: ${password}`.yellow)

		if(!username || !password){
			return res.status(400).json({ message: 'Please enter a username and password' })
			// *prompt Error
		}

		const userData = await User.findOne({ where: { username } })

		if (!userData) {
			return res.status(404).json({ message: 'Username not found, please try again' })
		}
		
		const validPassword = await userData.checkPassword(password)
		
		if (!validPassword) {
			return res.status(400).json({ message: 'Incorrect password please try again' })
			// *prompt Error
		}
		req.session.save(() => {
			req.session.user_id = userData.id
			req.session.username = userData.username
			req.session.logged_in = true
			console.log( `session: ${req.session.logged_in}`.cyan)
			res.redirect('/')
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
		
		if(!event){
			return res.status(404).json({ message: 'Event not found' })
			// *prompt Error
		}

		const user = await User.findByPk(req.session.user_id)
		console.log(`user: ${user.event_id}`.yellow)

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

//hide/leave event
// todo not working
router.get('/leave/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const event = await Event.findByPk(eventId)
		if(!event){
			res.status(404).json({ message: 'Event not found' })
			return
		}
		const user = await User.findByPk(req.session.user_id)
		let userEvents = user.event_id || []
		userEvents = userEvents.filter(event => event !== eventId)
		console.log(`userEvents: ${userEvents}`.yellow)
		res.status(200).json({ message: `successfully left event ${event.title}` })
	} catch (error) {
		console.log(`Error occured when trying to leave event`, error.error)
	}
})


// get all users-not needed, but for refrence
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll({
			include:[
				{
					model: Event,
					as: 'ParticipatingEvents',
					through: 'UserEvent'
				},
				{
					model: User,
					as: 'Friends',
					through: 'Network'
				}
			]
		})

		if(!users || users.length === 0){
			res.status(404).json({ message: 'No users found' })
			return
		}
		res.status(200).json(users)
	} catch (error) {
		console.log(`Error occured when trying to get all users`.red, error)
	}
})
module.exports = router