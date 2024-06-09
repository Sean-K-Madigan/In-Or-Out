const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class User extends Model {
  checkPassword(loginPw) {
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
      msg: 'Password must be at least 8 characters long',
      len: [8]
      }
    },
    
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    friend_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
},
{
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password){
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        } 
        return updatedUserData;
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
