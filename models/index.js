const User = require('./User')
const Event = require('./Event')
const { Op } = require('sequelize')

User.hasMany(Event, {
	foreignKey: 'creator_id',
	onDelete: 'CASCADE'
})

Event.belongsTo(User, {
	foreignKey: 'creator_id',
	as: 'creator'
})

User.belongsToMany(User, {
	as: 'Friends',
	through: 'Network', 
	foreignKey: 'user_id',
	otherKey: 'friend_id'
})

User.belongsToMany(Event, {
	through: 'UserEvent', 
	as: 'ParticipatingEvents',
	foreignKey: 'user_id'
})

Event.belongsToMany(User, {
	through: 'UserEvent',
	as: 'Participants',
	foreignKey: 'event_id'
})

// User.belongsToMany(Event, {
// 	through: 'UserEvent',
// 	as: 'HiddenEvents',
// 	foreignKey: 'user_id',
// 	otherKey: 'event_id',
// 	scope: {
// 			status: {
// 				[Op.not]: 'hidden'
// 			}
		
// 	}
// })

// Event.belongsToMany(User, {
// 	through: 'UserEvent',
// 	as: 'HiddenUsers',
// 	foreignKey: 'event_id',
// 	otherKey: 'user_id',
// 	scope: {
// 		status: {
// 			[Op.not]: 'hidden'
// 		}
// 	}
// })


module.exports = { User, Event }