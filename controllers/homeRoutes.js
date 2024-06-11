const router = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Sequelize = require('sequelize')



router.get('/', async (req, res) => {
	try {
		const eventData = await Event.findAll({
			// *add user info later
			// include: [
			// 	{
			// 		model: User,
			// 		attributes: ['username'],
			// 		exclude: ['password, email']				}
			// ]
		})
		const events = eventData.map(event => event.get({ plain: true }))
		// * i don't think we need this if we're handeling this in the handlebars.
		// if(!events){
			// 	res.status(404).json({ message: 'No events found' })
		// 	return
		// }
		const context = {
			events: events,
			logged_in: req.session.logged_in
		}
		console.log(context)
		res.render('homepage', { events,
			logged_in: req.session.logged_in
		})
		// res.status(200).json(events)
	} catch (error) {
		console.log(`Error occured when trying to get all events`.red, error)
	}
})


module.exports = router