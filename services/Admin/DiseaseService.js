import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createDiseaseService = async (req, res) => {
  try {
    const {
      crops_id,
      livestock_id,
      disease_name,
      treatment_status,
      ai_response,
    } = req.body;

    if (
      !crops_id ||
      !livestock_id ||
      !disease_name ||
      !treatment_status ||
      !ai_response
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    const diseaseExists = await pool.query(
      "SELECT * FROM diseases WHERE disease_name = $1",
      [disease_name],
    );
    if (diseaseExists.rows.length > 0) {
      return errorResponse(res, 400, "Disease already exists");
    }
    console.log(diseaseExists);

    const createDiseaseResultQuery = `
    INSERT INTO diseases(crops_id, livestock_id, disease_name, treatment_status, ai_response)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `;

    const diseaseResult = await pool.query(createDiseaseResultQuery, [
      crops_id,
      livestock_id,
      disease_name,
      treatment_status,
      ai_response,
    ]);

    console.log(diseaseResult);

    const disease = diseaseExists.rows;
    console.log(disease);

    return successResponse(
      res,
      201,
      "Disease created successfully",
      diseaseResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create disease");
  }
};

export const getDiseases = async (req, res) => {
  try {
    const getDiseases = await pool.query(`SELECT * FROM diseases`);
    console.log(getDiseases);

    return successResponse(
      res,
      200,
      "Diseases gotten successfully",
      getDiseases.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Diseases Failed");
  }
};

export const getDiseaseId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const idExists = await pool.query(`SELECT * FROM diseases WHERE id = $1`, [
      id,
    ]);
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 400, "Disease not found");
    }

    const getDiseaseId = await pool.query(
      `SELECT * FROM diseases WHERE id = $1`,
      [id],
    );
    console.log(getDiseaseId);

    return successResponse(
      res,
      200,
      "Disease gotten successfully",
      getDiseaseId.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Disease failed");
  }
};

export const editDiseaseId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      crops_id,
      livestock_id,
      disease_name,
      treatment_status,
      ai_response,
    } = req.body;
    console.log(id);

    const editDisease = await pool.query(
      `UPDATE diseases SET crops_id = COALESCE ($1, crops_id), 
      livestock_id = COALESCE($2, livestock_id), disease_name = COALESCE($3, disease_name),
      treatment_status = COALESCE($4, treatment_status), ai_response = COALESCE($5, ai_response)
      WHERE id = $6
      RETURNING *
      `,
      [crops_id, livestock_id, disease_name, treatment_status, ai_response, id],
    );
    console.log(editDisease);

    const idExists = await pool.query("SELECT * FROM diseases WHERE id = $1", [
      id,
    ]);

    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Disease not found");
    }

    return successResponse(
      res,
      200,
      "Disease updated successfully",
      editDisease.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Update diseases failed");
  }
};

export const delDIsease = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const idExists = await pool.query("SELECT * FROM diseases WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Disease not found");
    }
    const delDisease = await pool.query(
      "SELECT * FROM diseases WHERE id = $1",
      [id],
    );
    console.log(delDisease);

    return successResponse(res, 200, "Disease deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete disease failed");
  }
};
