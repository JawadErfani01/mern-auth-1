import jwt from "jsonwebtoken";

const generateTokens = (res, userId) => {
  // Generate access token
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m", // Adjust the expiration time as needed
  });

  // Generate refresh token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", // Adjust the expiration time as needed
  });

  // Set access token as a cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateTokens;

// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
//     sameSite: "strict", // Prevent CSRF attacks
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;
