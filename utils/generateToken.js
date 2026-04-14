import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generateJwtToken = (userId, farmId, role) => {
  const secret = process.env.JWT_SECRET;

  const payload = {
    user: {
      id: userId,
      farmId: farmId,
      role: role,
    },
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
