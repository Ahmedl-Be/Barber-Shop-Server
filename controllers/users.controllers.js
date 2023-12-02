import User from "../models/user.model.js";
import Service from "../models/service.model.js";

import { SUCCESS, FAIL, ERROR } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import bcrypt from "bcryptjs";
import generateJwt from "../utils/generateJwt.js";


export const getAllServices = asyncWrapper(
    async (req, res, next) => {
            const allServices = await Service.find({});
            res.json({ status: 'success', data: allServices });
    }
)

export const getAllusers = asyncWrapper(
    async (req, res) => {
        const query = req.query
        const limit = query.limit || 10;
        let page = query.page || 1;
        const skip = (page - 1) * limit;
        const users = await User.find({}, { "__v": 0, "password": 0, "_id": 0 })
            .limit(limit).skip(skip)
        res.json({ status: SUCCESS, data: { users } })
    })


export const register = asyncWrapper(
    async (req, res, next) => {
        const { firstName, lastName, email, password } = req.body;
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            const error = appError.create("User Already Exists", 404, FAIL)
            return next(error);
        }
        if (!firstName || !lastName || !email || !password) {
            const error = appError.create("Invailed Input", 404, ERROR)
            return next(error);
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        // GENERATE JWT
        const token = await generateJwt({
            email: newUser.email,
            id: newUser._id,
        });
        newUser.token = token;
        await newUser.save()
        res.status(201).json({ status: SUCCESS, data: { user: newUser } })
    }
)

export const login = asyncWrapper(
    async (req, res, next) => {
        const { email, password } = req.body
        if (!email && !password) {
            const error = appError.create("invailed data", 404, FAIL)
            return next(error);
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = appError.create("User Not Found !!", 400, ERROR)
            return next(error);
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if (user && matchedPassword) {
            const token = await generateJwt({
                email: user.email,
                id: user._id,
            });
            return res.json({ status: SUCCESS, data: { token, email } })
        } else {
            const error = appError.create("Something went wrong !!", 500, ERROR)
            return next(error);
        }

    }
)
