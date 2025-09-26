import express from 'express';
import { signup,login } from '../controller/userController.js';
import { verifyOTP,resendOTP } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login)
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

export default router;
