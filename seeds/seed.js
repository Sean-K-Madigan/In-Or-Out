

const sequelize = require('../config/connection')
const seedUsers = require('./userData')
const seedEvents = require('./eventData')
const colors = require('colors')

const seedDatabase = async () => {
try {
	await sequelize.sync({ force: true })
	console.log('DATABASE SYNCED'.bgCyan)
	
	await seedUsers()
	console.log('USERS SEEDED'.bgBlue)
	
	await seedEvents()
	console.log('Events SEEDED'.bgGreen)
	
	// todo add functions to seed 'Particpents' and 'Friends'
	
	process.exit(0)
	
} catch (error) {
	console.log('ERROR: '.red, error)
}
}
	seedDatabase()