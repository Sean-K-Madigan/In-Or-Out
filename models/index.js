const User = require('./User')
const Event = require('./Event')
const UserEvent = require('./UserEvent')
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

Event.belongsToMany(User, {
	through: {
	model: UserEvent,
	  scope: { isHidden: true } // Scope to get hidden users
	},
	as: 'HiddenUsers',
	foreignKey: 'event_id'
});

User.belongsToMany(Event, {
	through: {
	model: UserEvent,
	  scope: { isHidden: true } // Scope to get hidden events
	},
	as: 'HiddenEvents',
	foreignKey: 'user_id'
});


module.exports = { User, Event }