import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createEquipmentUseService = async (req, res) => {
  try {
    const {
      equipments_id,
      date_used,
      duration,
      operated_by,
      fuel_used,
      task,
      note,
    } = req.body;
    if (
      !equipments_id ||
      !date_used ||
      !duration ||
      !operated_by ||
      !fuel_used ||
      !task ||
      !note
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    const equipmentUseExists = await pool.query(
      "SELECT * FROM equipment_use WHERE equipments_id = $1",
      [equipments_id],
    );
    if (equipmentUseExists.rows.length > 0) {
      return errorResponse(res, 400, "equipment_use already exists");
    }
    console.log(equipmentUseExists);

    const createEquipmentUseQuery = `
          INSERT INTO equipment_use(equipments_id, date_used, duration, operated_by, fuel_used, task, note)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `;

    const equipmentUseResult = await pool.query(createEquipmentUseQuery, [
      equipments_id,
      date_used,
      duration,
      operated_by,
      fuel_used,
      task,
      note,
    ]);

    console.log(equipmentUseResult);

    const equipment_use = equipmentUseResult.rows;
    console.log(equipment_use);

    return successResponse(
      res,
      201,
      "equipmentUse created successfully",
      equipmentUseResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to create equipmentUse");
  }
};

export const getEquipUse = async (req, res) => {
  try {
    const getEquipUse = await pool.query(`SELECT  * FROM equipment_use`);
    console.log(getEquipUse);

    return successResponse(
      res,
      200,
      "Equipment use gotten successfully",
      getEquipUse.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Fetch equipment use failed");
  }
};

export const getEquipUseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const idExists = await pool.query(
      `SELECT * FROM equipment_use WHERE id = $1`,
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 400, "Equipment_use not found");
    }

    const getEquipUseId = await pool.query(
      `SELECT * FROM equipment_use WHERE id = $1`,
      [id],
    );
    console.log(getEquipUseId);

    return successResponse(
      res,
      200,
      "Equipment use gotten successfully",
      getEquipUseId.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Fetch Equipment Use failed");
  }
};

export const editEquipUseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      equipments_id,
      date_used,
      duration,
      operated_by,
      fuel_used,
      task,
      note,
    } = req.body;
    console.log(req.body);

    const idExists = await pool.query(
      "SELECT * FROM equipment_use WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (!idExists.rows.length === 0) {
      return errorResponse(res, 404, "Equipment use not found");
    }

    const editEquipUse = await pool.query(
      `UPDATE equipment_use SET equipments_id = COALESCE($1, equipments_id), date_used = COALESCE($2, date_used), 
      duration = COALESCE($3, duration), operated_by = COALESCE($4, operated_by), 
      fuel_used = COALESCE($5, fuel_used), task = COALESCE($6, task), note = COALESCE($7, note)
      WHERE id = $8
      RETURNING *`,
      [
        equipments_id,
        date_used,
        duration,
        operated_by,
        fuel_used,
        task,
        note,
        id,
      ],
    );

    console.log(editEquipUse);

    return successResponse(
      res,
      200,
      "Equipment use updated successfully",
      editEquipUse.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Fetch equipment failed");
  }
};

export const delEquipUse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const idExists = await pool.query(
      "SELECT * FROM equipment_use WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Equipment use not found");
    }
    const delEquip = await pool.query("SELECT * FROM equipment_use WHERE id = $1", [id]);
    console.log(delEquip);

    return successResponse(res, 200, "Equipment use deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete equipment use failed");
  }
};
