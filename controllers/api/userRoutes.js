const router = require('express').Router()
const User = require('../../models/User')
const Sequelize = require('sequelize')

// sign up
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
			})
		res.json({ user: userData, message: 'You are now logged in!' })
			
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
				res.json({ user: userData, message: 'You are now logged in!', session: req.session.logged_in})
			})
			}
		}
	} catch (error) {
		console.log(`Error occured when trying authenticate login`, error)
		res.status(500).json({ message: 'Error occured when trying to authenticate login, please try again.', error })
	}
})

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

//// post login
// post signup
// get logout

module.exports = router