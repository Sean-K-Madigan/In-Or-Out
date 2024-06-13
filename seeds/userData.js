const { User } = require('../models');

const userData = [
	
	{	"name": "alice",
		"username": "alicewonderland",
		"email": "alice@example.com",
		"password": "alice123",
		"bio": "Hello, I'm Alice! I love coding, hiking, and playing the guitar.",
		"hobbies": "reading, exploring, crafting",
		
	},
	{	"name": "bob",
		"username": "bobbuilder",
		"email": "bob@example.com",
		"password": "bob456",
		"bio": "Hi, I'm Bob! I enjoy reading, cooking, and traveling to new places.",
		"hobbies": "building, running, creating",
		
	},
	{	"name": "charlie",
		"username": "charliechocolate",
		"email": "charlie@example.com",
		"password": "charlie789",
		"bio": "Hey there, I'm Charlie! I'm passionate about photography, gaming, and exploring the outdoors.",
		"hobbies": "baking, tasting, meditation",
		
	},
	{	"name": "kermit",
		"username": "kermitfrog",
		"email": "kermit@example.com",
		"password": "david123",
		"bio": "Nice to meet you, I'm Kermit! I'm a movie enthusiast, coffee lover, and a tech geek.",
		"hobbies": "singing, team sports, exploring",
		
	},
	{	"name": "emma",
		"username": "emmawhats",
		"email": "emma@example.com",
		"password": "emma456",
		"bio": "Hi, I'm Emma! I enjoy painting, yoga, and trying out new recipes in the kitchen.",
		"hobbies": "studying, learning, gardening",
		
	},
	{	"name": "Frank",
		"username": "frankmill",
		"email": "frank@example.com",
		"password": "frank789",
		"bio": "Hello, I'm Frank! I'm a sports fanatic, music lover, and a dog person.",
		"hobbies": "storytelling, yoga, drawing",
		
	},
	{	"name":"grace",
		"username": "graceface",
		"email": "grace@example.com",
		"password": "grace123",
		"bio": "Hi there, I'm Grace! I'm passionate about writing, hiking, and exploring different cultures.",
		"hobbies": "basketball, vollyball, swimming",
		
	}
]

const seedUsers = () => User.bulkCreate(userData, {
	ignoreDuplicates: true,
	returning: true,
	individualHooks: true
})
module.exports = seedUsers