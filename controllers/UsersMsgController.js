import UserMsg from '../models/UserMsg.js';
import { SUCCESS } from '../utils/httpStatusText.js'
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../utils/appError.js';

export const sendMsg = asyncWrapper(
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newMsg = new UserMsg(req.body);
        await newMsg.save();
        res.status(201).json({ status: SUCCESS, data: newMsg });
})

export const getAllMsg = asyncWrapper(
    async (req, res) => {
        const allMessages = await UserMsg.find();
        res.status(200).json({ status: SUCCESS , data: allMessages });
})