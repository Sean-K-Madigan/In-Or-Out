

const sequelize = require('../config/connection')
const seedUsers = require('./userData')
const seedEvents = require('./eventData')
const colors = require('colors')

const seedDatabase = async () => {
try {
	await sequelize.sync({ force: true })
	console.log('DATABASE SYNCED'.bgCyan)
	
	const users = await seedUsers()
	console.log('USERS SEEDED'.bgBlue)
	
	const events = await seedEvents()
	console.log('Events SEEDED'.bgGreen)
	
	await Promise.all([
		//friends
		users[0].addFriends([users[1], users[2], users[3]]),
		users[1].addFriends([users[0], users[2]]),
		users[2].addFriends([users[0], users[1]]),
		users[3].addFriends([users[4], users[5], users[0]]),
		users[4].addFriends([users[3], users[5]]),
		users[5].addFriends([users[4], users[6]]),

		//participants
		users[0].addParticipatingEvents([events[3, 4, 5]]),
		users[1].addParticipatingEvents([events[3, 4]]),
		users[2].addParticipatingEvents([events[4, 5]]),
		users[3].addParticipatingEvents([events[2]]),
		users[4].addParticipatingEvents([events[1, 2, 3]]),
		users[5].addParticipatingEvents([events[0, 1, 2]])
	])
	
	console.log('all seeds complete'.bgYellow.black)

	process.exit(0)
	
} catch (error) {
	console.log('ERROR: '.red, error)
}
}
	seedDatabase()