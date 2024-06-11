const router = require('express').Router()
const Event = require('../../models/Event')
const Sequelize = require('sequelize')



router.get('/', async (req, res) => {
	try {
		const events = await Event.findAll()
		if(!events){
			res.status(404).json({ message: 'No events found' })
			return
		}
		res.status(200).json(events)
	} catch (error) {
		console.log(`Error occured when trying to get all events`.red, error.red)
	}
})


module.exports = router