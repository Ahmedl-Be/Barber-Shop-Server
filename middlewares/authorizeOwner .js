import jwt  from "jsonwebtoken";
import { ERROR,FAIL } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

const authorizeOwner = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        const error = appError.create('Token is required', 401, FAIL);
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'owner') {
            const error = appError.create('Unauthorized: Not an owner', 403, ERROR);
            return next(error);
        }

        req.owner = decoded; 
        next();
    } catch (err) {
        const error = appError.create('Invalid token', 401, ERROR);
        return next(error);
    }
};

export default authorizeOwner;
