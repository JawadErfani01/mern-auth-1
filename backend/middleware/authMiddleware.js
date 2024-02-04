import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  let refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // If access token is present, verify it
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } else if (refreshToken) {
      // If only refresh token is present, attempt to verify it
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m", // Adjust the expiration time as needed
        }
      );

      // Set the new access token as a cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      // Retrieve user details from the database
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export { protect };

// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;
//   if (token) {
//     console.log(token);
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// export { protect };
