exports.jwtToken = async (message, statusCode, user, res) => {
  const token = await user.getJwtToken();
  const options = {
    maxAge: 315576000000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    message,
    user,
    isAuthenticated: true,
  });
};
