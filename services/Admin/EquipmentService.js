import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createEquipmentService = async (req, res) => {
  try {
    const {
      name,
      equipment_id,
      equipment_type,
      last_service,
      next_service,
      hours_used,
      status,
      actions,
    } = req.body;

    if (
      !name ||
      !equipment_id ||
      !equipment_type ||
      !last_service ||
      !next_service ||
      !hours_used ||
      !status ||
      !actions
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Verify if equipment exists
    const equipmentExists = await pool.query(
      "SELECT * FROM equipments WHERE name = $1",
      [name],
    );
    if (equipmentExists.rows.length > 0) {
      return errorResponse(res, 400, "Equipment already exists");
    }

    console.log(equipmentExists);

    const createEquipmentQuery = `
    INSERT INTO equipments(name, equipment_id, equipment_type, last_service, next_service, hours_used, status, actions)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;

    const equipmentResult = await pool.query(createEquipmentQuery, [
      name,
      equipment_id,
      equipment_type,
      last_service,
      next_service,
      hours_used,
      status,
      actions,
    ]);
    console.log(equipmentResult);

    const equipment = equipmentResult.rows;
    console.log(equipment);

    return successResponse(
      res,
      201,
      "Equipment created successfully",
      equipmentResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create equipment");
  }
};

// get all equipments
export const getEquipments = async (req, res) => {
  try {
    const getEquipments = await pool.query(`SELECT * FROM equipments`);
    console.log(getEquipments.rows);

    return successResponse(
      res,
      200,
      "All equipments gotten successfully",
      getEquipments.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get equipments failed");
  }
};

// get equipment by id
export const getEquipment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getEquipment = await pool.query(
      `SELECT  * FROM equipments WHERE id = $1`,
      [id],
    );
    console.log(getEquipment);

    const idExists = await pool.query(
      `SELECT * FROM equipments WHERE id = $1`,
      [id],
    );
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Equipment not found");
    }

    return successResponse(
      res,
      200,
      "Equipment gotten successfully",
      getEquipment.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get equipment failed");
  }
};

// edit equipment by id

export const editEquipment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      equipment_id,
      equipment_type,
      last_service,
      next_service,
      hours_used,
      status,
      actions,
    } = req.body;

    console.log(id);

    const editEquipment = await pool.query(
      `
           UPDATE equipments SET name = COALESCE($1, name), 
           equipment_id = COALESCE($2, equipment_id), 
           equipment_type = COALESCE($3, equipment_type), 
           last_service = COALESCE($4, last_service), 
           next_service = COALESCE($5, next_service), 
           hours_used = COALESCE($6, hours_used), 
           status = COALESCE($7, status), 
           actions = COALESCE($8, actions)
           WHERE id = $9 
           RETURNING * 
            `,
      [
        name,
        equipment_id,
        equipment_type,
        last_service,
        next_service,
        hours_used,
        status,
        actions,
        id,
      ],
    );

    console.log(editEquipment);

    const idExists = await pool.query(
      "SELECT * FROM equipments WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Equipment not found");
    }

    return successResponse(
      res,
      200,
      "Equipment edited successfully",
      editEquipment.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit equipment failed");
  }
};


// delete equipment by id
export const delEquipById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delEquipment = await pool.query("SELECT * FROM equipments WHERE id  = $1", [
      id,
    ]);
    console.log(delEquipment);


    const idExists = await pool.query("SELECT * FROM equipments WHERE id = $1", [
      id,
    ]);

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Equipment not found");
    }

    return successResponse(res, 200, "Equipment deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete equipment failed");
  }
};
