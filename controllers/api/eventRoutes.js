const router = require('express').Router()
const Event = require('../../models/Event')
const Sequelize = require('sequelize')


// get all events
router.get('/', async (req, res) => {
	try {
		const events = await Event.findAll()
		if(!events){
			res.status(404).json({ message: 'No events found' })
			return
		}
		res.status(200).json(events)
	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to get all events, please try again.', error })
	}
})

// create event
router.post('/createEvent', async (req, res) => {
	try {
		let {title, date, description, category} = req.body
		const creator_id = req.session.user_id
		if(!title || !date){
			res.status(400).json({ message: 'Title and date are required' })
			return
		}
		const newEventData = await Event.create({
			title,
			date,
			description,
			category,
			creator_id
		})
		res.redirect('/')
	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to create event, please try again.', error })	
	}
})

module.exports = router