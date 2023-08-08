const app = require('./app');
const connectDatabase = require('./config/database');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
// const cors=require("cors");
const path = require('path')
const dotenv = require('dotenv');

dotenv.config({path: 'backend/config/config.env'})

if (process.env.NODE_ENV !== 'PRODUCTION')
	require('dotenv').config({ path: 'backend/config/config.env' })

//call database
connectDatabase(); 


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, () => {
    console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});