import express from 'express';
const router = express.Router()
import {
    getAllusers,
    register,
    login,
    getAllServices} from '../controllers/users.controllers.js';

import verifyToken from '../middlewares/verifyToken.js';
import authorizeOwner from "../middlewares/authorizeOwner .js"

router.route("/")
.get(authorizeOwner,getAllusers)

router.route("/register")
.post(register)

router.route("/login")
.post(login)

router.route("/services")
.get(verifyToken,getAllServices)

export default router;