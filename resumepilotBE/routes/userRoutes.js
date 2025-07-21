import express from "express";
import User from "../models/User.js";
import { authenticateToken }  from "../middlewares/authMiddleware.js";
import {
  userSignupSchema,
  loginSchema,
  updateProfileSchema,
} from "../validator/userValidator.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";
import { validateRequest } from "../middlewares/validator.js";
import { generateOTP, sendEmail } from "../utils/otpHelper.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const router = express.Router();

// Sign-up Route
router.post("/signup", validateRequest(userSignupSchema), async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, "Email is already registered.", 400);

    const hashedPassword = bcrypt.hashSync(password, 8);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({ name, email, password: hashedPassword, otp, otpExpiry });
    await newUser.save();

    await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);
    sendSuccess(res, "Sign-up successful. Please verify OTP.", { userId: newUser._id }, 201);
  } catch (error) {
    console.error("Signup error:", error);
    sendError(res, "Signup failed.", 500);
  }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found.", 404);

    if (!user.otp || user.otpExpiry < new Date()) return sendError(res, "OTP expired.", 400);
    if (user.otp !== otp) return sendError(res, "Invalid OTP.", 400);

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    sendSuccess(res, "OTP verified successfully.");
  } catch (error) {
    console.error("OTP verification failed:", error);
    sendError(res, "Verification failed.", 500);
  }
});

// Forgot Password Route (Email only)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found.", 404);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(email, "Forgot Password", `Your OTP is: ${otp}`);
    sendSuccess(res, "OTP sent successfully to email.");
  } catch (error) {
    console.error("Forgot password error:", error);
    sendError(res, "Error sending OTP.", 500);
  }
});

// Reset Password Route (Email only)
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found.", 400);
    if (!user.otp || user.otpExpiry < new Date()) return sendError(res, "OTP expired.", 400);
    if (user.otp !== otp) return sendError(res, "Invalid OTP.", 400);

    user.password = bcrypt.hashSync(newPassword, 8);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    sendSuccess(res, "Password reset successfully.");
  } catch (error) {
    console.error("Reset password error:", error);
    sendError(res, "Error resetting password.", 500);
  }
});

// Resend OTP Route (Email only)
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found.", 404);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(email, "Resend OTP", `Your OTP is: ${otp}`);
    sendSuccess(res, "OTP resent successfully to email.");
  } catch (error) {
    console.error("Resend OTP error:", error);
    sendError(res, "Error resending OTP.", 500);
  }
});

router.post("/login", validateRequest(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Invalid email or password", 401);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return sendError(res, "Invalid email or password", 401);

    // Optional: Prevent login if OTP not verified
    if (user.otp || user.otpExpiry) {
      return sendError(res, "Please verify OTP before login", 403);
    }

    const token = sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret", // replace with env
      { expiresIn: "1d" }
    );

    sendSuccess(res, "Login successful", { token, userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, "Login failed", 500);
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Other routes like login, profile, address remain unchanged...

export default router;
