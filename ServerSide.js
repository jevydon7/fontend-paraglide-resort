require('dotenv/config')
const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const eventsRoute = require("./routes/events-routes")
const userRoute = require("./routes/user-routes")
const auth = require("./routes/auth")
const bookingRoute = require("./routes/booking-routes")

mongoose.connect(process.env.MONGODB_URL).then((x) => {
    console.log(`connected to database "${x.connections[0].name}"`)
    }).catch((err) => {
    console.error('error connecting db', err)    
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(['*']));

app.use("/events",eventsRoute)
app.use("/user",userRoute)
app.use('/auth', auth)
app.use("/bookService",bookingRoute)

const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`listening to port ${port}...`));