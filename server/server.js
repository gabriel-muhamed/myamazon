const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')
const { handleError, toApiError } = require('./middleware/apiError');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport')
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

// body parse
app.use(express.json())


// sanitize
app.use(xss())
app.use(mongoSanitize())

// routes
app.use('/api', routes)

// passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy)

// handle errors

app.use(toApiError)
app.use((err, req, res, next)=>{
    handleError(err, res)
})

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})