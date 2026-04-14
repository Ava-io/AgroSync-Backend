import { pool } from "../../config/db.js";
import { generatePassword } from "../../utils/generatePassword.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

const SignupService = async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, address, email } = req.body;
    console.log(req.body);

    // Validate Inputs
    if (!name || !address || !email ) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Check if email exists
    const emailExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (emailExists.rows.length != 0) {
      console.log(emailExists);
      return errorResponse(res, 400, "Email already exists");
    }

    await client.query("BEGIN");

    // Create Farm
    const createFarmQuery = `
  INSERT INTO farm (name, address)
  VALUES($1, $2)
  RETURNING *
`;

    // const {name, address} = req.body;
    const farmResult = await client.query(createFarmQuery, [name, address]);

    console.log(farmResult);
    console.log("this is farm result", farmResult.rows);
    const farmId = farmResult.rows[0].id;
    const farmInfo = farmResult.rows[0];
    console.log(farmInfo);

    // Generate password
    const password = generatePassword(name);
    const role = "admin";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    console.warn("this is user password", password);

    // create user query
    const createUserQuery = `
    INSERT INTO users( email, farm_id, role, password )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    console.log(farmId, "farm_id");
    console.log(email);
    const userResult = await client.query(createUserQuery, [
      email,
      farmId,
      role,
      hashedPassword,
    ]);
    console.log(userResult)

    const admin = userResult.rows[0];
    console.log(admin);

    // Commit Transaction
    await client.query("COMMIT");

    return successResponse(res, 201, "Signup Successful", userResult.rows);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Signup Failed");
  }
};

export default SignupService;
