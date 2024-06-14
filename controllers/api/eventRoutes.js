const router = require('express').Router()
const Event = require('../../models/Event')
const User = require('../../models/User')
const Sequelize = require('sequelize')


// create event
router.post('/createEvent', async (req, res) => {
	try {
		let {title, date, description, category} = req.body
		const createdByUsername = req.session.username
		if(!title || !date){
			res.status(400).json({ message: 'Title and date are required' })
			return
		}
		const newEventData = await Event.create({
			title,
			date,
			description,
			category,
			created_by: createdByUsername,
			creator_id: req.session.user_id
		})
		const newEvent = newEventData.get({ plain: true })
		const newEventId = newEvent.id
		const creatorEvents = createdByUsername.event_id || []
		creatorEvents.push(newEventId)
		const creator = await User.findByPk(req.session.user_id)
		const updatedCreator = await creator.update({ 'event_id': creatorEvents })
		console.log(updatedCreator)
		res.redirect('/')
	} catch (error) {
		console.log(`Error occured when trying to create event`, error)
		res.status(500).json({ message: 'Error occured when trying to create event, please try again.', error })	
	}
})

// delete event
router.delete('/delete/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const event = await Event.findByPk(eventId)
		if(!event){
			res.status(404).json({ message: 'Event not found' })
			return
		}
		await event.destroy()
		res.status(200).json({ message: `successfully deleted event ${event.title}` })
	} catch (error) {
		console.log(`Error occured when trying to delete event`, error)
		res.status(500).json({ message: 'Error occured when trying to delete event, please try again.', error })
	}
})

// update event
router.put('/update/:id', async (req, res) => {
	try {
		let {title, date, description, category} = req.body
		const eventId = req.params.id
		const event = await Event.findByPk(eventId)
		if(!event){
			return res.status(404).json({ message: 'Event not found' })
		}
		const updatedEvent = await Event.update({
			title,
			date,
			description,
			category
		}, {
			where: {
				id: eventId
			}
			})
		res.redirect('/profile')

	} catch (error) {
		res.status(500).json({ message: 'Error occured when trying to update event', error })
	}
})
// mostly for testing updating events
// one event
router.get('/:id', async (req, res) => {
	try {
		const eventId = req.params.id
		const eventData = await Event.findByPk(eventId)
		if(!eventData){
			return res.status(404).json({ message: 'Event not found' })
		}
		const event = eventData.get({ plain: true })
		res.status(200).json(event)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Error occured when trying to find event', error })
	}
})

module.exports = router