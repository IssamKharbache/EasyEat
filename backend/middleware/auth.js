import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "You are not authorized please login again!",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error !",
    });
  }
};

export default authMiddleware;
