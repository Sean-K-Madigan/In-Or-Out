const { Event } = require('../models')
const seedUsers = require('./userData')

const eventData = [
	{
		"title": "Football Match",
		"date": "2024-11-15",
		"category": "Football",
		"description": "Join us for an exciting football match!",
		"creator_id": 1
	},
	{
		"title": "Hiking Trip",
		"date": "2024-8-05",
		"category": "Hiking",
		"description": "Explore the beautiful trails on this hiking trip.",
		"creator_id": 2
	},
	{
		"title": "Basketball Tournament",
		"date": "2024-6-15",
		"category": "Basketball",
		"description": "Compete in our annual basketball tournament.",
		"creator_id": 3
	},
	{
		"title": "Yoga Class",
		"date": "2024-7-10",
		"category": "Yoga",
		"description": "Relax and rejuvenate with our yoga class.",
		"creator_id": 4
	},
	{
		"title": "Running Club",
		"date": "2024-6-29",
		"category": "Running",
		"description": "Join our running club for a group workout.",
		"creator_id": 5
	},
	{
		"title": "Pub Crawl",
		"date": "2024-10-31",
		"category": "Bar Hopping",
		"description": "Onesie pub crawl!",
		"creator_id": 6
	},
	{
		"title": "Disc League",
		"date": "2024-9-29",
		"category": "Disc Golf",
		"description": "Friday night glow league",
		"creator_id": 7
	}
]

const seedEvents = () => Event.bulkCreate(eventData,{
			ignoreDuplicates: true,
			returning: true
})


//* for getting random participents 
// const seedEvents = async () => {
// 	eventData.forEach(async event => {
// 		await Event.bulkCreate({
// 			...event,
// 			particpant_id: [
// 				seedUsers[Math.floor(Math.random() * seedUsers.length)].id,
// 				event.creator_id
// 			]
// 		})

// 	})
// }


module.exports = seedEvents