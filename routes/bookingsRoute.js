const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const stripe = require('stripe')('sk_test_51JeP7xSDwsuVEvAc1PpKqOkI3OeHIV5Hgum6hk9cucVlUMDHwl4dQg1L0XrAyiT7v1ponTuxpr6f0q8Rejz0TvW6008HLFSqnM');
const { v4: uuidv4 } = require("uuid");

const Booking = require("../models/booking");
const Treak = require("../models/treak");
router.post("/booktreak", async (req, res) => {
    const {
        treak,
        userid,
        totalamount,
        token
    } = req.body;


    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'INR',
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        )

        if(payment){
            const newbooking = new Booking({
                userid: userid,
                treak: treak.name,
                treakid: treak._id,
                totalAmount: totalamount,
                transactionId: "1234",
                status: 'booked'
            });
    
            const booking = await newbooking.save()
            res.send('Room bookedd Successfully')
        }    

    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" + error });
    }



});

router.post("/getbookingsbyuserid", async(req, res) => {
    const userid  = req.body.userid;
    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

router.post("/cancelbooking", async (req, res) => {
    const { bookingid } = req.body;


    try {

        const bookingitem = await Booking.findOne({ _id: bookingid })
        bookingitem.status = 'cancelled'
        await bookingitem.save();
        res.send('Booking deleted successfully')
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "something went wrong" });
    }
});

// router.post("/getuserbookings", async (req, res) => {
//     const { userid } = req.body;
//     try {
//         const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
//         res.send(bookings);
//     } catch (error) {
//         return res.status(400).json({ message: "Something went wrong" });
//     }
// });

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;