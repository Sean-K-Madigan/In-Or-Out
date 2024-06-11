const router = require('express').Router()
const User = require('../../models/User')
const Sequelize = require('sequelize')


// login
router.post('/', async (req, res) => {
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
				res.json({ user: userData, message: 'You are now logged in!' })
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