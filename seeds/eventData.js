const { Event } = require('../models')
const seedUsers = require('./userData')

const eventData = [
	{
		"title": "Football Match",
		"date": "2024-11-15",
		"time": "18:00",
		"category": "Football",
		"description": "Join us for an exciting football match!",
		"participantLimit": 15,
		"created_by": "alicewonderland",
		"creator_id": 3
	},
	{
		"title": "Hiking Trip",
		"date": "2024-8-05",
		"time": "08:00",
		"category": "Hiking",
		"description": "Explore the beautiful trails on this hiking trip.",
		"participantLimit": null,
		"created_by": "bobbuilder",
		"creator_id": 1
	},
	{
		"title": "Basketball Tournament",
		"date": "2024-6-15",
		"time": "2:00",
		"category": "Basketball",
		"description": "Compete in our annual basketball tournament.",
		"participantLimit": 14,
		"created_by": "charliechocolate",
		"creator_id": 2
	},
	{
		"title": "Yoga Class",
		"date": "2024-7-10",
		"time": "6:00",
		"category": "Yoga",
		"description": "Relax and rejuvenate with our yoga class.",
		"participantLimit": 7,
		"created_by": "kermitfrog",
		"creator_id": 4
	},
	{
		"title": "Running Club",
		"date": "2024-6-29",
		"time": "19:00",
		"category": "Running",
		"description": "Join our running club for a group workout.",
		"participantLimit": null,
		"created_by": "alicewonderland",
		"creator_id": 3
	},
	{
		"title": "Pub Crawl",
		"date": "2024-10-31",
		"time": "22:00",
		"category": "Bar Hopping",
		"description": "Onesie pub crawl!",
		"participantLimit": null,
		"created_by": "frankmill",
		"creator_id": 6
	},
	{
		"title": "Disc League",
		"date": "2024-9-29",
		"time": "12:00",
		"category": "Disc Golf",
		"description": "Friday night glow league",
		"participantLimit": 30,
		"created_by": "graceface",
		"creator_id": 7
	}
]

const seedEvents = () => Event.bulkCreate(eventData,{
			ignoreDuplicates: true,
			returning: true
})

module.exports = seedEvents