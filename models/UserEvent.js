const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class UserEvent extends Model {}

UserEvent.init(
{
	user_id:{
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user',
			key: 'id'
		}
	},
	event_id:{
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'event',
			key: 'id'
		}
	},
	isHidden:{
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
},
{
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'userEvent'
}
)

module.exports = UserEvent
