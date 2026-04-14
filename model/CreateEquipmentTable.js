export const createEquipmentTable = `
CREATE TABLE IF NOT EXISTS equipments(
id SERIAL PRIMARY KEY,
name VARCHAR(225) NOT NULL,
equipment_id VARCHAR(50) NOT NULL,
equipment_type VARCHAR(225) NOT NULL,
last_service VARCHAR(50) NOT NULL,
next_service VARCHAR(50) NOT NULL,
hours_used VARCHAR(50) NOT NULL,
status VARCHAR(20) DEFAULT 'operational' CHECK (status IN('operational', 'out of service', 'maintenance')),
actions VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
`;