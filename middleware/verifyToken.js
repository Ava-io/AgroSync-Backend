import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const messageTemplate =
    process.env.NODE_ENV === "development" ? "Token not found" : "Unauthorized";

  try {
    console.log(req.headers.authorization, "token");
    const token = req.headers.authorization?.split(" ")[1];

    // confirm token sent by client
    if (!token) {
      return errorResponse(res, 401, messageTemplate);
    }

    console.log(process.env.JWT_SECRET, "error message");
    console.log(token);
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = decodeToken.user;

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, "Something went wrong");
  }
};
