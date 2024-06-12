const router = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Sequelize = require('sequelize')


// render events
router.get('/', async (req, res) => {
	try {
		const eventData = await Event.findAll({
			// todo find all by friends
			// todo add user info
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
		
		
		//for checking if logged in
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

// router.get('/search', (req, res) =>{
// 	const { term } = req.query

// 	if(!term)
// })
module.exports = router