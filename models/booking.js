const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    treak: { type: String, required: true },
    treakid: { type: String, required: true },
    userid: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true, default: 'booked' },
}, {
    timestamps: true,
})

const bookingModel = mongoose.model('bookings', bookingSchema)
module.exports = bookingModel