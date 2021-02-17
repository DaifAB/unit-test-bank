require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())

const ownersRouter = require('./routes/owners')
app.use('/owners', ownersRouter)
const agenciesRouter = require('./routes/agancies')
app.use('/agencies', agenciesRouter)
const accountsRouter=require('./routes/accounts');
app.use('/accounts',accountsRouter);
const creditCardRouter=require('./routes/creditCards');
app.use('/creditCards',creditCardRouter);
const gabRouter=require('./routes/gab');
app.use('/gab',gabRouter);
const moneyProviderRouter=require('./routes/moneyProvider');
app.use('/money',moneyProviderRouter);
const uploadRouter=require('./routes/upload');
app.use('/upload',uploadRouter);


app.listen(3000, () => console.log('Server Started'))


module.exports = app