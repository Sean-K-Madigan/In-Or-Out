const express = require('express')
const exphbs = require('express-handlebars');
const session = require('express-session')
const path = require('path')
const sequelize = require('./config/connection')
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const colors = require('colors')
const routes = require('./controllers')
const reqLog = require('./utils/helpers')
// const { User, Event } = require('./models')

// sync & authenticates the database
async function connectToDB(){
	try {
		await sequelize.authenticate()
		console.log(`Connected to the database!`.blue)

		await sequelize.sync({ alter: false })
		console.log(`Database & tables synced!`.green)
	} catch (err) {
		console.log(`Trouble connecting to database: ${err}`.red)
	}
}
connectToDB()

const app = express()
const PORT = process.env.PORT || 3000

// sets up session model
const sess = {
	secret:"Sshhhhh, it's a secret!",
	cookie:{
		maxAge: 24*60*60*1000,
		httpOnly: true,
		secure: false,
		sameSite: "strict"
	},
	resave: false,
	saveUninitialized: true,
	store: new sequelizeStore({
		db: sequelize
	})
}

app.use(session(sess))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 



app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')))
app.use(reqLog)
app.use(routes)

app.listen(PORT, () => console.log(`http://localhost:${PORT} will be your server today. Enjoy!`.yellow))