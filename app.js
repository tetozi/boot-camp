const express = require('express');
const app = express();
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const AppError = require('./error/appError')
const courserRouter= require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes')
const globalError = require('./controllers/errorController')

//AXIOS

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//handlebars  
app.engine('.hbs', exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/', viewRouter)

app.use('/api/v1/course', courserRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
 
  next(new AppError('Page not found '), 404)
})

app.use(globalError)

module.exports = app;


