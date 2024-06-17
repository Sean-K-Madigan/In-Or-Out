const router = require('express').Router()
const { Event, User, UserEvent } = require('../models')
const Sequelize = require('sequelize')
const color = require('colors')



// render events
// todo filter friends events
router.get('/', async (req, res) => {
	try {
		const eventData = await Event.findAll({
			include:[
				{
					model: User,
					as: 'Participants',
					through: { attributes: [] },
					attributes: { exclude: ['password'] }
				},
				{
					model: User,
					as: 'HiddenUsers',
					through: 'UserEvent'
				}
			],
			where: {
				creator_id: { [Sequelize.Op.ne]: req.session.user_id }
			},
			order: [['date', 'ASC']]
		})
		if(!eventData || eventData === 0){
			return res.status(404).json({ message: 'No events found' })
		}

		const filteredEvents = eventData.filter(event => {
			const isParticipating = event.Participants.some(participant => participant.id == req.session.user_id)
			const isHidden = event.HiddenUsers.some(hiddenUser => hiddenUser.id == req.session.user_id)
		
			return !isParticipating && !isHidden
		})

		const events = filteredEvents.map((event) => event.get({ plain: true }))
			

		const context = {
			events: events,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id
			}
		// for checking if logged in & what's passed
		console.log(context)

		res.render('homepage', context)
		// res.status(200).json(context)
	} catch (error) {
		console.log(`Error occured when trying to get all events`.red, error)
	}
})

// SEARCHES
//  render results to search result page
router.get('/search', async (req, res) => {
	try {
		const users = await searchUser(req, res)
		const events = await searchEvent(req, res)
		console.log('Users'.green, users, `Events`.green)

		if(users || events){
			const searchResults = {
				users, 
				events, 
				user_id: req.session.user_id,
				logged_in: req.session.logged_in
			}
			console.log()
			console.log('SearchResults:'.blue, searchResults)
			res.render('searchResults', searchResults )
			// res.status(200).json({ searchResults })
			return
			}
			res.status(404).json({ message: 'No results found' })
		
	} catch (error) {
		console.log(`Error occured when trying to search`.red, error)
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
			attributes: { 
				exclude: ['password']}
		})

		if(searchData.length < 1){
			return null
		}
			const users = searchData.map(user => user.get({ plain: true }))
			return users
}
// search for events
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
			}
		})

		if(searchData.length < 1){
			return null
		}
			const events = searchData.map(event => event.get({ plain: true }))
			return events
	
}



module.exports = router