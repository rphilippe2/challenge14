import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    // If token is missing, return 401 Unauthorized
    return res.status(401).json({ message: "Access token is missing" });
  }

  // Verify the token
  return jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err, decoded) => {
      if (err) {
        // If token is invalid or expired, return 403 Forbidden
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach the decoded token (user data) to req.user
      req.user = decoded as JwtPayload;

      // Proceed to the next middleware
      return next();
    }
  );
};
