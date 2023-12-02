import { SUCCESS, FAIL } from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import jwt from "jsonwebtoken";


export const login = asyncWrapper(
    async (req, res) => {
        const ownerEmail = process.env.OWNER_EMAIL;
        const ownerPassword = process.env.OWNER_PASSWORD;
        const { email, password } = req.body;
        if (email === ownerEmail && password === ownerPassword) {
            const ownerPayload = {
                userId: 'owner_user_id',
                role: 'owner',
            };
            const ownerToken = jwt.sign(ownerPayload, process.env.JWT_SECRET_KEY);
            res.status(200).json({status:SUCCESS, token: ownerToken });
        } else {
            res.status(401).json({status:FAIL , message: 'Invalid credentials' });
        }
    }
)