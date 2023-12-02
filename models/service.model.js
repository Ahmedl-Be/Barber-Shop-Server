import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['HAIRCUTS', 'BEARDS_SHAVES', 'EXTRAS'],
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    title: String,
});

export default mongoose.model('Service', serviceSchema);
