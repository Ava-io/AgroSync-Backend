import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createLivestockService = async (req, res) => {
  try {
    const {
      health_records_id,
      breed_name,
      acquisition_date,
      animal_weight,
      health_status,
    } = req.body;
    if (
      !health_records_id ||
      !breed_name ||
      !acquisition_date ||
      !animal_weight ||
      !health_status
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    const livestockExists = await pool.query(
      "SELECT * FROM livestock WHERE health_records_id = $1",
      [health_records_id],
    );

    if (livestockExists.rows.length > 0) {
      return errorResponse(res, 400, "Livestock already exists");
    }
    console.log(livestockExists);

    const createLiveStockQuery = `
    INSERT INTO livestock(health_records_id, breed_name, acquisition_date, animal_weight, health_status)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `;

    const livestockResult = await pool.query(createLiveStockQuery, [
      health_records_id,
      breed_name,
      acquisition_date,
      animal_weight,
      health_status,
    ]);
    console.log(livestockResult);

    const livestock = livestockExists.rows;
    console.log(livestock);

    return successResponse(
      res,
      201,
      "Livestock created successfully",
      livestockResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create livestock");
  }
};

export const getLivestock = async (req, res) => {
  try {
    const getLivestock = await pool.query(`SELECT * FROM livestock`);
    console.log(getLivestock.rows);

    return successResponse(
      res,
      200,
      "Livestock gotten successfully",
      getLivestock.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Livestock failed");
  }
};

export const getLivestockId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const idExists = await pool.query(`SELECT * FROM livestock WHERE id = $1`, [
      id,
    ]);
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Livestock not found");
    }

    const getLivestockId = await pool.query(
      `SELECT * FROM livestock WHERE id = $1`,
      [id],
    );
    console.log(getLivestockId);

    return successResponse(
      res,
      200,
      "Livestock gotten successfully",
      getLivestockId.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Livestock failed");
  }
};

export const editLivestock = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      health_records_id,
      breed_name,
      acquisition_date,
      animal_weight,
      health_status,
    } = req.body;

    console.log(id);

    const editLivestock = await pool.query(
      `
           UPDATE livestock SET health_records_id = COALESCE($1, health_records_id), 
           breed_name = COALESCE($2, breed_name), acquisition_date = COALESCE($3, acquisition_date),
           animal_weight = COALESCE($4, animal_weight), health_status = COALESCE($5, health_status)
           WHERE id = $6
           RETURNING * 
            `,
      [
        health_records_id,
        breed_name,
        acquisition_date,
        animal_weight,
        health_status,
        id,
      ],
    );

    console.log(editLivestock);

    const idExists = await pool.query("SELECT * FROM livestock WHERE id = $1", [
      id,
    ]);

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Livestock not found");
    }

    return successResponse(
      res,
      200,
      "Livestock updated successfully",
      editLivestock.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit Livestock failed");
  }
};

export const delLivestock = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delLivestock = await pool.query(
      "SELECT * FROM livestock WHERE id  = $1",
      [id],
    );
    console.log(delLivestock);

    const idExists = await pool.query("SELECT * FROM livestock WHERE id = $1", [
      id,
    ]);

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "livestock not found");
    }

    return successResponse(res, 200, "livestock deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete livestock failed");
  }
};
