const User = require('./User')
const Event = require('./Event')

User.hasMany(Event, {
	foreignKey: 'creator_id',
	onDelete: 'CASCADE'
})

Event.belongsTo(User, {
	foreignKey: 'creator_id'
})

User.belongsToMany(User, {
	as: 'Friends',
	through: 'Network', 
	foreignKey: 'user_id',
	otherKey: 'friend_id'
})

User.hasMany(User, {
	as: 'Friend',
	through: 'Network',
	foreignKey: 'friend_id',
	otherKey: 'user_id'
})

User.belongsToMany(Event, {
	as: 'Participents',
	through: 'UserEvent', 
	foreignKey: 'user_id',
	otherKey: 'event_id'
})

Event.hasMany(User, {
	as: 'Participents',
	through: 'UserEvent',
	foreignKey: 'event_id',
	otherKey: 'user_id'
})


Event.belongsToMany(User, {
	through: 'UserEvent',
	foreignKey: 'event_id',
	otherKey: 'user_id'
})

User.hasMany(Event, {
	through: 'UserEvent',
	foreignKey: 'user_id',
	otherKey: 'event_id'
})

module.exports = { User, Event }