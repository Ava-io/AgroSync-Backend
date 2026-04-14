import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createTransactionService = async (req, res) => {
  try {
    const { date, description, category, amount } = req.body;
    if (!date || !description || !category || !amount) {
      return errorResponse(res, 400, "All fields are required");
    }

    const transactionExists = await pool.query(
      "SELECT * FROM transactions WHERE description = $1",
      [description],
    );
    if (transactionExists.rows.length > 0) {
      return errorResponse(res, 400, "Record already exists!");
    }
    console.log(transactionExists);

    const createTransactionQuery = `
    INSERT INTO transactions(date, description, category, amount)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `;

    const transactionResult = await pool.query(createTransactionQuery, [
      date,
      description,
      category,
      amount,
    ]);
    console.log(transactionResult);

    const record = transactionExists.rows;
    console.log(record);

    return successResponse(
      res,
      201,
      "Transaction created successfully",
      transactionResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create transaction");
  }
};

export const getTransactions = async (req, res) => {
  try {
    const getTransactions = await pool.query(`SELECT * FROM transactions`);
    console.log(getTransactions.rows);

    return successResponse(
      res,
      200,
      "All transactions gotten successfully",
      getTransactions.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get transactions failed");
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getTransaction = await pool.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [id],
    );
    console.log(getTransaction);

    const idExists = await pool.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [id],
    );
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Transaction not found");
    }

    return successResponse(
      res,
      200,
      "Transaction gotten successfully",
      getTransaction.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Transaction failed");
  }
};

export const editTransactionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { date, description, category, amount } = req.body;

    console.log(id);

    const editTransaction = await pool.query(
      `
           UPDATE transactions SET date = COALESCE($1, date), 
           description = COALESCE($2, description), 
           category = COALESCE($3, category), 
          amount = COALESCE($4,amount)
           WHERE id = $5
           RETURNING * 
            `,
      [date, description, category, amount, id],
    );

    console.log(editTransaction);

    const idExists = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Transaction not found");
    }

    return successResponse(
      res,
      200,
      "Transaction updated successfully",
      editTransaction.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit Transaction failed");
  }
};

export const delTransactionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delTransaction = await pool.query(
      "SELECT * FROM transactions WHERE id  = $1",
      [id],
    );
    console.log(delTransaction);

    const idExists = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Transaction not found");
    }

    return successResponse(res, 200, "Transaction deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete Transaction failed");
  }
};