const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const app = express(); 
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')


const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'PRODUCTION') 
    require('dotenv').config({ path: 'backend/config/config.env' })


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


const animals = require('./routes/animalsRoute');
const injurydiseases = require('./routes/injurydiseasesRoute');
const user = require('./routes/userRoute');
const adopters = require('./routes/adoptersRoute');
const personnels = require('./routes/personnelsRoute');



app.use('/api/v1', animals);
app.use('/api/v1', injurydiseases);
app.use('/api/v1', user);
app.use('/api/v1', personnels);
app.use('/api/v1', adopters);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}



app.use(errorMiddleware);


module.exports = app