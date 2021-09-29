const express=require('express');

const app=express();
const dbConfig=require('./db');
const treaksRoute=require('./routes/treaksRoute');
const userRoute=require('./routes/userRoute');
const bookingsRoute=require('./routes/bookingsRoute');

app.use(express.json())
app.use('/api/treaks',treaksRoute);
app.use('/api/users' , userRoute);
app.use('/api/bookings' , bookingsRoute);
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV==='production'){
    app.use(express.static('./client/build'))
}
app.listen(port, () => console.log(`Node JS Server Started`));

