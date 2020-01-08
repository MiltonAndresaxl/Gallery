const express = require('express')
const path = require('path')
const multer = require('multer')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const {format}= require('timeago.js')
const methodoverride = require('method-override')


// initialize
const app = express()
require('./database')

//setting
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views') )
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(methodoverride('_method'))
const storage = multer.diskStorage({
    destination:path.join(__dirname, '/public/img/uploads'),
    filename:(req, file, cb, filename) =>{
        cb(null, uuid() + path.extname(file.originalname))
    }
})
app.use(multer({storage:storage}).single('image'))
app.use(express.json())
//Global variables
app.use((req, res, next)=>{
    app.locals.format = format
    next()
})
//Routes
app.use(require('./routes/index'))
//static file
app.use(express.static(path.join(__dirname, 'public')))
// Start sever
app.listen(app.get('port'), ()=>{
    console.log(`server is on at port:${app.get('port')}`)
})