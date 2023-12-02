import express from 'express';
const router = express.Router()
import {login} from "../controllers/owner.controller.js"

router.route("/login")
.post(login)


export default router;