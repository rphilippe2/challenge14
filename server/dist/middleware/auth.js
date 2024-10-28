import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        // If token is missing, return 401 Unauthorized
        return res.status(401).json({ message: "Access token is missing" });
    }
    // Verify the token
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            // If token is invalid or expired, return 403 Forbidden
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        // Attach the decoded token (user data) to req.user
        req.user = decoded;
        // Proceed to the next middleware
        return next();
    });
};
