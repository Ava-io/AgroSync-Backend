import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

export const createFeedingScheduleService = async (req, res) => {
  try {
    const { animal_type, feed_type, quantity_perday, time, status } = req.body;
    if (!animal_type || !feed_type || !quantity_perday || !time || !status) {
      return errorResponse(res, 400, "All fields are required");
    }

    const scheduleExists = await pool.query(
      "SELECT * FROM feeding_schedule WHERE animal_type = $1",
      [animal_type],
    );
    if (scheduleExists.rows.length > 0) {
      return errorResponse(res, 400, "Feeding schedule already exists!");
    }
    console.log(scheduleExists);

    const createFeedingScheduleQuery = `
    INSERT INTO feeding_schedule(animal_type, feed_type, quantity_perday, time, status)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `;

    const scheduleResult = await pool.query(createFeedingScheduleQuery, [
      animal_type,
      feed_type,
      quantity_perday,
      time,
      status,
    ]);
    console.log(scheduleResult);

    const schedule = scheduleExists.rows;
    console.log(schedule);

    return successResponse(
      res,
      201,
      "Feeding schedule created successfully",
      scheduleResult.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Failed to Feeding Schedule");
  }
};

// get all schedule
export const getFeedingSchedule = async (req, res) => {
  try {
    const getSchedules = await pool.query(`SELECT * FROM feeding_schedule`);
    console.log(getSchedules.rows);

    return successResponse(
      res,
      200,
      "All feeding schedules gotten successfully",
      getSchedules.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get feeding schedules failed");
  }
};

// get schedule by Id
export const getScheduleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getSchedule = await pool.query(
      `SELECT * FROM feeding_schedule WHERE id = $1`,
      [id],
    );
    console.log(getSchedule);

    const idExists = await pool.query(
      `SELECT * FROM feeding_schedule WHERE id = $1`,
      [id],
    );
    console.log(idExists);
    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Feeding Schedule not found");
    }

    return successResponse(
      res,
      200,
      "Feeding Schedule gotten successfully",
      getSchedule.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get feeding schedule failed");
  }
};

// edit schedule by id
export const editFeedingScheduleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { animal_type, feed_type, quantity_perday, time, status } = req.body;

    console.log(id);

    const editFeedingSchedule = await pool.query(
      `
           UPDATE feeding_schedule SET animal_type = COALESCE($1, animal_type), 
           feed_type = COALESCE($2, feed_type), 
           quantity_perday = COALESCE($3, quantity_perday), 
           time = COALESCE($4, time), 
           status = COALESCE($5, status)
           WHERE id = $6
           RETURNING * 
            `,
      [animal_type, feed_type, quantity_perday, time, status, id],
    );

    console.log(editFeedingSchedule);

    const idExists = await pool.query(
      "SELECT * FROM feeding_schedule WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Feeding Schedule not found");
    }

    return successResponse(
      res,
      200,
      "Feeding Schedule updated successfully",
      editFeedingSchedule.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Edit Feeding Schedule failed");
  }
};

// delete schedule by id
export const delScheduleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delSchedule = await pool.query(
      "SELECT * FROM feeding_schedule WHERE id  = $1",
      [id],
    );
    console.log(delSchedule);

    const idExists = await pool.query(
      "SELECT * FROM feeding_schedule WHERE id = $1",
      [id],
    );

    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Feeding schedule not found");
    }

    return successResponse(res, 200, "Feeding schedule deleted successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Delete Feeding schedule failed");
  }
};