import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createCropService = async (req, res) => {
  try {
    //  Verify all details
    const {
      crop_name,
      plot,
      area,
      planted_date,
      expected_harvest,
      status,
      actions,
      variety,
      note,
    } = req.body;
    if (
      !crop_name ||
      !plot ||
      !area ||
      !planted_date ||
      !expected_harvest ||
      !status ||
      !actions ||
      !variety ||
      !note
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    //  verify if crops exists
    const cropExists = await pool.query(
      "SELECT * FROM crops WHERE crop_name = $1",
      [crop_name],
    );
    if (cropExists.rows.length > 0) {
      return errorResponse(res, 400, "Crop already exists");
    }
    console.log(cropExists);

    const createCropQuery = `
INSERT INTO crops(crop_name, plot, area, planted_date, expected_harvest, status, actions, variety, note)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *
`;

    const cropResult = await pool.query(createCropQuery, [
      crop_name,
      plot,
      area,
      planted_date,
      expected_harvest,
      status,
      actions,
      variety,
      note,
    ]);
    console.log(cropResult);

    const crops = cropResult.rows[0];
    console.log(crops);

    return successResponse(res, 201, "Crops created successfully", crops);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create crops");
  }
};

// get all crops
export const getCrops = async (req, res) => {
  try {
    const getCrops = await pool.query(`SELECT * FROM crops`);
    console.log(getCrops.rows);

    return successResponse(
      res,
      200,
      "All crops gotten successfully",
      getCrops.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Crops Failed");
  }
};

// get crop by id
export const getCropById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getCrop = await pool.query(`SELECT * FROM crops WHERE id = $1`, [id]);
    console.log(getCrop);
    const idExists = await pool.query(`SELECT * FROM crops WHERE id = $1`, [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Crop not found");
    }

    return successResponse(res, 200, "Crop fetched successfully", getCrop.rows);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get Crop failed");
  }
};

// edit crop by id
export const editCrop = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      crop_name,
      plot,
      area,
      planted_date,
      expected_harvest,
      status,
      actions,
      variety,
      note,
    } = req.body;

    console.log(id);

    const editCrop = await pool.query(
      `
           UPDATE crops SET crop_name = COALESCE($1, crop_name), 
           plot = COALESCE($2, plot), 
           area = COALESCE($3, area), 
           planted_date = COALESCE($4, planted_date), 
           expected_harvest = COALESCE($5, expected_harvest), 
           status = COALESCE($6, status), 
           actions = COALESCE($7, actions), 
           variety = COALESCE($8, variety), 
           note = COALESCE($9, note) 
           WHERE id = $10 
           RETURNING * 
            `,
      [
        crop_name,
        plot,
        area,
        planted_date,
        expected_harvest,
        status,
        actions,
        variety,
        note,
        id,
      ],
    );

    console.log(editCrop);

    const idExists = await pool.query("SELECT * FROM crops WHERE id = $1", [
      id,
    ]);

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Crop not found");
    }

    return successResponse(res, 200, "Crop edited successfully", editCrop.rows);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit crop failed");
  }
};

// delete crop by id
export const delCropById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delCrop = await pool.query("SELECT * FROM crops WHERE id  = $1", [
      id,
    ]);
    console.log(delCrop);


    const idExists = await pool.query("SELECT * FROM crops WHERE id = $1", [
      id,
    ]);

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Crop not found");
    }

    return successResponse(res, 200, "Crop deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete crop failed");
  }
};
