import express from 'express';
import { body, validationResult } from 'express-validator';
import { getMe, loginUser, registerUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();


// Validation Middleware
const handleValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success : false,
            error : errors.array()[0].msg
        })
    }

    next();
}


authRouter.post(
    "/register",
    [
        body('name')
        .trim()
        .isLength({min : 2, max : 50})
        .withMessage("Name must be between 2 and 50 characters"),

        body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage("Please provide a valid email address"),

        body('password')
        .isLength({min : 6})
        .withMessage('Password must be at least 6 character')
    ],
    handleValidationError,
    registerUser
)


authRouter.post(
    "/login",
    [
        body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage("Please provide a valid email address"),

        body('password')
        .isLength({min : 6})
        .withMessage('Password must be at least 6 character')
    ],
    handleValidationError,
    loginUser
)

authRouter.get(
    "/me",
    protect,
    getMe
)

export default authRouter;