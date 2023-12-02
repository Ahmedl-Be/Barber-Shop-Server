import { body } from "express-validator";

const vaildationSchema = () => {
    return [
        body("firstName")
            .notEmpty()
            .withMessage("firstName is required")
            .isLength({ min: 2 })
            .withMessage("Enter at least 2 characters"),
        body("lastName")
            .notEmpty()
            .withMessage("lastName is required"),
        body("phoneNumber")
            .notEmpty()
            .withMessage("phone Number is required")
            .isLength({ min: 6 })
            .withMessage("Enter at least 6 characters"),
        body("email")
            .isEmail()
            .notEmpty()
            .withMessage("Email is required"),
        body("message")
            .notEmpty()
            .withMessage("please Enter your message"),
    ]
}

export {vaildationSchema};