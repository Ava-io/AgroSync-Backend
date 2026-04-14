import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../utils/generateToken.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

const SigninService = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // to verify all inputs have been filled
    if (!email || !password) {
      return errorResponse(res, 400, "All fields are required");
    }

    // to check if credentials are valid
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    console.log("check response from pg", userExists);

    if (userExists.rows.length === 0) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    //  to save the response from postgres as a variable
    const user = userExists.rows[0];
    console.log(user);

    // to check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    console.table([user.email, user.password, password]);
    console.log("check pg response", userExists);

    // bcrypt compare is to compare the users password to the hashed password by bcrypt
    console.log("is Match?", isMatch);

    if (!isMatch) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    // After passing all checks
    // generate token

    const token = generateJwtToken(user.id, user.farmId, user.role);
    return res.status(200).json({
      message: "Login Successfully",
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          farmId: user.farmId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Signin failed");
  }
};

export default SigninService;
