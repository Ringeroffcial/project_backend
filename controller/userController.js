import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from "../utils/sendOTPEmail.js";
import { generateOTP } from "../utils/generateOTP.js";

export const signup = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, agreeToTerms } = req.body;

        if (!name || !email || !phoneNumber || !password || !agreeToTerms) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{3,16}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be 3–16 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character."
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
            agreeToTerms,
            otp,
            otpExpiry,
        });

        // 🧨 Separate try-catch for sending email
        try {
            await sendOTPEmail(email, otp);
        } catch (emailError) {
            console.error("❌ Failed to send OTP email:", emailError);

            // Optional cleanup if email sending fails
            await User.findByIdAndDelete(user._id);

            return res.status(500).json({
                message: "Failed to send OTP email. Please try signing up again.",
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, isVerified: user.isVerified },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            token,
            message: "User registered successfully. Please verify your email with the OTP sent.",
        });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email before logging in." });
        }        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, isVerified: true },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};


