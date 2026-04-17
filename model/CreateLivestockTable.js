export const createLivestockTable = `
CREATE TABLE IF NOT EXISTS livestock(
id SERIAL PRIMARY KEY,
health_records_id INT REFERENCES health_records(id) ON DELETE CASCADE,
breed_name VARCHAR(225) NOT NULL,
acquisition_date DATE NOT NULL,
animal_weight VARCHAR(225) NOT NULL,
health_status VARCHAR(50) DEFAULT 'healthy' CHECK (health_status IN('healthy', 'under treatment', 'quarantine')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
