import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createRecordTransactionService = async (req, res) => {
  try {
    const { transaction_id, payment_method, references, notes } = req.body;
    if (!transaction_id || !payment_method || !references || !notes) {
      return errorResponse(res, 400, "All fields are required");
    }

    const RecordTransactionExists = await pool.query(
      "SELECT * FROM record_transaction WHERE transaction_id = $1",
      [transaction_id],
    );
    if (recordTransaction.rows.length > 0) {
      return errorResponse(res, 400, "Transaction Record already exists");
    }
    console.log(RecordTransactionExists);

    const createRecordTransactionQuery = `
    INSERT INTO record_transaction(transaction_id, payment_method, references, notes)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `;

    const recordTransactionResult = await pool.query(
      createRecordTransactionQuery,
      [transaction_id, payment_method, references, notes],
    );
    console.log(recordTransactionResult);

    const recordTransaction = RecordTransactionExists.rows;
    console.log(recordTransaction);

    return successResponse(
      res,
      201,
      "Transaction record created successfully",
      recordTransactionResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create transaction record");
  }
};
