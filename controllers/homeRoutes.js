const router = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Sequelize = require('sequelize')
const color = require('colors')


// render events
router.get('/', async (req, res) => {
	try {
		const eventData = await Event.findAll()
		if(!eventData || eventData === 0){
			res.status(404).json({ message: 'No events found' })
			return
		}
		const events = eventData.map((event) => event.get({ plain: true }))
			
			
		// for checking if logged in
		const context = {
			events: events,
			logged_in: req.session.logged_in
		}
		console.log(context)
		
		res.render('homepage', { 
			events,
			logged_in: req.session.logged_in,
			userId: req.session.user_id
		})
		// res.status(200).json(events)
	} catch (error) {
		console.log(`Error occured when trying to get all events`.red, error)
	}
})

router.get('/search', async (req, res) => {
	try {
		const users = await searchUser(req, res)
		const events = await searchEvent(req, res)
		console.log('Users'.green, users, `Events`.green, events)

		if(users || events){
			res.status(200).json({ users:users, events:events })
			return
			}
			res.status(404).json({ message: 'No results found' })
		
	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to search', error })
	}
})
// search for users
async function searchUser(req, res){
		console.log('User req.query'.green, req.query)
		const { search } = req.query

		const searchData = await User.findAll({
			where: {
				[Sequelize.Op.or]: [
					{ username: { [Sequelize.Op.like]: `%${search}%` } },
					{ email: { [Sequelize.Op.like]: `%${search}%` } },
					{ name: { [Sequelize.Op.like]: `%${search}%` } },
					{ hobbies: { [Sequelize.Op.like]: `%${search}%` } }
				]
			},
			attributes: { exclude: ['password'] }
		})

		if(searchData.length < 1){
			return null
		}
			const userResults = searchData.map(user => user.get({ plain: true }))
			return userResults

}
async function searchEvent(req, res){
		console.log('Event req.query'.green, req.query)
		const { search } = req.query

		const searchData = await Event.findAll({
			where: {
				[Sequelize.Op.or]: [
					{ title: { [Sequelize.Op.like]: `%${search}%` } },
					{ category: { [Sequelize.Op.like]: `%${search}%` } },
					// todo look into how to search this.
					// { date: { [Sequelize.Op.like]: `%${search}%` } },
					{ created_by: { [Sequelize.Op.like]: `%${search}%` } }
				]
			},
		})

		if(searchData.length < 1){
			return null
		}
			const eventResults = searchData.map(event => event.get({ plain: true }))
			return eventResults
	
}
module.exports = router