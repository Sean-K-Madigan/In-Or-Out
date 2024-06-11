const router = require('express').Router()
const User = require('../../models/User')
const Sequelize = require('sequelize')

// sign up
// todo-check for username
router.post('/signup', async (req, res) => {
	
	try {
		let {username, email, password1, password2, bio} = req.body
		console.log(`username: ${username}, password1: ${password1}, password2: ${password2}`.yellow)
		if(!username || !password1 || !password2 || !email){
			return res.status(400).json({message: 'Please enter a username, email, and password'})
		}
		if(password1 !== password2){
			return res.status(400).json({message: 'Passwords do not match'})
		}
		// todo check if user exists- if so return error
		
		const password = password1
		const user = {
			username,
			password,
			email,
			bio
		}
		
		const userData = await User.create(user)
		
		req.session.save(() => {
			req.session.user_id = userData.id
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

		if(!username || !password){
			res.status(400).json({ message: 'Please enter a username and password' })
			return
		}

		const userData = await User.findOne({ where: { username } })

		if (!userData) {
			res.status(404).json({ message: 'Username not found, please try again' })
			return
		}else{
			const validPassword = userData.checkPassword(password)
			if (!validPassword) {
				res.status(400).json({ message: 'Incorrect password please try again' })
				return
			}else{
			req.session.save(() => {
				req.session.user_id = userData.id
				req.session.logged_in = true
				console.log( `session: ${req.session.logged_in}`.cyan)
				res.redirect('/')
				})
			}
		}
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
				
// get all users-not needed, but for refrence
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll()
		if(!users){
			res.status(404).json({ message: 'No users found' })
			return
		}
		res.status(200).json(users)
	} catch (error) {
		console.log(`Error occured when trying to get all users`.red, error.red)
	}
})
module.exports = router