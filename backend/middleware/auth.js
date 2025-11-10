import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};
