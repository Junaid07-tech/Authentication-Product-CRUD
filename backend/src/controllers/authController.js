import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

if (!user) {
    return res.status(401).json({
        message: "Invalid email or password",
    });
}


    const isPasswordMatch = await bcrypt.compare(password, user.password);

if (!isPasswordMatch) {
    return res.status(401).json({
        message: "Invalid email or password",
    });
}

    const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
);

    const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
);

    user.refreshToken = refreshToken;

await user.save();

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

return res.status(200).json({
    message: "Login successful",
    accessToken,
});

};

export const getMe = async (req, res) => {
    const user = await UserModel.findById(req.user.userId).select("-password -refreshToken");

    return res.status(200).json({
        user,
    });
};


export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({
            message: "Refresh token is required",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await UserModel.findOne({
            _id: decoded.userId,
            refreshToken: token,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }

        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res.status(200).json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token",
        });
    }
};

export const logout = async (req, res) => {
    const user = await UserModel.findById(req.user.userId);

    if (!user) {
        return res.status(401).json({
            message: "User not found",
        });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken");

    return res.status(200).json({
        message: "Logout successful",
    });
};