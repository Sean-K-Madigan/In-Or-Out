
// FLOW(acceptance criteria)
//todo event listener for hide
// todo i'm out. hide & if(req.session.id is in event.participants then filter out.)
//// add Jorge's date_format function-to helper, and use in handlebars


//! When I get to the landing page...
//! I am presented with the options to login or sign up with an image/animation in the background.
// // todo design
	// //background image/animation
	// //buttons


	//! When I click login
	//! A modal login form appears
	// // create modal
	// // create login form
	// // todo design
	// // modal functions
		////open
		////close(by button & off modal click)
		// //submit->
	// // login function
		////check if user exists
		// //check if password is correct
		// //set session to logged_in: true
		// //redirect to homepage


	//! When I click sign up(in login modal)
	//! A modal for signing up appears
	//// create modal
	//// create sign up form
		// //username
		// //email
		// //password
		// //password confirmation
		// //bio-optional
	// // todo design
	// // modal functions
		////open & render
		// //close(by button & off modal click)
		// //submit->
	// // sign up function
		// //check if user exists(define unique in model)
		// //check password confirmation
		// //post new user to database
		// //set session to logged_in: true
		// //redirect to homepage

	
//! When I am logged in
//! My homepage appears with event cards, a menu button and a search bar. 
//// If there are no events to display-> "No events to view yet. Create your own(as a link to newEventPage)or find friends(?)” *404 no friends / events found 
// // create homepage
// // 'loggedIn' function to test true.
// // create event cards
// // create menu
// // create search bar
// // design homepage
// // make partial for event cards & modals

// // todo design menu
// // todo design search bar
// todo search results handlebars
// // register partials
// todo add friends functions
// // search bar functions
	// //search by event name
	// //search by description keywords?
	// //search by category
	// //search by username
	// //search for username
	// *search by date
	// // order by date
// // associations to user to events(by creator and participants)
// // asscociations to user to friends



	//! When I view the event cards, 
	//! Each card contains the title, date, creator, participants, category, and description of the event with the 'I'm in!' button. (cancel/I'm out/hide button?-Ideas for this below.) ordered by date.
	// // todo design event cards
	// todo sequelize function to get events made by friends, with above details, ordered by date
		// ?router.get('/', (req, res) => res.render('homepage',{layout: 'main', events: Event.findAll({where:{
		// 	?creator_id: friends.map(friend => friend.id)}})}))//something like this. just a start.
		// *make an array of friends, loop through friends, putting the events they've created into an array to then have the handlebars loop over to render events
		// ? include: [creator, participants, category, etc] through associations.
		// ? order:[['date', 'ASC']]
	// // [include] events to users to show data on cards
	// // fiunctions for buttons
		// //'Im in!
			//// add loggedin user to event by updating participent column in event table
			//// re-rendering to show updated particpents
			//// change buttons by status...not sure how we want to design this part yet.
				//// {{#if user.participents.includes(loggedinUser)}}{{else}}{{/if}}
		//// I"m out!/hide...
			// more to come when we get there.
		// ?Perhaps???
			// ?maybe? button to show interest, but not commit yet.
		

//!When I click the menu button
//!A menu slides out with links to 
	////Profile
	////Create Event, 
	// //Home(or just put as a link or back arrow in header)
	// //and Logout.
// // create menu
// // animate menu(button and slide out)


	//! When I click My Profile(from menu)
	//! I am taken to my profile page where I can see my username, bio, events, and friends(events and friends displayed seperately by bookmark tabs)
	// // create profile page
	// todo design profile page
	// // profile route

	// // routes for bookmark tabs
	//! accordians tabs:

	// event handleers
	// 	//	Events I'm In(upcoming events), /participating
	// 	// My Events(created by me),  /myEvents
	// 	// Friends  /friends


		//! When I click Events I’m In(in profile page as bookmark tab)
		//! My profile page is populated with event cards I’ve joined in on with the option to leave event(”I’m out”).
		// // sequelize function to get user info, events created by user, and friends of user
			// //router.get('/particpating', (req, res) => res.render('profile',{layout: 'main', events: Event.findAll({where:{participents: req.session.user_id.........}}) order:[['date', 'ASC']})
			// // update event card design for this status(buttons, etc.)
			// // functions for button to leave event
				// remove loggedin user from event by updating participent column in event table
				// remove event from page(rerender)
			
		//! When I click My Events(bookmark tab)
		//! My profile page is populated with event cards I’ve created with options to edit or delete.
		// //router.get('/created', (req, res) => res.render('profile',{layout: 'main', events: Event.findAll({where:{created_by: req.session.user_id.........}}) order:[['date', 'ASC']})
			// // todo update event card design for this status(buttons, edit, delete, etc.)
		//! When I choose to edit
		// !I am sent to the updateEvent modal
		// todo render updateEvent modal()
			// * (same handlebars as createEvent with values returned in inputs this time.)
			//? router.get('/edit/:id', (req, res) => res.render('updateEvent',{layout: 'main', event: Event.findOne({where:{id: req.params.id.............}})})
			//? router.put('/edit/:id', async (req, res) => {
				//? Event.update({title, date, description, category},{where:{id: req.params.id}})...........
			// todo handle submit-put request
				//* close modal on submit
			//? router.put('/edit/:id', (req, res) => {..
		////When I choose to delete
		// //the event is removed from my, and all participants’ lists.
			// //'CASCADE' on delete in sequelize model
			// // delete function
			// //router.delete('/delete/:id', async (req, res) => {...........


		// !When I click Friends
		// !My profile page is populated with friend cards/list/other kind of display?
			// //router.get('/friends', (req, res) => res.render('profile',{layout: 'main', friends: User.findAll({where:{id: [friends array]
			// todo friend handlebars for homepage and profile page
			// {{#each friends as |friend|}} - display cards.	
			// // associations
					// //router.get('/profile', (req, res) => res.render('profile',{layout: 'main', user......


	//! When I click on Create Event(from menu)
	//! Then a createEvent modal with a form comes out. (menu slide back in?)
	// // create modal
	// // create form	
		// Title, date, description, categories (IB* flexible date/time, tags)
	// // design
	// // modal functions
		// //open & render 
		// //close(by button & off modal click & submit)
		// //submit->...
	// // create event functions
		// //post new event to database
			//// router.post('/create', async (req, res) => {
				// // Event.create({title, date, description, category, creator_id})
				// // const {title, date, description, category} = req.body
				// // const creator_id = req.session.user_id
				// // const particpents = [creator_id]
		// //re-render homepage/profile page to show new event
		
		
// //When I click Home
//// I am taken back to my homepage  where friends’ events are listed again.
// // event listener to redirect & render homepage


////When I click Logout
////I am redirected to the homepage (login/signup) page. 
// // backend function to end session
	////My session ends- status is updated to logged_in: false(?)
	////router.get('/logout', (req, res) => {req.session.destroy(); res.redirect('/')})...
 


// ! Random helper functions

// ? Jorge
// todo date formatting function 
	//* MM/DD/YYYY HH:MM AM/PM


	// todo range(participents)
	//*sliding selector...
	

// QUESTIONS, IDEAS, ICEBOX:

// *Card displays depending on participation status.
// Base(when you first see the event)
// 2 buttons say 'in?' or 'out?'
// If you’ve joined that event
// ‘In’ button turns green and says ‘I'm in!’ & ‘out’ button changes to ‘cancel/bail’
// If you’ve selected ‘out’
// card doesn't appear on homepage.
// –you don’t have to select either button,  you can just scroll to next card if ya want. 
// ?a maybe button, to get feelers?
// IB* display events as sliders


// IB*Hobbies/Activities(to network, find friends of friends, etc.)
// A hobby/activity list to choose from will provide an easy array that’s for display and linking,(could provide the list for createEvent too, linking users and events on another level, won’t have to make a activity table to do this.)
// A hobby/activity input will be good for user customization and flexibility on how we use the data.
// Both are good for different reasons. What do we want to use the info for?


// *Upcoming events
// <aside> with title and date- clickable to go to that event's details (or make an accordion) and option to leave event(I’m out).
// Or in menu as an option to see all-and then it will display like homepage, but only with the events you're signed up for. 


// *IBSelect type of event for creating event.
// #if sports and activities 
// then you can choose from a drop down of categories, and a basic form follows.
// #if gatherings or functions 
// then a form for more details and describing follows(options to create subevents-super IB)
// ?#if third option (other, dinning, ?)


// IB*Past Events?

// IB*Commenting

// IB* notifications on event updates(edits/cancels/comments)

// IB*Side panel with friends list and/or with upcoming events(just title and date, then displays card when clicked on)- on homepage. Calender Page-able to link to yours. 

// IB*Option to close event to any more participants joining.(like if you made a reservation, or the event is tomorrow morning or something)

// IB*Limit the amount of people by creating validate in column?

// IB*Package or a way to pick user avatars? Kenall or Jorge?

// IB*Create sub events within big gathering events.

// IB*when creating description, chatGPT summarize/edit/update/suggestions.


// IB*Google maps  api?

// IB*Forgot password option to reset via security question and email

