import jwt from "jsonwebtoken";

export const tokenDecoder = (req, res, next) => {
    try {
        if (req === '/api/v1/auth/login' || req === '/api/v1/auth/register') {
            return next();
        }
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token", decoded)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error in decoding token", success: false })
    }
}