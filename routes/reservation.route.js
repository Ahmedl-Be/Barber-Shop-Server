import express from 'express';
const router = express.Router()
import { 
    availableHours,
    bookReservation,
    getAllReservations,
    cancelReservation } from '../controllers/reservation.controllers.js';

import authorizeOwner from '../middlewares/authorizeOwner .js'

router.route('/booked-reservations')
.get(authorizeOwner,getAllReservations)

router.route('/available-hours/:date')
.get(availableHours)

router.route('/book')
.post(bookReservation)

router.route('/cancel')
.delete(authorizeOwner,cancelReservation)

export default router;
