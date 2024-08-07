const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
{
    id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
    },
    
	title: {
		type: DataTypes.STRING,
		allowNull: false
    },
    
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			isDate: true,
			}
	},

	time: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 'TBD'
	},
	
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	category: {
		type: DataTypes.STRING,
		allowNull: true,
	},

	participantLimit:{
		type: DataTypes.INTEGER,
		allowNull: true,
	},

	created_by: {
		type: DataTypes.STRING,
		allowNull: false
	},
	
	creator_id:{
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user',
			key: 'id',
		}
	}
},
{
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'event'
})

module.exports = Event
