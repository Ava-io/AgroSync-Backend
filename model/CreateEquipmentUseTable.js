export const createEquipmentUseTable = `
CREATE TABLE IF NOT EXISTS equipment_use(
id SERIAL PRIMARY KEY,
equipments_id INT REFERENCES equipments(id) ON DELETE CASCADE,
date_used DATE NOT NULL,
duration INT NOT NULL,
operated_by VARCHAR(225) NOT NULL,
fuel_used VARCHAR(50) NOT NULL,
task VARCHAR(225) NOT NULL,
note TEXT NOT NULL
)
`;
