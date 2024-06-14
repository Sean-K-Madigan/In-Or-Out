# Flow

### Landing Page
- [ ] Design background image/animation.
- [X] Create login and sign up buttons.

### Login Modal
- [X] Create modal for login.
- [X] Create login form.
- [ ] Design modal and form.
- [X] Implement modal functions:
  - [X] Open modal & render
  - [X] Close modal (button & off modal click).
  - [X] Submit form.
- [X] Implement login function:
  - [X] Check if user exists.
  - [X] Validate password.
  - [X] Set session to `logged_in: true`.
  - [X] Redirect to homepage.

### Sign Up Modal
- [X] Create modal for sign up.
- [X] Create sign up form:
  - [X] Username.
  - [X] Email.
  - [X] Password.
  - [X] Password confirmation.
  - [X] Bio (optional).
- [ ] Design modal and form.
- [X] Implement modal functions:
  - [X] Open and render modal.
  - [X] Close modal (button & off modal click).
  - [X] Submit form.
- [X] Implement sign-up function:
  - [X] Check if user exists (ensure unique constraint in model).
  - [X] Validate password confirmation.
  - [X] Post new user to the database.
  - [X] Set session to `logged_in: true`.
  - [X] Redirect to homepage.

### Homepage (Logged In)
- [X] Create event cards.
- [ ] Create menu.
- [ ] Create search bar.
- [ ] Design homepage, menu, and search bar.

### Event Cards
- [ ] Design event cards.
- [X] Implement Sequelize function to get events created by friends, ordered by date.
- [ ] Implement buttons' functions:
  - [X] "I'm in!" to update participants and re-render.
  - [ ] "I'm out!" or hide functionality.
  - [ ] Option to show interest without committing.

### Menu Buttons
- [ ] Create menu.
- [ ] Animate menu (button and slide out).
- [X] Add event listeners for menu links.

### Profile Page(menu link)
- [ ] Create profile page.
- [ ] Design profile page.
- [ ] Implement event listeners for bookmark tabs.
- **Bookmark Tabs**:
  - [ ] Events I'm In.
  - [ ] My Events.
  - [ ] Friends.

### Events I'm In
- [ ] Design event card update for this status.
- [O] Implement Sequelize function to get user's participating events.
- [ ] Create leave event listener function:
  - [ ] Remove user from event.
  - [ ] Re-render page.

### My Events
- [ ] Update event card design for this status.
- [ ] Implement edit event functionality:
  - [ ] Render updateEvent modal.
  - [ ] Handle submit (PUT request).
- [X] Implement delete event functionality:
  - [X] Remove event from database and re-render.

### Friends
- [ ] Design friend display (PROFILE).
- [ ] Render friends page.

### Create Event Modal
- [X] Create modal for event creation.
- [X] Create form (Title, date, description, categories).
- [ ] Design modal and form.
- [X] Implement modal functions:
  - [X] Open and render modal.
  - [X] Close modal (button, off modal click, submit).
  - [X] Submit form->
- [X] Post new event to database.
- [X] Re-render homepage/profile page with new event.

### Home Button
- [X] Event listener to redirect and render homepage.

### Logout
- [X] Implement backend function to end session.
- [X] Update session status to `logged_in: false`.
- [X] Redirect to homepage.

### Search Functionality
- [X] Implement search by event name.
- [X] Implement search by event type.
- [X] Implement search by username.
- [X] Implement search by hobbies.
- [X] Implement search events by username.
- [ ] Implement search by date.



# Project Structure

## Routes
- ~~**Authentication**~~
  - ~~POST `/login`~~
  - ~~POST `/signup`~~
  - ~~GET `/logout`~~
- ~~**Homepage**~~
  - ~~GET `/`~~
- **Profile**
  - GET `/profile`
- **Events**
  - ~~POST `/events`~~
  - PUT `/events/:id`
  - ~~DELETE `/events/:id`~~
  - ~~POST `/events/:id/join`~~
  - POST `/events/:id/leave`
- **Search**
  - ~~GET `/search`~~

## Modals & Pages
- ~~Login Modal~~
- ~~Sign Up Modal~~
- ~~Create Event Modal~~
- Update Event Modal
- Profile Page
- ~~Homepage~~

## Handlebars Views
- ~~`main.handlebars`~~
- ~~`homepage.handlebars`~~
- `profile.handlebars`

## Forms
- ~~Login Form~~
- ~~Sign Up Form~~
- ~~Create Event Form~~
- Update Event Form

~~## Tables~~
- ~~**Users Table**~~
  - ~~id~~
  - ~~username~~
  - ~~email~~
  - ~~password~~
  - ~~bio~~
- ~~**Events Table**~~
  - ~~id~~
  - ~~title~~
  - ~~date~~
  - ~~description~~
  - ~~category~~
  - ~~creator_id~~
- ~~**Participants Table**~~
  - ~~id~~
  - ~~user_id~~
  - ~~event_id~~

## Helper Functions
- ~~**Modal Functions**~~
  - ~~Open Modal~~
  - ~~Close Modal~~
  - ~~Submit Form~~
- **Event Functions**
  - ~~Join Event~~
  - Leave Event
  - Edit Event
  - ~~Delete Event~~
- ~~**User Functions**~~
  - ~~Login~~
  - ~~Sign Up~~
  - ~~Logout~~
- **Profile Functions**
  - Show Events Tab
  - Show My Events Tab
  - Show Friends Tab
