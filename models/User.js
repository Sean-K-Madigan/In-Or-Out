const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class User extends Model {
  async checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

User.init(
  {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
      }
    },
    
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8],
        msg: 'Password must be at least 8 characters long'}
      }
    },
    
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },

    hobbies:{
      type: DataTypes.STRING,
      allowNull: true
    }
},
{
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password){
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        } 
        return updatedUserData
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)

module.exports = User
