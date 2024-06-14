const router = require('express').Router()
const User = require('../models/User')
const Event = require('../models/Event')
const Sequelize = require('sequelize')

// todo userId updated from req.session.id
// get profile page
router.get('/', async (req, res) => {
	const userId = req.session.user_id
	try {
		const profileData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			// 
			include : [
				{
					model: Event,
					through: 'UserEvent',
					as: 'ParticipatingEvents'
				}
			]
		})

		// createdEvents
		const createdEventsData = await Event.findAll({
			where:{
				creator_id: userId
			}
		})

		// friends
		const friendData = await User.findAll({
			include:[
				{
					model: User,
					as: 'Friends',
					through: 'Network'
				}
			],
			where:{
				id: userId
			}
		})

		// upcomingEvents
		const upcomingEventsData = await User.findAll({
			include:[
				{
					model: Event,
					as: 'ParticipatingEvents',
					through: { attributes: [] }
				}
			],
			where:{
				id: userId
			}
		})
		const profile = profileData.get({ plain: true })
		const createdEvents = createdEventsData.map(event => event.get({ plain: true }))
		const friends = friendData.map(friend => friend.get({ plain: true }))
		const upcomingEvents = upcomingEventsData.map(event => event.get({ plain: true }))
		


		// res.status(200).json(profile)
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