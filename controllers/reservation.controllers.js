import { SUCCESS, FAIL } from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Reservation from "../models/reservation.model.js";

export const availableHours = asyncWrapper(
    async (req, res) => {
        const date = new Date(req.params.date);
        const reservations = await Reservation.find({ date });
        const bookedHours = reservations.map(reservation => reservation.hour);
        const allHours = Array.from({ length: 15 }, (_, i) => i + 9)
        const availableHours = allHours.filter(hour => !bookedHours.includes(hour));
        res.json({ status: SUCCESS, data: { date, availableHours } });
    }
)

export const bookReservation = asyncWrapper(
    async (req, res) => {
        const { date, hour, bookedBy, phoneNumber, items } = req.body;
        const existingReservation = await Reservation.findOne({ date, hour });
        const currentDate = new Date();
        const bookingDate = new Date(date);
        const thresholdDate = new Date();
        thresholdDate.setDate(currentDate.getDate() - 1);

        if (bookingDate < thresholdDate) {
            return res.status(400).json({
                status: FAIL,
                message: 'Cannot book a reservation in this day',
            });
        }
        if (existingReservation) {
            return res.status(400).json({
                status: FAIL, 
                message: 'this hour already booked'
            });
        }
        if (!hour) {
            return res.status(400).json({
                status: FAIL, message: 'Please Select an Hour'
            });
        }
        if (!bookedBy) {
            return res.status(400).json({
                status: FAIL, message: 'Please Enter Your Name'
            });
        }
        if (!phoneNumber) {
            return res.status(400).json({
                status: FAIL, message: 'Please Enter Your Phone Number'
            });
        }
        if (items.length < 1) {
            return res.status(400).json({
                status: FAIL, message: 'Please Select a package'
            });
        }
        const newReservation = new Reservation({
            date,
            hour,
            bookedBy,
            phoneNumber,
            items
        });
        await newReservation.save();
        const reservationsForDate = await Reservation.find({ date });
        const bookedHours = reservationsForDate.map(reservation => reservation.hour);
        const allHours = Array.from({ length: 15 }, (_, i) => i + 9);
        const availableHours = allHours.filter(hour => !bookedHours.includes(hour));
        res.status(201).json({ status: SUCCESS, data: { newReservation } });
    }
)

export const getAllReservations = asyncWrapper(
    async (req, res) => {
        const bookedReservations = await Reservation.find();
        res.json({ status: SUCCESS, data: bookedReservations });
    }
)

export const cancelReservation = asyncWrapper(
    async (req, res) => {
        const { date, hour } = req.body;
        const deletedReservation = await Reservation.findOneAndDelete({date, hour});
        if (deletedReservation) {
            res.json({ status: SUCCESS, message: 'Reservation canceled' });
        } else {
            res.status(404).json({
                status: FAIL,
                message: 'Reservation not found'
            });
        }
    }
)
