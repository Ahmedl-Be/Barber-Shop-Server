import mongoose  from "mongoose";

const itemSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const reservationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    bookedBy: {
        type: String,
        required: true
    },
    phoneNumber: { 
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0;
            },
            message: 'At least one item is required'
        }
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;