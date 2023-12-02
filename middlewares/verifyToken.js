import jwt  from "jsonwebtoken";
import { ERROR,FAIL } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        const error = appError.create("token is required", 401, FAIL)
        return next(error)
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        const error = appError.create("invailed token", 401, ERROR)
        return next(error);
    }
}

export default verifyToken;  