const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

//Database connection
const { mongoURI } = require("./app/config/key");

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
mongoose.connection.once('open', () => {
    console.log('Connected with database...');
}).on('error', (error) => {
    console.log('Error while connecting with database : ', error);
});

//Assets
app.use(express.static('public'))

// Set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})