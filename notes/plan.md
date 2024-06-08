# Flow

### Landing Page
- [ ] Design background image/animation.
- [ ] Create login and sign up buttons.

### Login Modal
- [ ] Create modal for login.
- [ ] Create login form.
- [ ] Design modal and form.
- [ ] Implement modal functions:
  - [ ] Open modal & render
  - [ ] Close modal (button & off modal click).
  - [ ] Submit form.
- [ ] Implement login function:
  - [ ] Check if user exists.
  - [ ] Validate password.
  - [ ] Set session to `logged_in: true`.
  - [ ] Redirect to homepage.

### Sign Up Modal
- [ ] Create modal for sign up.
- [ ] Create sign up form:
  - [ ] Username.
  - [ ] Email.
  - [ ] Password.
  - [ ] Password confirmation.
  - [ ] Bio (optional).
- [ ] Design modal and form.
- [ ] Implement modal functions:
  - [ ] Open and render modal.
  - [ ] Close modal (button & off modal click).
  - [ ] Submit form.
- [ ] Implement sign-up function:
  - [ ] Check if user exists (ensure unique constraint in model).
  - [ ] Validate password confirmation.
  - [ ] Post new user to the database.
  - [ ] Set session to `logged_in: true`.
  - [ ] Redirect to homepage.

### Homepage (Logged In)
- [ ] Create event cards.
- [ ] Create menu.
- [ ] Create search bar.
- [ ] Design homepage, menu, and search bar.

### Event Cards
- [ ] Design event cards.
- [ ] Implement Sequelize function to get events created by friends, ordered by date.
- [ ] Implement buttons' functions:
  - [ ] "I'm in!" to update participants and re-render.
  - [ ] "I'm out!" or hide functionality.
  - [ ] Option to show interest without committing.

### Menu Buttons
- [ ] Create menu.
- [ ] Animate menu (button and slide out).
- [ ] Add event listeners for menu links.

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
- [ ] Implement Sequelize function to get user's participating events.
- [ ] Create leave event listener function:
  - [ ] Remove user from event.
  - [ ] Re-render page.

### My Events
- [ ] Update event card design for this status.
- [ ] Implement edit event functionality:
  - [ ] Render updateEvent modal.
  - [ ] Handle submit (PUT request).
- [ ] Implement delete event functionality:
  - [ ] Remove event from database and re-render.

### Friends
- [ ] Design friend display (avatar, name, etc.).
- [ ] Render friends page.

### Create Event Modal
- [ ] Create modal for event creation.
- [ ] Create form (Title, date, description, categories).
- [ ] Design modal and form.
- [ ] Implement modal functions:
  - [ ] Open and render modal.
  - [ ] Close modal (button, off modal click, submit).
  - [ ] Submit form->
- [ ] Post new event to database.
- [ ] Re-render homepage/profile page with new event.

### Home Button
- [ ] Event listener to redirect and render homepage.

### Logout
- [ ] Implement backend function to end session.
- [ ] Update session status to `logged_in: false`.
- [ ] Redirect to homepage.

### Search Functionality
- [ ] Implement search by event name.
- [ ] Implement search by event type.
- [ ] Implement search by username.
- [ ] Implement search by date.



# Project Structure

## Routes
- **Authentication**
  - POST `/login`
  - POST `/signup`
  - GET `/logout`
- **Homepage**
  - GET `/`
- **Profile**
  - GET `/profile`
- **Events**
  - POST `/events`
  - PUT `/events/:id`
  - DELETE `/events/:id`
  - POST `/events/:id/join`
  - POST `/events/:id/leave`
- **Search**
  - GET `/search`

## Modals & Pages
- Login Modal
- Sign Up Modal
- Create Event Modal
- Update Event Modal
- Profile Page
- Landing Page
- Homepage

## Handlebars Views
- `main.handlebars`
- `landing.handlebars`
- `homepage.handlebars`
- `profile.handlebars`

## Forms
- Login Form
- Sign Up Form
- Create Event Form
- Update Event Form

## Tables
- **Users Table**
  - id
  - username
  - email
  - password
  - bio
- **Events Table**
  - id
  - title
  - date
  - description
  - category
  - creator_id
- **Participants Table**
  - id
  - user_id
  - event_id

## Helper Functions
- **Modal Functions**
  - Open Modal
  - Close Modal
  - Submit Form
- **Event Functions**
  - Join Event
  - Leave Event
  - Edit Event
  - Delete Event
- **User Functions**
  - Login
  - Sign Up
  - Logout
- **Profile Functions**
  - Show Events Tab
  - Show My Events Tab
  - Show Friends Tab
