import jwt from "jsonwebtoken";

export const tokenDecoder = (req, res, next) => {
    try {

        // if (req === '/api/v1/auth/login' || req === '/api/v1/auth/register') {
        //     return next();
        // }
        const openRoutes = [
            "/auth/login",
            "/auth/register",
            "/products/get-products",
        ];
        // Skip middleware for certain routes
        // if (openRoutes.includes(req.path)) {
        //     return next();
        // }
        if (openRoutes.some(route => req.path.startsWith(route))) {
            return next();
        }
        // console.log("req.path:", req.path);
        // console.log("Soft delete route hit with id:", req.params.id);

        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "decoded token");
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in decoding token", success: false });
    }
};