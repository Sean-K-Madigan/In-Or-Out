const router = require('express').Router()
const User = require('../models/User')
const Event = require('../models/Event')
const Sequelize = require('sequelize')

// todo userId updated from req.session.id
// get profile page
router.get('/', async (req, res) => {
	const userId = req.session.user_id
	try {
		const profileData = await User.findByPk(userId, {
			attributes: { exclude: ['password'] },
			// 
			include : [
				{
					model: Event,
					through: 'UserEvent',
					as: 'ParticipatingEvents'
				},
				{
					model: User,
					as: 'Friends',
					through: 'Network'
				}
			]
		})

		// createdEvents
		const createdEventsData = await Event.findAll({
			where:{
				creator_id: userId
			}
		})

		// upcomingEvents
		const upcomingEventsData = await Event.findAll({
			include:[
				{
					model: User,
					as: 'Participants',
					through: { attributes: [] }
				}
			],
			where:{
				id: userId
			}
		})
		const profile = profileData.get({ plain: true })
		const createdEvents = createdEventsData.map(event => event.get({ plain: true }))
		console.log(`createdEvents: ${JSON.stringify(createdEvents)}`.green)
		const friends = profileData.Friends.map(friend => friend.get({ plain: true }));
		const upcomingEvents = upcomingEventsData.map(event => event.get({ plain: true }))
		


		// res.status(200).json(profile, createdEvents, friends, upcomingEvents)
		res.render('profile', { 
			profile,
			createdEvents,
			friends,
			upcomingEvents,
			logged_in: req.session.logged_in 
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Error occured when trying to get profile page', error: error })
	}
})




module.exports = router