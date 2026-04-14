import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createHealthRecordService = async (req, res) => {
  try {
    const { animal_id, animal_type, health_condition, vet, date, status } =
      req.body;
    if (
      !animal_id ||
      !animal_type ||
      !health_condition ||
      !vet ||
      !date ||
      !status
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    const recordExists = await pool.query(
      "SELECT * FROM health_records WHERE animal_id = $1",
      [animal_id],
    );
    if (recordExists.rows.length > 0) {
      return errorResponse(res, 400, "Record already exists!");
    }
    console.log(recordExists);

    const createHealthRecordQuery = `
    INSERT INTO health_records(animal_id, animal_type, health_condition, vet, date, status)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

    const recordResult = await pool.query(createHealthRecordQuery, [
      animal_id,
      animal_type,
      health_condition,
      vet,
      date,
      status,
    ]);
    console.log(recordResult);

    const record = recordExists.rows;
    console.log(record);

    return successResponse(
      res,
      201,
      "Health Record created successfully",
      recordResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create health recorda");
  }
};

// get all health records
export const getHealthRecords = async (req, res) => {
  try {
    const getRecords = await pool.query(`SELECT * FROM health_records`);
    console.log(getRecords.rows);

    return successResponse(
      res,
      200,
      "All health records gotten successfully",
      getRecords.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get records failed");
  }
};

// get health record by id
export const getRecordById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getHealthRecords = await pool.query(
      `SELECT * FROM health_records WHERE id = $1`,
      [id],
    );
    console.log(getHealthRecords);

    const idExists = await pool.query(
      `SELECT * FROM health_records WHERE id = $1`,
      [id],
    );
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Health Record not found");
    }

    return successResponse(
      res,
      200,
      "Health Record gotten successfully",
      getHealthRecords.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Health Record failed");
  }
};

// edit record by id
export const editHealthRecordById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { animal_id, animal_type, health_condition, vet, date, status } =
      req.body;

    console.log(id);

    const editHealthRecord = await pool.query(
      `
           UPDATE health_records SET animal_id = COALESCE($1, animal_id), 
           animal_type = COALESCE($2, animal_type), 
           health_condition = COALESCE($3, health_condition), 
           vet = COALESCE($4, vet), 
           date = COALESCE($5, date), 
           status = COALESCE($6, status) 
           WHERE id = $7
           RETURNING * 
            `,
      [animal_id, animal_type, health_condition, vet, date, status, id],
    );

    console.log(editHealthRecord);

    const idExists = await pool.query(
      "SELECT * FROM health_records WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Health Record not found");
    }

    return successResponse(
      res,
      200,
      "Health record updated successfully",
      editHealthRecord.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit Health Record failed");
  }
};

// delete record by id
export const delRecordById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delHealthRecord = await pool.query(
      "SELECT * FROM health_records WHERE id  = $1",
      [id],
    );
    console.log(delHealthRecord);

    const idExists = await pool.query(
      "SELECT * FROM health_records WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "health record not found");
    }

    return successResponse(res, 200, "health record deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete health record failed");
  }
};
