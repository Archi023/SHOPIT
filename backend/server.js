const app =require('./app')
const connectDatabase = require('./config/database')


//Handle Uncaught exceptions
process.on('uncaughtException', err =>{
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

//setting up config file
const dotenv =require('dotenv').config({ path: 'backend/config/config.env' })

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,() =>{
    console.log(`server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle Unhandle Promise rejections
process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandle Promise rejection');
    server.close(() =>{
        process.exit(1)
    })
})