const express = require('express')
const exphbs = require('express-handlebars');
const path = require('path')
const sequelize = require('./config/connection')
const colors = require('colors')
const { User, Event } = require('./models')

async function connectToDB(){
	try {
		await sequelize.authenticate()
		console.log(`Connected to the database!`.blue)

		await sequelize.sync({ alter: true })
		console.log(`Database & tables synced!`.green)
	} catch (err) {
		console.log(`Trouble connecting to database: ${err}`.red)
	}
}
connectToDB()

const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json())
// using the qs library for parsing html forms
app.use(express.urlencoded({ extended: true })) 

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', require('./controllers/api/userRoutes'))



app.get('/', (req, res) => res.render('homepage',{layout: 'main'}))

app.listen(PORT, () => console.log(`http://localhost:${PORT} will be your server today. Enjoy!`.yellow))